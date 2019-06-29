const moment = require('moment')

/**
 * @author yzh
 * @desc 通用工具类
 */
class COMMON {
    /***
    * 判断字符串为空
    */
    strIsNull(str){
        let reg = /\S/;
        let result = !reg.test(str);
        return result;
    }

    /**
     * 动态设置当前页面的标题
     */
    setNavigationBarTitle(title) {
        wx.setNavigationBarTitle({
            title
        })
    }

    /**
     * 获取Utc时间（世界标准时间）
     */
    getUtc() {
        let date = new Date();
        date = date.toUTCString()
        return moment(date, 'ddd, DD MMM YYYY HH:mm:ss ZZ').format('YYYY-MM-DDTHH:mm:ss') + "Z";
    }

    /**
     * Promise封装timeout
     * @param timeout
     * @returns {Promise<any>}
     */
    myTimeOut(timeout) {
        return new Promise((resolve, reject) => {
            this._myTimeOut(resolve, reject, timeout);
        })
    }

    _myTimeOut(resolve, reject, timeout) {
        setTimeout(function () {
            resolve("延时" + timeout + "毫秒")
        }, timeout)
    }


}

export {
    COMMON
}

