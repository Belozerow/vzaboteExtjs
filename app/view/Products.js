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
       });
       
       this.add(Ext.apply({
           xtype: 'scrollabledataview',
           store: this.store,
           cardParent: this,
           metaData: [
                {name: 'Свежая свинина', count: 10},
                {name: 'Полуфабрикаты', count: 5},
                {name: 'Копченая', count: 8},
           ]
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
