import {BASEBEHAVIOR} from "../components/behaviors/baseBehavior";
import {LOCK} from "../components/behaviors/lock";
import computedBehavior from '../components/behaviors/computedBehavior'
import safeSetDataBehavior from '../components/behaviors/safeSetDataBehavior'
const originalComponent = Component
const wxComponent = function (options) {
    const {created} = options;
    options.externalClasses = ['u-class'],
    options.options = {addGlobalClass: true},
    options.behaviors = [
        BASEBEHAVIOR,
        computedBehavior,
        safeSetDataBehavior,
        LOCK,
        ...(options.behaviors = options.behaviors || []),
    ],
    options.created = function (createdOptions) {
        console.log('每个组件都会打出这个log')
        if (typeof created === 'function') {
            created.call(this, createdOptions)
        }
    }
    return originalComponent(options)
}

export default wxComponent
