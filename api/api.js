import {HTTP} from "./http";
import {config} from "../config/config";

const licia = require('miniprogram-licia');

const http = new HTTP()
const wxp = licia.wx

class API extends HTTP {
    /**
     * 登录
     * @param action
     * @param data
     */
    login({username, password}) {
        let action = `api/sys/login?username=${username}&password=${password}`
        let url = config.apiUrl + action;
        let data = arguments[0]
        return http.request({url, data})
    }

    logout({username}) {
        let action = "api/logout";
        let data = arguments[0]
        return this.quary({action, data})
    }

    userInfo() {
        let action = "api/userInfo";
        return this.quary({action, method: "GET"})
    }

    notToken() {
        let action = "api/notToken";
        let url = config.apiUrl + action;
        return http.request({url, method: "GET"})
    }

// /corporation/getListPage
    corporationGetListPage({currPage = 1, pageSize = 30,}) {
        let action = "corporation/getListPage";
        let data = arguments[0]
        return this.quary({action ,data, method: "GET"})
    }

    quary({action, data = {}, method = "POST"}) {
        let url = config.apiUrl + action;
        return wxp.getStorage({key: "token"}).then(success => {
            // 获取uid成功
            let token = success.data
            // data.systemId = config.systemId
            return http.request({url, data, token, method})
        }, () => {
            console.log("没有token")
            return http.request({url, data, method});
        })
    }


}

export {
    API
}
