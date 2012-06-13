Ext.define('Vzabote.view.BrandsPopup',{
    extend: 'Vzabote.view.SimplePopup',
    alias: 'widget.brandspopup',
    id: 'brandspopup',
    width: 440,
    height: 300,
    start: 4,
    initComponent: function(){
        this.callParent();
        var dataview = Ext.create('Ext.view.View',{
            xtype: 'dataview',
            itemCls: 'dataview-brands-item',
            cls: 'dataview-brands',
            store: this.store,
            itemSelector:'.brand-item',
            bubbleEvents: ['itemclick'],
            tpl: new Ext.XTemplate('<tpl for=".">'+
                '<tpl if="xindex &gt; '+this.start+'">'+
                    templates.popups.brands.tpl+
                '</tpl>'+
                '<tpl if="xindex &lt; '+this.start+'">'+
                    templates.popups.brands.emptyTpl+
                '</tpl>'+
             '</tpl>')
        });
        
        this.add(dataview);        
    }
    
});
