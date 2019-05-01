const LOCK = Behavior({

    //混入
    behaviors: [],

    //
    properties: {},

    data: {
        behaviorLock:false,
    },

    //生命周期
    lifetimes: {
        attached() {

        }
    },

    methods: {
        isLocked(){
            return this.data.behaviorLock
        },
        locked(){
            this.setData({
                behaviorLock:true
            })
        },
        unLocked(){
            this.setData({
                behaviorLock:false
            })
        },
    }
})
export {
    LOCK
}
