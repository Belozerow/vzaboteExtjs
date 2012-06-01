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
           metaData: [
                {name: 'Свежая свинина', count: 10},
                {name: 'Полуфабрикаты', count: 5},
                {name: 'Копченая', count: 8},
           ]
       },templates.shoppingList.dataview))
       
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
       },templates.shoppingList.products))
       this.productsDataPanel.add(this.productsData);
       
       this.add(this.productsDataPanel);
       this.cartsDataView = Ext.create('Ext.view.View',Ext.apply({
                   id: 'shoppingList-carts',
                   itemCls: 'products-carts-dataview',
                   store: Ext.getStore('Carts'),
                   bubbleEvents: ['itemclick']
       },templates.products.cart)) 
//       this.cartsPanel = Ext.create('Ext.panel.Panel',{
//           xtype: 'panel',
//           id: 'products-cartspanel',
//           layout: {
//               type: 'vbox',
//               align: 'stretch'
//           },
//           items: [
//                Ext.apply({
//                },templates.products.cartsTitle),
//                this.cartsDataView
//           ]
//       })
//       // this.add(this.productsPanel)
//       this.add(this.cartsPanel)
       this.mainpageBackButton = Ext.create('Ext.button.Button',Ext.apply({
               xtype: 'button',
               href: '#/index',
               hrefTarget: '_self',
               id: 'products-backbutton',
               cls: 'back-button'
       },templates.shoppingList.backbutton));
       this.productsBackButton = Ext.create('Ext.button.Button',Ext.apply({
               xtype: 'button',
               href: '#/products',
               hrefTarget: '_self',
               id: 'products-productsbackbutton',
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
               id: 'products-forwardbutton',
               cls: 'forward-button'
            },templates.shoppingList.forwardbutton)
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
//        this.cartsPanel.animate({
//            to: {y: Ext.getBody().getHeight()-70},
//            from: {y:this.productsDataPanel.getEl().getY()},
//            duration: this.animDuration,
//            listeners: {
//                afteranimate: callback||Ext.emptyFn,
//                scope: scope||this
//            }
//        })         
   },
   hideProducts: function(callback,scope){
        this.productsDataPanel.animate({
            to: {height: 0},
            duration: this.animDuration
        });
//        this.cartsPanel.animate({
//            to: {y: this.productsDataPanel.getEl().getY()},
//            duration: this.animDuration,
//            listeners: {
//                afteranimate: callback||Ext.emptyFn,
//                scope: scope||this
//            }
//        })
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
       this.productsData.refresh();       
   },
   getInner: function(){
       return this.getEl().down('#products-innerCt');
   },
   disableCartsDataView: function(cart){
       if(this.cartsDataView.viewReady){
            this.cartsDataView.mask();
            this.activeElement = Ext.get(this.cartsDataView.getNode(cart));
            this.activeElement.addCls('scrollable-dataview-item-selected')    
       }
       else{
            this.cartsDataView.on('viewready',function(){
                this.cartsDataView.mask();
                this.activeElement = Ext.get(this.cartsDataView.getNode(cart));
                this.activeElement.addCls('scrollable-dataview-item-selected')    
            },this,{single: true})    
       }
   },
   enableCartsDataView: function(){
       this.cartsDataView.getTargetEl().unmask()
       this.activeElement.removeCls('scrollable-dataview-item-selected')
   }
});
