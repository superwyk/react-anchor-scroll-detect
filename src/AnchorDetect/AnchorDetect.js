import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import raf from 'raf';
import {getTargetRect, scrollTo} from './util';

export default class DetectAnchor extends PureComponent {
    static defaultProps = {
        items: [], // 受监控元素id值
        offsetTop: 0,
        componentTag: 'ul',
        style: {},
        container: window,
    };

    static propTypes = {
        items: propTypes.arrayOf(propTypes.string),
        activeClass: propTypes.string.isRequired,
        offsetTop: propTypes.number,
        componentTag: propTypes.string,
        style: propTypes.object,
        container: propTypes.oneOfType([propTypes.element, propTypes.node]),
        className: propTypes.string,
        children: propTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = {
            detectElements: [], // 受监控元素,可能存在空项
            elementStatus: [], // 受监控元素状态
        };
        this.flag = true; // 点击Anchor菜单项，滚动期间，不执行监听滚动事件
        this.scheduledAnimationFrame = false; // 管理raf回调函数，防止同一帧回调被执行多次
    }

    componentDidMount() {
        this.buildDetectElements(this.props.items);
        // 监控滚动事件
        this.listener = this.props.container.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        // this.props.container.removeEventListener('scroll', this.onScroll);
        this.listener && this.listener.remove();
    }

    componentDidUpdate(prevProps) {
        // 判断items是否更新
        if (prevProps.items !== this.props.items
            && this.isDiff(prevProps.items, this.props.items)) {
            // 重新生成受监控元素
            this.buildDetectElements(this.props.items);
        }
    }

    // 判断两数组是否一摸一样
    isDiff = (before, after) => {
        if (before.length !== after.length) return false;
        // 先对数组进行排序
        const beforeTemp = [...before].sort(), afterTemp = [...after].sort();
        for (let i = 0; i < beforeTemp.length; i++) {
            if (beforeTemp[i] !== afterTemp[i]) {
                return false;
            }
        }
        return true;
    };

    // 生成受监控元素
    buildDetectElements = ids => {
        let elements = [], elementStatus = [];
        for (let i = 0; i < ids.length; i++) {
            elements.push(document.getElementById(ids[i]));
            elementStatus.push(false);
        }
        this.setState({detectElements: elements, elementStatus});
        this.detect(elements);
    };

    // 处理滚动事件
    onScroll = () => {
        if (this.scheduledAnimationFrame) return;
        this.scheduledAnimationFrame = true;
        const {detectElements} = this.state;
        this.flag && raf(() => {
            this.scheduledAnimationFrame = false;
            this.detect(detectElements);
        });
    };

    // 监控元素状态
    detect = detectElements => {
        const containerRect = getTargetRect(this.props.container);
        const containerOffset = this.props.container !== window
            ? this.props.container.scrollTop
            : (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
        const elementStatus = detectElements
            .map(el => this.isActive(el, containerRect, containerOffset));
        // 判断element status是否变化
        const {elementStatus: oldElementStatus} = this.state;
        if (elementStatus.length !== oldElementStatus.length
            || !elementStatus.every((item, index) => item === oldElementStatus[index])) {
            this.setState({elementStatus});
        }
    };

    // 判断当前受监控元素，是否处于active状态，即受监控元素是否在offset位置
    isActive = (detectElement, containerRect, containerOffset) => {
        if (detectElement) {
            const detectElementRect = getTargetRect(detectElement);
            const position = containerRect.top + this.props.offsetTop + containerOffset;
            return (detectElementRect.top <= position) && (position <= detectElementRect.bottom);
        }
        return false; // 受监控元素，可能为空
    };

    // 受监控元素点击事件
    handleClickElement = index => {
        const {detectElements} = this.state;
        // 2.修改status
        let elementStatus = [];
        for (let i = 0; i < detectElements.length; i++) {
            i === index ? elementStatus.push(true) : elementStatus.push(false);
        }
        this.setState({elementStatus});
        const detectElement = detectElements[index];
        if (!detectElement) return;

        this.flag = false;
        const containerRect = getTargetRect(this.props.container);
        const elementRect = getTargetRect(detectElement);
        // 点击元素距离container距离
        const offset = elementRect.top - containerRect.top;
        const containerOffset = this.props.container !== window
            ? this.props.container.scrollTop
            : (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
        // 1.手动滚动
        let start = null;
        // 滚动动画
        const frameFunc = () => {
            if (!start) start = Date.now();
            const progress = Date.now() - start;
            const scrollTop = containerOffset + ((progress / 500)
                * (offset - this.props.offsetTop - containerOffset));
            if (progress < 500) {
                // window.requestAnimationFrame(frameFunc);
                scrollTo(this.props.container, scrollTop);
                raf(frameFunc);
            } else {
                scrollTo(this.props.container, Math.ceil(offset - this.props.offsetTop));
                this.flag = true;
                this.scheduledAnimationFrame = false;
            }
        };
        // window.requestAnimationFrame(frameFunc);
        raf(frameFunc);
    };

    render() {
        const {
            activeClass, componentTag: Tag, style, className, children,
        } = this.props;
        const {elementStatus} = this.state;

        const items = React.Children.map(children, (child, index) => {
            if (!child) return;
            const childClass = classNames({
                [`${child.props.className}`]: child.props.className,
                [`${activeClass}`]: elementStatus[index],
            });
            return React.cloneElement(child, {
                className: childClass,
                onClick: () => this.handleClickElement(index),
            });
        });
        return (
            <Tag className={className || ''} style={style}>
                {items}
            </Tag>
        );
    }
}