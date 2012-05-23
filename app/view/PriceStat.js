Ext.define('Vzabote.view.PriceStat',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.pricestat',
   layout: 'column',
   initComponent: function(){
       this.callParent();
       
       this.addDocked(Ext.apply({
       },templates.pricestat.title))
       var index = 0;
       Ext.getStore('Categories').each(function(item){
          this.add(Ext.apply({
              xtype: 'container',
              data: item.data,
              columnWidth: .25,
              index: index
          },templates.pricestat.stat))
          index++; 
       },this);
       
       this.addDocked({
           xtype: 'panel',
           dock: 'bottom',
           items: Ext.apply({
               xtype: 'button',               
           },templates.pricestat.goback)
       })
   }
});
