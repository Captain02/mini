/**
 *  分页加载
 *      触发分页  scroll-view的底部触发事件 bindscrolltolower="scrollToLower"
 *      scrollToLower :
 *             调用loadmore 获取更多
 *      ...(详细看代码)
 *
 *      调用this.getList()
 *          所以需要在使用此behaviros的组件中写此方法
 *          注意
 *              getList()中 获取的结果数组 必须命名为list
 *              页码 需调用this.getPage()获取
 *              当加载第二页及其之后页面 需调用setMoreData()方法拼接数据
 *              nextPage 必须获取并赋值 hasMore()方法会根据nextPage判断是否需要加载下一页
 *              getList()中获取数据结束后 必须调用unLoadinged()关闭加载动画
 */

const PAGINATION = Behavior({
    /**
     * 组件的属性列表
     */
    properties: {},

    data: {
        loading: false,
        nextPage:-1,
        total:-1,
        list:[],
        showNoMore:false
    },

    methods: {
        /**
         * 清空list
         */
        clearList(){
            this.setData({
                list:[],
                showNoMore:false
            })
        },
        /**
         * 初始化参数 每次下拉刷新会用到
         */
        pageInit(){
            this.setData({
                nextPage:-1,
                list:[]
            })
        },
        /**
         * 获取当前请求页码
         * @returns {number}
         */
        getPage(){
            return this.data.nextPage==-1?1:this.data.nextPage
        },
        /**
         * 底部触发事件
         *
         * @param e
         */
        scrollToLower() {
            //获取更多
            this.loadMore()
            this.setData({
                showNoMore:true
            })
        },
        /**
         *  获取更多
         */
        loadMore() {
            console.log("loadMore")
            //判断是否在加载中
            if (this.isLoading()) {
                console.log("isLoading")
                return
            }
            console.log(this.hasMore())
            if (this.hasMore()) {
                console.log("hasMore")
                this.loading()
                //开始获取数据
                this.getList()
            }
        },
        /**
         * 判断是否在加载状态
         * @returns {boolean}
         */
        isLoading() {
            return this.data.loading ? true : false
        },
        /**
         * 解锁 完成加载
         */
        unLoading(){
            this.setData({
                loading: false,
            })
        },
        /**
         * 判断是否获取更多
         * @returns {boolean}
         */
        hasMore() {
            if (this.data.nextPage > 0) {
                return true
            } else {
                return false
            }
        },
        /**
         * 加载中 加锁
         */
        loading() {
            this.setData({
                loading: true
            })
        },
        /**
         * 拼接数据
         * @param list
         */
        setMoreData(){
            let list = this.data.addList
            let tempList = this.data.list.concat(list)
            this.setData({
                list:tempList
            })
        },
        getNextPage({total, pageSize = "15"}){
            //当前页面
            let pageNumber = this.getPage()
            let nextPage = -1
            pageSize = parseInt(pageSize)
            if(pageSize * pageNumber < total){
                nextPage = pageNumber + 1
            }
            this.setData({
                nextPage
            })
        }
    }
})

export {
    PAGINATION
}
