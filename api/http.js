import {config} from "../config/config";
const licia = require('miniprogram-licia');
class HTTP {
    request({url, data = {}, token = "", method = 'POST'}) {
        return new Promise((resolve, reject) => {
            this._request(resolve, reject, url, data, token, method)
        })
    }

    _request(resolve, reject, url, data, token, method = 'POST') {
        let header = {
            'content-type': 'application/json',
            // 'AppId': config.projectAppId,
            Authorization:token
        }

        // //data里传token
        // if(!!token){
        //     data.token = token;
        // }

        let request = licia.wx.request({
            url,
            method,
            data,
            header,
        }).then(success=>{
            console.log(success)
            console.log(request)
        },error=>{
            console.log(error)
            console.log(request)
        })
    }
}

export {
    HTTP
}
