/**
 *  封装 wx==>API（使用Promise）
 * @author yzh
 * @desc 项目中遇到wxp. 就是这了
 */

class WXPROMISE {

    showActionSheet({itemList, app, itemColor = "#000000"}) {
        return new Promise((resolve, reject) => {
            this._showActionSheet({resolve, reject, app, itemList, itemColor});
        })
    }

    _showActionSheet({resolve, reject, itemList, itemColor}) {
        const app = getApp()
        //安卓机无法点击蒙层取消  加一个取消项  不做任何处理 模拟取消效果
        if (app.platform == "android") {
            itemList.push("取消")
        }
        wx.showActionSheet({
            itemList,
            itemColor,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    }

    scanCode(data) {
        return new Promise((resolve, reject) => {
            this._scanCode(resolve, reject, data);
        })
    }

    _scanCode(resolve, reject, data) {
        wx.scanCode({
            onlyFromCamera: typeof(data.onlyFromCamera) == "boolean" ? data.onlyFromCamera : false,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    }

    chooseImage(data) {
        return new Promise((resolve, reject) => {
            this._chooseImage(resolve, reject, data);
        })
    }

    _chooseImage(resolve, reject, data) {
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    }

    showToast(data) {
        return new Promise((resolve, reject) => {
            this._showToast(resolve, reject, data);
        })
    }

    _showToast(resolve, reject, data) {
        wx.showToast({
            title: typeof(data.title) == "string" ? data.title : "",
            icon: typeof(data.icon) == "string" ? data.icon : "success",
            image: typeof(data.image) == "string" ? data.image : "",
            duration: typeof(data.duration) == "number" ? data.duration : 1500,
            mask: typeof(data.mask) == "boolean" ? data.mask : false,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    }

    setClipboardData(data) {
        return new Promise((resolve, reject) => {
            this._setClipboardData(resolve, reject, data);
        })
    }

    _setClipboardData(resolve, reject, data) {
        wx.setClipboardData({
            data,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    }

    /**
     * 获取code
     */
    login() {
        return new Promise((resolve, reject) => {
            this._login(resolve, reject);
        })
    }

    _login(resolve, reject) {
        wx.login({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    }

    /**
     * 获取缓存
     */
    getStorage(key) {
        return new Promise((resolve, reject) => {
            this._getStorage(resolve, reject, key);
        })
    }

    _getStorage(resolve, reject, key) {
        wx.getStorage({
            key,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    }

    /**
     * 写入缓存
     */
    setStorage(data) {
        return new Promise((resolve, reject) => {
            this._setStorage(resolve, reject, data);
        })
    }

    _setStorage(resolve, reject, data) {
        wx.setStorage({
            "key": data.key,
            "data": data.value,
            success: (res) => {
                this.token = data.value
                //返回设置的token
                resolve(data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    }

    /**
     * 远程图片本地缓存
     */
    getImageInfo(src) {
        return new Promise((resolve, reject) => {
            this._getImageInfo(resolve, reject, src);
        })
    }

    _getImageInfo(resolve, reject, src) {
        wx.getImageInfo({
            src: src,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    }

    /**
     * canvas导出图片
     */
    canvasToTempFilePath(data) {
        return new Promise((resolve, reject) => {
            this._canvasToTempFilePath(resolve, reject, data);
        })
    }

    _canvasToTempFilePath(resolve, reject, data) {
        wx.canvasToTempFilePath({
            x: data.x,
            y: data.y,
            width: data.width,
            height: data.height,
            destWidth: data.destWidth,
            destHeight: data.destHeight,
            canvasId: data.canvasId,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    }


    /**
     * 保存图片到系统相册
     */
    saveImageToPhotosAlbum(filePath) {
        return new Promise((resolve, reject) => {
            this._saveImageToPhotosAlbum(resolve, reject, filePath);
        })
    }

    _saveImageToPhotosAlbum(resolve, reject, filePath) {
        wx.saveImageToPhotosAlbum({
            filePath: filePath,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    }
}

export {
    WXPROMISE
}
