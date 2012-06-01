Ext.define('Vzabote.view.BrandsPopup',{
    extend: 'Vzabote.view.SimplePopup',
    alias: 'widget.brandspopup',
    id: 'brandspopup',
    width: 440,
    height: 300,
    initComponent: function(){
        this.callParent();
        this.store = Ext.getStore(this.store);
        this.add(Ext.apply({
            xtype: 'dataview',
            store: this.store
        },templates.popups.brands));        
    }
    
});
