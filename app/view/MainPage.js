Ext.define('Vzabote.view.MainPage',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.mainpage',
   layout: {
       type: 'fit',
       align: 'stretch',
   },
   initComponent: function(){
       this.callParent();
       var categoryButtons = [];
       var categoriesPanel = Ext.create('Ext.panel.Panel',{
           layout: {
               type: 'vbox',
               align: 'stretch',
           },
           items: [{
                   html: 'Простой и удобный инструмент для ежедневных покупок',
                   flex: 2
           }],
           flex: 3
       });
       Ext.getStore('Categories').each(function(item){
          categoryButtons.push(Ext.apply({
              xtype: 'container',
              data: item.data,
              layout: 'fit',
              flex: 1
          },templates.mainpage.categoryitem)) 
       });
       categoriesPanel.add({
           xtype: 'panel',
           items: categoryButtons,
           layout: {
               type: 'hbox',
               align: 'stretch'
           },
           flex: 10
       });
        categoriesPanel.add({
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'center'   
            },
            items: [
                Ext.apply({
                   xtype: 'button',
                },templates.mainpage.pricestat)]
        });
       var contentPanel = Ext.create('Ext.panel.Panel',{
           layout: {
               type: 'hbox',
               align: 'stretch'
           },
           items: [categoriesPanel,{
               xtype: 'panel',
               layout: {
                   type: 'vbox',
                   align: 'stretch',
               },
               cls: 'info-panel',
               items: [
                   Ext.apply({
                        flex: 1   
                   },templates.mainpage.infopanelfirst),
                   Ext.apply({
                        flex: 1   
                   },templates.mainpage.infopanelsecond),
                   Ext.apply({
                        flex: 1   
                   },templates.mainpage.infopanelthird)
               ],
               flex: 1
           }]
           
       })
       this.add(contentPanel);       
   }
});
