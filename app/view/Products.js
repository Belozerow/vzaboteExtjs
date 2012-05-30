Ext.define('Vzabote.view.Products',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.products',
   id: 'products',
   layout: {
       type: 'vbox',
       align: 'stretch',
       pack: 'center'
   },
   animDuration: 1000,
   initComponent: function(){
       this.callParent();
       
       this.productTypesPanel = Ext.create('Vzabote.view.ScrollableDataView',Ext.apply({
           store: this.store,
           cardParent: this,
           id: 'products-productstypes',
           metaData: [
                {name: 'Свежая свинина', count: 10},
                {name: 'Полуфабрикаты', count: 5},
                {name: 'Копченая', count: 8},
           ],
       },templates.products.dataview))
       
       this.add(this.productTypesPanel);
       
       this.productsDataPanel = Ext.create('Ext.panel.Panel',{
           layout: {
               type: 'vbox',
               align: 'stretch'
           },
           // hidden: true
           height: 0
       });
       this.productsData = Ext.create('Vzabote.view.ScrollableDataView',Ext.apply({
           store: Ext.getStore('Products'),
           id: 'products-products',
           cardParent: this
       },templates.products.products))
       this.productsDataPanel.add(this.productsData);
       
       this.add(this.productsDataPanel);

       this.cartsPanel = Ext.create('Ext.panel.Panel',{
           xtype: 'panel',
           layout: {
               type: 'vbox',
               align: 'stretch'
           },
           items: [
                Ext.apply({
                },templates.products.cartsTitle),
                Ext.apply({
                   xtype: 'dataview',
                   id: 'products-carts',
                   itemCls: 'products-carts-dataview',
                   store: Ext.getStore('Carts')
                },templates.products.cart)
           ]
       })
       // this.add(this.productsPanel)
       this.add(this.cartsPanel)
       this.mainpageBackButton = Ext.create('Ext.button.Button',Ext.apply({
               xtype: 'button',
               href: '#/index',
               hrefTarget: '_self',
               id: 'products-backbutton',
               cls: 'back-button'
       },templates.products.backbutton));
       this.productsBackButton = Ext.create('Ext.button.Button',Ext.apply({
               xtype: 'button',
               href: '#/products',
               hrefTarget: '_self',
               id: 'products-productsbackbutton',
               cls: 'back-button'
       },templates.products.backbuttonproducts));
       this.bottomPanel = Ext.create('Ext.panel.Panel',{xtype: 'panel',
           dock: 'bottom',
           layout: {
               type: 'hbox',
               pack: 'start'
           },
           items: [
            this.mainpageBackButton,
            this.productsBackButton,
            Ext.apply({
               xtype: 'button',
               href: '#/products',
               hrefTarget: '_self',
               id: 'products-forwardbutton',
               cls: 'forward-button'
            },templates.products.forwardbutton)
           ]
       })
       this.addDocked(this.bottomPanel);
       this.cngButton('main');
           
   },
   cngButton: function(type){
        switch(type){
            case 'main':    
                this.mainpageBackButton.show();
                this.productsBackButton.hide();
                break;
            case 'products':
                this.mainpageBackButton.hide();
                this.productsBackButton.show();
                break;
        }
        
   },
   showProducts: function(callback,scope){
        this.productsDataPanel.animate({
            to: {height: this.getHeight()-this.productTypesPanel.getHeight()},
            from: {height: 0},
            duration: this.animDuration
        });
        
        this.productsData.refresh();
        this.cartsPanel.animate({
            to: {y: Ext.getBody().getHeight()-70},
            from: {y:this.productsDataPanel.getEl().getY()},
            duration: this.animDuration,
            listeners: {
                afteranimate: callback||Ext.emptyFn,
                scope: scope||this
            }
        })         
   },
   hideProducts: function(callback,scope){
        this.productsDataPanel.animate({
            to: {height: 0},
            duration: this.animDuration
        });
        // this.productsData.refresh();
        this.cartsPanel.animate({
            to: {y: this.productsDataPanel.getEl().getY()},
            duration: this.animDuration,
            listeners: {
                afteranimate: callback||Ext.emptyFn,
                scope: scope||this
            }
        })
   },
   refresh: function(){
       this.productTypesPanel.refresh();
       this.productsData.refresh();       
   }
});
