Ext.define('Vzabote.view.MainPage',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.mainpage',
   id: 'mainpage',
   layout: {
       type: 'fit',
       align: 'stretch',
   },
   initComponent: function(){
       this.callParent();
       var categoryButtons = [];
       var categoriesPanel = Ext.create('Ext.panel.Panel',{
           cls: 'categories-panel',
           id: 'mainpage-catpanel',
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
              id: 'mainpage-cat-'+catIndex,
              index: catIndex
          },templates.mainpage.categoryitem))
          catIndex++; 
       });
       categoriesPanel.add({
           xtype: 'panel',
           id: 'mainpage-categoriespanel',
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
            id: 'mainpage-pricestat',
            layout: {
                type: 'vbox',
                align: 'center'   
            },
            items: [
                Ext.apply({
                   xtype: 'button',
                   id: 'mainpage-pricestat-button',
                   hrefTarget: '_self',
                   href: '#/pricestat'
                },templates.mainpage.pricestat)]
        });
       var contentPanel = Ext.create('Ext.panel.Panel',{
           cls: 'categories-content',
           id: 'mainpage-catcontent',
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
               id: 'mainpage-info',
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
