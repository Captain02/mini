import {API} from "../../api/api";
import {COMMON} from "../../utils/common";

const router = require('../../utils/router/index.js');
const event = require('../../utils/event.js');
const common = new COMMON()
const api = new API()
const originalPage = App.Page

const wxPage = function (options) {
    options.$router = router;
    options.$event = event;
    options.$common = common;
    options.$api = api;

    const {onLoad} = options;
    options.onLoad = function (onLoadOptions) {
        if (typeof onLoad === 'function') {
            onLoad.call(this, onLoadOptions)
        }
    }

    return originalPage(options)
}

export default wxPage
