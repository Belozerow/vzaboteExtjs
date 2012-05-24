Ext.define('Vzabote.view.Products',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.products',
   id: 'products',
   layout: {
       type: 'vbox',
       align: 'stretch',
   },
   initComponent: function(){
       this.callParent();
       this.add({
           html: 'products Page'
       })
       this.add(Ext.apply({
           xtype: 'scrollabledataview',
           store: this.store
       },templates.products.dataview))
       this.add(Ext.apply({
           xtype: 'button',
           href: '#/index',
           hrefTarget: '_self',
           id: 'products-backbutton',
           cls: 'back-button'
       },templates.products.backbutton))
   }
});
