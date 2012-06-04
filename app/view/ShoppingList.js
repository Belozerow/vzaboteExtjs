Ext.define('Vzabote.view.ShoppingList',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.shoppingList',
   id: 'shoppingList',
   layout: {
       type: 'vbox',
       align: 'stretch'
   },
   animDuration: 500,
   initComponent: function(){
       this.callParent();
       
       this.productTypesPanel = Ext.create('Vzabote.view.ScrollableDataView',Ext.apply({
           store: this.store,
           cardParent: this,
           id: 'shoppingList-productstypes',
       },templates.shoppingList.dataview))
       
       this.add(this.productTypesPanel);
       
       this.mainpageBackButton = Ext.create('Ext.button.Button',Ext.apply({
               xtype: 'button',
               href: '#/index',
               hrefTarget: '_self',
               id: 'shoppingList-backbutton',
               cls: 'back-button'
       },templates.shoppingList.backbutton));
       this.productsBackButton = Ext.create('Ext.button.Button',Ext.apply({
               xtype: 'button',
               href: '#/products',
               hrefTarget: '_self',
               id: 'shoppingList-productsbackbutton',
               cls: 'back-button'
       },templates.shoppingList.backbuttonproducts));
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
               id: 'shoppingList-forwardbutton',
               cls: 'forward-button'
            },templates.shoppingList.forwardbutton)
           ]
       })
       this.addDocked(this.bottomPanel);
       this.cngButton('main');
       
    var minprice = 0;
    var maxprice = 0;
    var count = 0;
        this.store.each(function(item){
            minprice+=item.get('minprice');
            maxprice+=item.get('maxprice');
            count += 1;
        })
       this.inTotal = Ext.create('Ext.panel.Panel',{
           //cls: 'categories-panel',
           id: 'shoppingList-intotal-panel',
           layout: {
               type: 'vbox',
               align: 'stretch'
           },
           items: [Ext.apply({
                   flex: 2,
                   //height: 105,
                   id: 'shoppingList-intotal-info',
                   data: {
                       minprice: minprice.toFixed(2),
                       maxprice: maxprice.toFixed(2),
                       count: count
                   }
           },templates.shoppingList.inTotal)],
           flex: 3
       });
       this.add(this.inTotal);
       
       this.saveloadPanel = Ext.create('Ext.panel.Panel',{xtype: 'panel',
           layout: {
               type: 'vbox',
               align: 'right'
           },
           items: [
                Ext.apply({
                xtype: 'button',
                href: '#/',
                hrefTarget: '_self',
                id: 'shopinglist-saveloadbutton'
                },templates.shoppingList.saveLoadButton)
           ]
       })
       this.add(this.saveloadPanel);
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

   showCartContent: function(cart){
       if(!this.cartContent||this.cartContent.isDestroyed){
            this.cartContent = Ext.create('Vzabote.view.ScrollableDataView',Ext.apply({
               store: cart.products(),
               cardParent: this
            },templates.products.cartcontent))
            this.add(this.cartContent)    
       }
   },
   hideCartContent: function(){
       this.remove(this.cartContent)
   },
   refresh: function(){
       this.productTypesPanel.refresh();
       //this.productsList.refresh();       
   },
   getInner: function(){
       return this.getEl().down('#shoppingList-innerCt');
   },
});

