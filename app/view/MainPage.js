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
           cls: 'categories-panel',
           layout: {
               type: 'vbox',
               align: 'stretch',
           },
           items: [Ext.apply({
                   flex: 2
           },templates.mainpage.title)],
           flex: 3
       });
       var catIndex = 0;
       Ext.getStore('Categories').each(function(item){
          
          categoryButtons.push(Ext.apply({
              xtype: 'container',
              data: item.data,
              layout: 'fit',
              flex: 1,
              index: catIndex++
          },templates.mainpage.categoryitem)) 
       });
       categoriesPanel.add({
           xtype: 'panel',
           id: 'category-panel',
           items: categoryButtons,
           layout: {
               type: 'hbox',
               align: 'stretch'
           },
           flex: 10
       });
        categoriesPanel.add({
            xtype: 'panel',
            cls: 'price-stat-panel',
            layout: {
                type: 'vbox',
                align: 'center'   
            },
            items: [
                Ext.apply({
                   xtype: 'button',
                   id: 'price-stat-button',
                },templates.mainpage.pricestat)]
        });
       var contentPanel = Ext.create('Ext.panel.Panel',{
           cls: 'categories-content',
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
