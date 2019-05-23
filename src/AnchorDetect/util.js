export function throttle(fn, delay = 200, threshold = 600) {
    let timer = null; // 定时器
    let last = null; // 上次执行fn时间
    return function (...args) {
        const context = this;
        const now = +Date.now();
        if (!last) {
            last = now;
        }
        if (now - last < threshold) {
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fn.apply(context, args);
            }, delay);
        } else {
            last = now;
            timer && clearTimeout(timer);
            fn.apply(context, args);
        }
    };
}

export function getTargetRect(target) {
    return target !== window
        ? target.getBoundingClientRect()
        : (document.documentElement.getBoundingClientRect()
            || document.body.getBoundingClientRect());
}

export function scrollTo(target, scrollTop) {
    if (target === window) {
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
    } else {
        target.scrollTop = scrollTop;
    }
}