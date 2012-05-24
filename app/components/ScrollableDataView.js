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
        },this);
        Ext.util.Observable.capture(this.dataView,function(){
            console.log(arguments)
        },this)
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
    scrollLeft: function(){
        // if(this.getWidth()+this.dataView.getX())
        var el = this.dataView.getEl();
        el.scrollBy(100,100,true)
    },
    scrollRight: function(){
        this.dataView.getEl().animate({
            to: {x:this.dataView.getEl().getX()-100}
        })
                
    }
})
