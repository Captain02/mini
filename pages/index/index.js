//index.js
import Page from '../../helpers/wxPage.js'

Page({
    data: {

    },
    onLoad: function(options) {
        let data = this.router.extract(options)
        console.log(data)
        console.log(options.c)
        console.log(options.d)
        console.log(this.event)
        this.event.on('DataChanged', this, function(data) {
            this.setData({
                motto: data
            });
        })
    },
    onTap(){
      this.router.push({
          name:"test"
      })
    },
    onUnload: function() {
        this.event.remove('DataChanged', this);
    }
})
