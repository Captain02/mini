const router = require('../router/index.js');
const event = require('../utils/event.js');
const originalPage = Page

const wxPage = function(options) {
    options.router = router
    options.event = event
    // options.http = "http"
    const { onLoad } = options
    options.onLoad = function(onLoadOptions) {
        console.log(options)
        console.log(this)
        console.log(onLoadOptions)
        // 打 log、埋点……
        console.log('每个页面都会打出这个log')
        if (typeof onLoad === 'function') {
            console.log("123")
            onLoad.call(this, onLoadOptions)
        }
    }
    return originalPage(options)
}

export default wxPage
