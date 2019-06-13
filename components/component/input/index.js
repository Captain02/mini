// components/component/input/index.js
Component({
    options: {
        //接受全局样式 存在外部样式污染组件样式的风险
        addGlobalClass: true,
        // 在组件定义时的选项中启用多slot支持
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        inputValue: {
            type: String,
            value: '',
        },
        type: {
            type: String,
            value: 'text',
        },
        password: {
            type: Boolean,
            value: false,
        },
        placeholder: {
            type: String,
            value: '',
        },
        placeholderStyle: {
            type: String,
            value: '',
        },
        placeholderClass: {
            type: String,
            value: 'input-placeholder',
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        maxlength: {
            type: Number,
            value: 140,
        },
        cursorSpacing: {
            type: Number,
            value: 11,
        },
        focus: {
            type: Boolean,
            value: false,
        },
        confirmType: {
            type: String,
            value: 'done',
        },
        confirmHold: {
            type: Boolean,
            value: false,
        },
        cursor: {
            type: Number,
            value: -1,
        },
        selectionStart: {
            type: Number,
            value: -1,
        },
        selectionEnd: {
            type: Number,
            value: -1,
        },
        adjustPosition: {
            type: Boolean,
            value: true,
        },
        showCancelBtn: {
            type: Boolean,
            value: false,
        },
        borderBottom: {
            type: Boolean,
            value: false,
        },
        textAlign:{
            type:String,
            value:"left"
        },
        borderBottom:{
            type: Boolean,
            value: true,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onChange(e) {
            this.triggerEvent('change', e.detail)
        },
        onFocus(e) {
            this.triggerEvent('focus', e.detail)
        },
        onBlur(e) {
            this.triggerEvent('blur', e.detail)
        },
        onConfirm(e) {
            this.triggerEvent('confirm', e.detail)
        },
        cancelInput() {
            this.triggerEvent('cancel')
        },
    }
})
