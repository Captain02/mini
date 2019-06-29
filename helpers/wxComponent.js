import {BASEBEHAVIOR} from "../behaviors/baseBehavior";
import {LOCK} from "../behaviors/lock";

const originalComponent = Component
const wxComponent = function (options) {
    const {created} = options
    options.behaviors = [
        BASEBEHAVIOR,
        LOCK,
        ...(options.behaviors = options.behaviors || []),
    ],
        options.options = {
            addGlobalClass: true,
        },
        options.created = function (createdOptions) {
            console.log('每个组件都会打出这个log')
            if (typeof created === 'function') {
                created.call(this, createdOptions)
            }
        }
    return originalComponent(options)
}

export default wxComponent
