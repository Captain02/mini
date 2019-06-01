const router = require('../utils/router/index.js');
const event = require('../utils/event.js');
const originalPage = Page

const wxPage = function (options) {
    options.$router = router;
    options.$event = event;

    const {onLoad} = options;
    options.onLoad = function (onLoadOptions) {

        if (typeof onLoad === 'function') {
            onLoad.call(this, onLoadOptions)
        }
    }

    const {onShow} = options;
    options.onShow = function(onShowOptions) {
        //页面栈
        let pages = getCurrentPages();
        // 当前页面
        let currPage = pages[pages.length - 1];
        //页面路径
        let route = currPage.route;
        this.$event.emit("show", route);
        if (typeof onShow === 'function') {
            onShow.call(this, onShowOptions)
        }
    }

    const {onHide} = options;
    options.onHide = function(onHideOptions) {
        //页面栈
        let pages = getCurrentPages();
        // 当前页面
        let currPage = pages[pages.length - 1];
        //页面路径
        let route = currPage.route;
        this.$event.emit("hide", route);
        if (typeof onHide === 'function') {
            onHide.call(this, onHideOptions)
        }
    }

    return originalPage(options)
}

export default wxPage

