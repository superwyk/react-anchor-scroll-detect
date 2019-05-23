该组件两个功能：1.点击锚点，滚动到指定位置，2.滚动页面，获取可视区域对应的锚点

安装
```cmd
$ npm install react-anchor-scroll-detect --save
```

例子
```cmd
$ git clone https://github.com/superwyk/react-anchor-scroll-detect.git
$ cd react-anchor-scroll-detect
$ npm i
$ npm run start
```

使用
```js
import AnchorDetect from 'react-anchor-scroll-detect'
...
<div>
    <AnchorDetect className="anchor" items={['section1', 'section2', 'section3', 'section4', 'section5', 'section6']} activeClass="active" offsetTop={20}>
        <li>section1</li>
        <li>section2</li>
        <li>section3</li>
        <li>section4</li>
        <li>section5</li>
        <li>section6</li>
    </AnchorDetect>
    <section id="section1" style={{marginTop: '21px'}}>
      ...
    </section>
    <section id="section2">
      ...
    </section>
    <section id="section3">
      ...
    </section>
    <section id="section4">
      ...
    </section>
    <section id="section5">
      ...
    </section>
    <section id="section6">
      ...
    </section>
</div>
```

属性props
- items
> 锚点(anchor)目标元素id集合

- activeClass
> 处在可视区域中的锚点目标元素对应的锚点的类名(class)

- offsetTop
> 距离top的偏移量

- componentTag
> 锚点元素的父元素的标签名

- container
> 可滚动区域容器，默认为window

- className
> 锚点元素的父元素的class

- style
> 锚点元素的父元素的style

github
```js
https://github.com/superwyk/react-anchor-scroll-detect
```

License
```js
MIT
```