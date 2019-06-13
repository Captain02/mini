// components/component/select/index.js
import Component from '../../helpers/wxComponent.js'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        options: {
            type: Object,
            value: {}
        }
    },

    observers: {
        'options': function (options) {
            if (options && options.options.length > 0) {
                let _options = JSON.parse(JSON.stringify(options.options));
                let {prop} = options;
                if (prop.length > 0) {
                    prop.some((propItem, index) => {
                        let optionItem = _options[index];
                        optionItem.some((item) => {
                            item.selectValue = item[propItem];
                        })
                        this.data.value.push(0)
                    })
                }
                this.setData({
                    _options
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        value:[]
    },

    /**
     * 生命周期
     */
    lifetimes: {
        attached() {
            this.$event.on("pickViewChange", this, (value) => {
                value = this.getValue(value);
                this.triggerEvent('change', value);
                if (this.isLocked()) {
                    return
                }
                this.triggerEvent('confirm', value);
            });
        },
        detached() {
            this.$event.remove("pickViewChange", this);
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        cancel() {
            this.triggerEvent('cancel')
        },
        onConfirm() {
            if (this.isLocked()) {
                //解锁
                this.unLocked()
                return
            }
            let {value} = this.data
            value = this.getValue(value);
            this.triggerEvent('confirm', value)
        },
        onChange(e) {
            let {value} = e.detail
            this.setData({
                value
            })
            this.$event.emit("pickViewChange", value)
        },
        bindpickstart() {
            this.locked()
        },
        bindpickend() {
            this.unLocked()
        },
        getValue(value) {
            let options = []
            let option = this.data.options.options
            value.some((item, index) => {
                options.push({
                    column: index,
                    index: item,
                    val: option[index][item]
                })
            })
            return options
        },
        catchTap() {

        },
    }
})
