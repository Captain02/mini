import {API} from "../../api/api";
import {WXPROMISE} from "../../utils/wx";
import {COMMON} from "../../utils/common";
import {config} from "../../config/config";

const common = new COMMON();
const wxp = new WXPROMISE();
const md5 = require('js-md5');
const router = require('../../utils/router/index.js');
const event = require('../../utils/event.js');
const api = new API();
const moment = require('moment')

const BASEBEHAVIOR = Behavior({
    //生命周期
    lifetimes: {
        created() {
            //调用api
            this.$api = api
            //自定义路由
            this.$router = router
            //event bus
            this.$event = event
            //md5.js
            this.$md5 = md5
            //promise封装一些wx的api
            this.$wxp = wxp
            //通用方法
            this.$common = common
            //moment.js
            this.$moment = moment
            //配置文件
            this.$config = config
        }
    }
})

export {
    BASEBEHAVIOR
}


