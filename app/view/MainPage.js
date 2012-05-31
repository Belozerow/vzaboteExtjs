Ext.define('Vzabote.view.MainPage',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.mainpage',
   id: 'mainpage',
   layout: {
       type: 'fit',
       align: 'stretch'
   },
   initComponent: function(){
       this.callParent();
       var categoryButtons = [];
       var categoriesPanel = Ext.create('Ext.panel.Panel',{
           cls: 'categories-panel',
           id: 'mainpage-catpanel',
           layout: {
               type: 'vbox',
               align: 'stretch'
           },
           items: [Ext.apply({
                   flex: 2,
                   //height: 105,
                   id: 'mainpage-title'
           },templates.mainpage.title)],
           flex: 3
       });
       //может стоит использовать dataview
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
           items: [categoriesPanel,Ext.apply({
               cls: 'info-panel',
               id: 'mainpage-info',
               width: 226,
               layout: {
                   type: 'vbox',
                   align: 'stretch'
               },
               items: [
                    Ext.apply({
                        flex: 1,
                        id: 'sidebar-f'
                    },templates.mainpage.infopanelfirst),
                    Ext.apply({
                        flex: 1,
                        id: 'sidebar-s'
                    },templates.mainpage.infopanelsecond),
                    Ext.apply({
                        height: 179,
                        id: 'sidebar-t'
                    },templates.mainpage.infopanelthird)
               ] 
           },templates.mainpage.infopanel)]
           
       })
       this.add(contentPanel);
   }
});