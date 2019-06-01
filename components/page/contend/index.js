// components/page/contend/index.js
import Component from '../../../helpers/wxComponent'

Component({

    /**
     * 用于组件间代码共享的特性，类似于“mixins”
     */
    behaviors: [],

    options:{

    },

    relations: {},

    /**
     * 组件的属性列表
     */
    properties: {
        d:{
            type:Number,
            value:2
        }
    },

    /**
     * 组件数据字段监听器，用于监听 properties 和 data 的变化
     */
    observers:{

    },

    /**
     * 组件的初始数据
     */
    data: {
        a:0
    },


    lifetimes: {

        // 在组件实例刚刚被创建时执行
        created() {

        },
        // 在组件实例进入页面节点树时执行
        attached() {

        },
        // 在组件在视图层布局完成后执行
        ready() {

        },
        //在组件实例被移动到节点树另一个位置时执行
        moved() {

        },
        //在组件实例被从页面节点树移除时执行
        detached() {

        },
        //每当组件方法抛出错误时执行
        error() {

        }
    },
    // 组件所在页面的生命周期函数
    pageLifetimes: {
        show() {

        },
        hide() {

        },
        resize() {

        },
    },
    /**
     * 计算属性
     */
    computed: {
        e(){
            return this.data.a + this.data.d
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
