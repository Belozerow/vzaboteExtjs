Ext.define('Vzabote.view.ScrollableDataView',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.scrollabledataview',
    cls: 'scrollable-dataview',
    tpl: '',
    height: 200,
    itemElWidth: 0,
    initComponent: function(){
        this.callParent();
        if(!this.store){
            console.error('store is required')
        }

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
            this.dataView.setWidth(this.store.getCount()*this.itemElWidth);
            
            this.ddTracker = new Ext.dd.DragTracker({
                el: this.dataView.getEl(),
                prevPos: 0,
                listeners: {
                    dragstart: function(e){
                        this.ddTracker.prevPos = e.startXY[0];
                        console.log('dragstart');
                    },
                    dragend: function(e){
                        console.log('dragend')
                    },
                    drag: function(e){
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
        
        this.addDocked({
            xtype: 'panel',
            height: 50,
            dock: 'bottom',
            cls: 'scrollabledataview-controller',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'button',
                text: 'left',
                cls: 'scrollabledataview-left',
                flex: 1,
                handler: function(){
                    this.scrollLeft()
                },
                scope: this
            },{
                xtype: 'slider',
                flex: 1,
                hideLabel: true,
                useTips: false,
                minValue: 0,
                maxValue: 100
            },{
                text: 'right',
                xtype: 'button',
                cls: 'scrollabledataview-right',
                flex: 1,
                handler: function(){
                    this.scrollRight()
                },
                scope: this
            }]
        })
        
    },
    scrollTo: function(diff){
        var el = this.dataView.getEl();
        el.setX(el.getX()-diff)
        // if(el.getActiveAnimation()){
            // el.getActiveAnimation().end()
        // }
        // el.animate({
            // to: {x: el.getX()+diff},
            // duration: 20
        // });                
    }
})
