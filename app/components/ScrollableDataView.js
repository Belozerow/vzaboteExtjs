Ext.define('Vzabote.view.ScrollableDataView',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.scrollabledataview',
    cls: 'scrollable-dataview',
    tpl: '',
    height: 200,
    scrollOverWidth: 300,
    animSpeed: 7,
    animDuration: 700,
    initComponent: function(){
        this.callParent();
        if(!this.store){
            console.error('store is required')
        }
        this.itemElWidth = 0;
        this.store = Ext.getStore(this.store);
        this.dataView = this.add({
            xtype: 'dataview',
            store: this.store,
            height: 200,
            itemCls: 'scrollable-dataview-item',
            itemTpl: this.itemTpl
        })
        this.mon(this.store,'load',function(){
            var itemEl = this.dataView.getEl().first('.scrollable-dataview-item');
            this.itemElWidth = itemEl.getWidth() + itemEl.getMargin().left + itemEl.getMargin().right;
            this.dataView.setWidth(this.store.getCount()*this.itemElWidth+itemEl.getMargin().right);
            
            this.ddTracker = new Ext.dd.DragTracker({
                el: this.dataView.getEl(),
                prevPos: 0,
                speed: 0,
                listeners: {
                    dragstart: function(e){
                        this.ddTracker.prevPos = e.startXY[0];
                        console.log('dragstart');
                    },
                    dragend: function(e){
                        this.dragEnd(this.ddTracker.speed)
                    },
                    drag: function(e){
                        this.ddTracker.speed = this.ddTracker.prevPos - e.lastXY[0];
                        this.scrollTo(this.ddTracker.prevPos - e.lastXY[0])
                        this.ddTracker.prevPos = e.lastXY[0];
                    },
                    scope: this
                }
            });
            // Ext.util.Observable.capture(ddTracker,function(e){
                // console.log(arguments)
            // },this)
        },this);
        // this.addDocked({
            // xtype: 'panel',
            // height: 50,
            // dock: 'bottom',
            // cls: 'scrollabledataview-controller',
            // layout: 'column'
        // })
        // this.addDocked({
            // xtype: 'panel',
            // height: 50,
            // dock: 'bottom',
            // cls: 'scrollabledataview-controller',
            // layout: {
                // type: 'hbox',
                // align: 'stretch'
            // },
            // items: [{
                // xtype: 'button',
                // text: 'left',
                // cls: 'scrollabledataview-left',
                // flex: 1,
                // handler: function(){
                    // this.scrollLeft()
                // },
                // scope: this
            // },{
                // xtype: 'slider',
                // flex: 1,
                // hideLabel: true,
                // useTips: false,
                // minValue: 0,
                // maxValue: 100
            // },{
                // text: 'right',
                // xtype: 'button',
                // cls: 'scrollabledataview-right',
                // flex: 1,
                // handler: function(){
                    // this.scrollRight()
                // },
                // scope: this
            // }]
        // })
        
    },
    scrollTo: function(diff){
        var el = this.dataView.getEl(),
            leftOver = (el.getX() >= this.scrollOverWidth),
            rightOver = (el.getX() - (this.getWidth()-el.getWidth())<-this.scrollOverWidth);
        
        if((!leftOver&&!rightOver) || (leftOver && !rightOver && diff > 0) || (rightOver && !leftOver && diff < 0)){
            if(el.getActiveAnimation()){
                el.getActiveAnimation().end()
            }
            el.setX(el.getX()-diff)    
        }        
    },
    dragEnd: function(speed){
        var el = this.dataView.getEl();
        if(el.getActiveAnimation()){
            el.getActiveAnimation().end()
        }
        el.animate({
            to: {x: Math.max(Math.min(el.getX() - speed*this.animSpeed,0),this.getWidth()-el.getWidth())},
            duration: this.animDuration
        });
    }
})
