Ext.define('Vzabote.view.PriceStat',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.pricestat',
   layout: 'column',
   initComponent: function(){
       this.callParent();
       
       this.addDocked(Ext.apply({
           id: 'pricestat-title'
       },templates.pricestat.title));
       //Можно/нужно было dataview использовать
       var index = 0;
       Ext.getStore('Categories').each(function(item){
          this.add(Ext.apply({
              xtype: 'container',
              data: item.data,
              columnWidth: 0.25,
              id: 'pricestat-cat-'+index,
              index: index
          },templates.pricestat.stat));
          index++; 
       },this);
       
       this.addDocked({
           xtype: 'panel',
           dock: 'bottom',
           id: 'pricestat-bottom',
           items: Ext.apply({
               xtype: 'button',
               href: '#/index',
               id: 'pricestat-back',
               hrefTarget: '_self'
           },templates.pricestat.goback)
       });
   }
});
