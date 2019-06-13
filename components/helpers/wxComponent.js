import {BASEBEHAVIOR} from "../behaviors/baseBehavior";
import {LOCK} from "../behaviors/lock";
import computedBehavior from '../behaviors/computedBehavior'
import safeSetDataBehavior from '../behaviors/safeSetDataBehavior'
const originalComponent = App.Component
const wxComponent = function (options) {
    const {created} = options;
    options.behaviors = [
        BASEBEHAVIOR,
        LOCK,
        computedBehavior,
        safeSetDataBehavior,
        ...(options.behaviors = options.behaviors || []),
    ],
    options.options = {
        addGlobalClass: true,
        multipleSlots: true
    },
    options.externalClasses = [
        'u-class',
        ...(options.externalClasses = options.externalClasses || [])],
    options.created = function (createdOptions) {
        if (typeof created === 'function') {
            created.call(this, createdOptions)
        }
    };
    return originalComponent(options)
}

export default wxComponent
