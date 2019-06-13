import Store from './store';

const licia = require('miniprogram-licia');

const store = new Store({
    state: {
        msg: '这是一个全局状态',
        message:[]
    },
    methods: {
        setState(obj, callback) {
            store.setState(obj, callback)
        },
        getState(val) {
            return store.STATE[val]
        },
        message({message = "", type = "info", duration = 3000, showClose = false, center = false ,slot = "", icon =false}) {
            // console.log(this.data.STATE.message)
            let data = {message, type, duration, showClose, center ,slot ,icon ,}
            this.$event.emit("message",data)
        }
    },
    //页面监听
    pageLisener: {
        onLoad(options){
            this.$licia = licia
        }
    },
    // 开启局部模式
    openPart: true,
    // store源码重写Page、Component。
    nonWritable: false
})
export {
    store
}
