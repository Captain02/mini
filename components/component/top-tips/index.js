// components/component/top-tips/index.js
import Component from '../../helpers/wxComponent.js'

const app = getApp();

// 10秒清空所有通知
Component({
    useStore: true,
    useProp: ['message'], //指定使用s1
    /**
     * 组件的属性列表
     */
    properties: {
        // show: {
        //     type: Boolean,
        //     value: false
        // },
        zIndex: {
            type: Number,
            value: 5000
        }
    },

    observers: {
        'STATE.message.**': function (obj) {
            if (!this.$licia.isNil(obj)) {
                app.clearMessage()
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        message: [],
        color: {
            success: "green",
            info: "grey",
            warning: "yellow",
            error: "red"
        }
    },

    lifetimes: {
        attached() {
            this.$event.on("message", this, (e) => {
                // console.log(e)
                let {type, duration, showClose} = e;
                let {color} = this.data;
                let message = this.getState("message")
                e = Object.assign(e, {
                    bgColor: color[type],
                    show: false,
                    exist: true
                })
                let index = message.length;
                let messageItem = `message[${index}]`;
                this.setState({
                    [messageItem]: e
                })
                this.showMessage(index, duration, showClose)
            })
            wx.onAppHide(() => {
                // let {message} = this.data
                // let _message = []
                // message.some((item)=>{
                //    console.log(item)
                // })
                this.setState({
                    message: []
                })
            })
        },
        //在组件实例被从页面节点树移除时执行
        detached() {
            this.$event.remove("message", this)
        },
    },


    /**
     * 组件的方法列表
     */
    methods: {
        onTap() {
            console.log("tap")
        },
        showMessage(index, duration, showClose) {
            let message = `message[${index}].show`;
            this.$common.myTimeOut(1).then(() => {
                this.setState({
                    [message]: true
                })
                return this.$common.myTimeOut(duration)
            }).then(() => {
                this.setState({
                    [message]: false
                })
                return this.$common.myTimeOut(300)
            }).then(() => {
                this.close(index)
            })
        },
        close(index) {
            let message = `message[${index}].exist`;
            this.setState({
                [message]: false
            })
        },
        closeTap(e) {
            let index = this.$common.getDatasetDataFromEvent(e, "index");
            let message = `message[${index}].show`;
            this.setState({
                [message]: false
            })
            message = `message[${index}].exist`;
            this.$common.myTimeOut(300).then(() => {
                this.setState({
                    [message]: false
                })
            })
        }
    }
})
