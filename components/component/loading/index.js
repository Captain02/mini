// components/shk/loading/index.js
import Component from '../../helpers/wxComponent.js'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        loading:{
            type:Boolean,
            value:false
        },
        showNoMore:{
            type:Boolean,
            value:false
        },
        nextPage:{
            type:Number,
            value:-1
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {}
})
