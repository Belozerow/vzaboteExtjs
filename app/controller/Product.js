Ext.define('Vzabote.controller.Product',{
   extend: 'Ext.app.Controller',
   refs: [{
       ref: 'cardPanel',
       selector: '#cardpanel'
   },{
       ref: 'productsBackButton',
       selector: '#products-backbutton'
   },{
       ref: 'productTypesSlider',
       selector: '#products-productstypes'
   },{
       ref: 'productsSlider',
       selector: '#products-products'
   },{
	   ref: 'viewportTopPanel',
	   selector: '#top-panel'
   },{
       ref: 'cartsDataView',
       selector: '#products-carts'
   }],
   init: function(){
	   
	   this.mon(Ext.getStore('UserCart'), 'add', function(store, item, index, eOpts){
		   console.log(store, item, index, eOpts);
		   
	   },this);
	   
   },
   index: function(query){
       if(query){
           this.category = query.category;
           Vzabote.bc.setItem('products',{
               url: '#/products/'+this.category,
               back: {url: '#/index', text: 'На главную'},
               forward: {url: '#/cart', text: 'Список покупок'}
           });
       }
       var cardPanel = this.getCardPanel();
       if(this.productsView&&this.productsView.getEl()){
           this.productsView.hideProducts();           
       }
       if(this.productsView&&this.productsView.getEl()){
           this.productsView.hideCartContent();
       }
       if(cardPanel.layout.getActiveItem().xtype!='products'){
           
            this.getController('Viewport').closeAllWindows();
            var store;
            this.productsStore = Ext.getStore('Products');
            this.cartsStore = Ext.getStore('Carts');
            switch(this.category){
                case 'food':
                    store = this.store = Ext.getStore('ProductTypes');
                    this.cartsStore.clearFilter();
                    break;
                case 'med':
                    store = this.store = Ext.getStore('MedTypes');
                    this.cartsStore.clearFilter();
                    this.cartsStore.filter('custom',true);
                    this.productsStore = Ext.getStore('MedProducts');
                    break;
                case 'gas':
                    store = this.store = Ext.getStore('ProductTypes');
                    this.cartsStore.clearFilter();
                    this.cartsStore.filter('custom',true);
                    break;
            }
            
            if(store.getCount() === 0){
                this.mon(store,'load',function(){
                    this.showCategoryHintPopup();
                },this,{single: true});
                store.load();
            }
                        
            if(!this.productsView||this.productsView.isDestroyed){
                
                this.productsView = Ext.create('Vzabote.view.Products',{
                    store: this.store,
                    productsStore: this.productsStore,
                    cartsStore: this.cartsStore,
                    parentHeight: this.getCardPanel().getHeight(),
                    cardPanel: this.getCardPanel(),
                    category: this.category,
                    viewportHeader: this.getViewportTopPanel(),
                    listeners: {
                        productsData: {
                            itemclick: function(me,item,node,index,e){
                                var el = Ext.get(e.getTarget());
                                var duration = 950;
                                var id = item.get('id');
                                
                                if(el.hasCls('loupe')){
                                     this.showProductPopup(node,item, duration);
                                }
                                
                                var uStore = Ext.getStore('UserCart');
                                
                                // Если такой элемент отсутствует в сторе и клик был по изображению товара, то можно его добавить
                                if (!uStore.existProduct(item) && el.hasCls('product-image')){
                                	// Добавляем продукт в стор и показываем анимацию
                                	this.addAnimateProduct(uStore, item, node, duration);
                                }
                                
                            },
                            scope: this
                        },
                        cartcontentitemclick: function(me,item,node,index,e){ 
                                var el = Ext.get(e.getTarget());
                                var duration = 950;
                                
                                if(el.hasCls('loupe')){
                                     this.showProductPopup(node,item,duration);
                                }
                                
                                var uStore = Ext.getStore('UserCart');
                                
                                // Если такой элемент отсутствует в сторе и клик был по изображению товара, то можно его добавить
                                if (!uStore.existProduct(item) && el.hasCls('product-image')){
                                	// Добавляем продукт в стор и показываем анимацию
                                	this.addAnimateProduct(uStore, item, node, duration);
                                }
                                
                                
                        },
                        cartsDataView: {
                            itemclick: function(me,item,node,index,e){
                                var el = Ext.get(e.getTarget());
                                if(el.hasCls('cart-info')){
                                     this.showCartInfoPopup(el,item);
                                }
                            },
                            scope: this
                        },
                        slider: {
                            change: function(me,val,thumb){
                                if(thumb.index === 0){
                                    this.productsView.updateSliderInfo({minprice: val});
                                }
                                else {
                                    this.productsView.updateSliderInfo({maxprice: val});
                                }
                                
                            },
                            scope: this
                        },
                        brandsFilter: {
                            click: function(me){
                                this.showBrandsPopup(me);
                            },
                            scope: this
                        },
                        scope: this
                    }
                });
                this.productsView.on('deactivate',function(){
                    this.stopAnimation();
                    this.productsView.productsIsShown =  false;
                    this.productsView.cartIsShown = false;
                    this.productsView.destroy();                    
                },this);
            }
            cardPanel.layout.setActiveItem(this.productsView);
       }
   },
   product: function(query){
       this.category = query.category;
       Vzabote.bc.setItem('products',{
           back: {url: '#/products/'+this.category, text: 'Продукты'},
           forward: {url: '#/cart', text: 'Список покупок'},
           url: '#/products/'+this.category
       });
       if(!this.productsView||this.productsView.isDestroyed){
           this.index(false);
       }  
       if(this.category == 'med'){
           this.productsStore.search(query.id);
       }     
       Vzabote.util.onEventOrNow(this.store,'load',this.store.isLoading,true,function(){
           this.productsView.updateSliderInfo({name: this.store.getById(query.id).get('name')});
       },this,{single: true});
       Vzabote.util.onEventOrNow(this.getProductTypesSlider().dataView,'viewready','viewReady',undefined,function(){
           this.getProductTypesSlider().disableDataView(query.id);
           this.productsView.showProducts(function(){
               this.showProductHintPopup();
           },this);
       },this);
              
   },
   
   carts: function(query){
       this.category = query.category;
       Vzabote.bc.setItem('products',{
           back: {url: '#/products/'+this.category, text: 'Продукты'},
           forward: {url: '#/cart', text: 'Список покупок'},
           url: '#/products/'+this.category
        });
        if(!this.productsView||this.productsView.isDestroyed){
            this.index(false);
        }            
        var cart = Ext.getStore('Carts').getById(parseInt(query.id));
        Vzabote.util.onEventOrNow(this.getCartsDataView().dataView,'viewready','viewReady',undefined,function(){
           this.productsView.disableCartsDataView(cart);
           this.productsView.showCartContent(cart);
        },this);
        
   },
   showCategoryHintPopup: function(){
       if(!(this.productsView.isAnimationActive())&&!this.productsView.productsIsShown&&!this.productsView.cartIsShown&&!this.productsView.isDestroyed){
           this.productsView.mon(this.getProductTypesSlider().dataView,'show',function(){
                var element = this.getProductTypesSlider().getEl().down('.producttypes-image');
                if(this.infoPopup)
                    this.infoPopup.close();
                this.infoPopup = Ext.create('widget.simplepopup',Ext.apply({
                   ownerEl: element,
                   id: 'products-choose-info-popup',
                   cls: 'info-popup'
                },templates.popups.productsChooseInfo));
                this.infoPopup.show();    
           },this,{single: true});    
       }   
   },
   showProductHintPopup: function(){
       //TODO привязать к store.load
       if(!this.infoProductPopup){
           var element = this.getProductsSlider().getEl().down('.product-image');
           this.infoProductPopup = Ext.create('widget.simplepopup',Ext.apply({
               ownerEl: element,
               id: 'products-hint-info-popup',
               cls: 'info-popup'
           },templates.popups.productsProductInfo));
           this.infoProductPopup.show();
       }
   },
   showCartInfoPopup: function(element, item){
       if(this.cartInfoPopup)
            this.cartInfoPopup.close();       
       this.cartInfoPopup = Ext.create('widget.simplepopup',Ext.apply({
           ownerEl: element,
           id: 'products-carts-info-popup',
           cls: 'info-popup',
           data: item.data,
           alignPosition: 'bl-t'
       },templates.popups.cartInfoPopup));
       this.cartInfoPopup.show();  
   },
   showProductPopup: function(element, item, duration){
       if(this.productPopup)
            this.productPopup.close();       
       this.productPopup = Ext.create('widget.simplepopup',Ext.apply({
           ownerEl: element,
           id: 'products-info-popup',
           cls: 'info-popup',
           layout: {
               type: 'vbox',
               align: 'stretch' 
           },
           alignPosition: 'c-c',
           items: [Ext.apply({
               data: item.data
           },templates.popups.productPopup),Ext.apply({
               xtype: 'button',
               listeners: {
            	   click:function(btn, e, prop){
						var uStore = Ext.getStore('UserCart');
						
						if (!uStore.existProduct(prop.options.item)){
							// Добавляем продукт в стор и показываем анимацию
							this.addAnimateProduct(uStore, prop.options.item, prop.options.node, prop.options.duration);
						}
						
            	   },
            	   scope: this,
            	   options: {
            		   node: element,
            		   item: item,
            		   duration: duration
            	   }
               }
           },templates.popups.productPopupButton)]
       },templates.popups.productPopup));
       this.productPopup.show();
   },
   showBrandsPopup: function(element){
       if(this.brandsPopup)
            this.brandsPopup.close();       
       this.brandsPopup = Ext.create('widget.brandspopup',Ext.apply({
           ownerEl: element,
           alignPosition: 'tr-br',
           store: Ext.getStore('Brands'),
           listeners: {
               itemclick: function(me,item,node,index,e){
                   Ext.getStore('Brands').each(function(storeitem){
                       storeitem.set('selected',false);
                   });
                   item.set('selected',true);
                   this.productsView.setBrandText(item.get('name'));
                   this.brandsPopup.close();
               },
               scope: this
           }
       },templates.popups.brands));
       this.brandsPopup.show();
   },
   stopAnimation: function(){
       this.productsView.stopAnimation();
   },
   
   
   /**
    * Используется для анимации добавления товара в корзину.
    * Создает копию изображения, которое является дочерним элементом node.
    * @param item Instance модели. Из него берется ссылка на изображение
    * @param node dom элемента, содержащего изображение. Нужен для получения 
    * координат, ширины и высоты для нового изображения
    * 
    */
   createAnimateImg: function(item, node){
	   
		//--------------- Получаем параметры выбранного элемента
		// div-элемент в котором лежит изображение
		domEl = Ext.get(node);
		// Слой с изображением
		imgEl=Ext.DomQuery.selectNode('#imgProd', domEl.dom);
		// DOM слоя с изображением
		domImgEl=Ext.get(imgEl);
	
		//--Параметры исходного изображения
	
		srcW = domImgEl.getWidth();
		srcH = domImgEl.getHeight();
		srcX = domImgEl.getX();
		srcY = domImgEl.getY();
	
	
	
		//--------------- Создание временного элемента
	
		// Получаем body
		body = Ext.DomQuery.selectNode('.x-body');
		// Получаем id от body
		bodyId = body.getAttribute('id');
	
		// Для id создаем элемент c нужными параметрами
		newEl = Ext.DomHelper.append(bodyId, {
								id: 'animate-product-img-id'+item.get('id'),
								src: item.get('image'),
								width: srcW,
								height: srcH,
								tag: 'img',
								children: [],
								cls: 'animate-product-img-cls'+item.get('id'),
								html: ''
							}, true);
		
		
		// Задаем дополнительные параметры
		newEl.setOpacity(0.6);
		
		newEl.setX(srcX);
		newEl.setY(srcY);
	
		newEl.setWidth(srcW+30);
		newEl.setHeight(srcH+30);
	   
		return newEl;
   },
   
   /**
    * Используется для анимации добавления товара в корзину.
    * Вернет Dom объект на координаты которого нужно перемещать 
    * лого товара при добавлении этого товара в корзину.
    */
   destAnimateImg: function(){
	   
	   tab = Ext.DomQuery.selectNode('a#list-tab');
	   domTab = Ext.get(tab);
	   return domTab;

   },
   
   /**
    * Добавляет продукт в стор корзины и показывает анимацию добавления 
    * (перемещает изображение товара в список покупок)
    * @param uStore Стор потребительской корзины, в него добавляем товар
    * @param item Instance модели продукта. Из него берется ссылка на изображение
    * @param node dom элемента продукта, содержащего изображение 
    * @param duration Длительность анимации
    */
   addAnimateProduct: function(uStore, item, node, duration){

   	   // Добавление товара в корзину
       uStore.addItem(item.raw, {
			dublicate: 'id'		// Товар не будет добавлен, если в сторе уже есть товар с таким id
		});
		
		// Создаем копию изображения товара и показываем анимацию ее перемещения в корзину
		domImg = this.createAnimateImg(item, node);
		domDestEl = this.destAnimateImg();
		
		// Анимация: перемещение и уменьшение элемента
		domImg.shift({
			x:domDestEl.getX()+domDestEl.getWidth()/2,
			y:domDestEl.getY()+domDestEl.getHeight()/2,
			width:20,
			height:20,
			duration: duration
		});
		
		// Удаление временного DOM-элемента с задержкой(после анимации)
		imgRemove = new Ext.util.DelayedTask(function(domImg){
			domImg.remove();
			// Обновляем индикатор в header
			Vzabote.bc.updateNav();
		}, this, [domImg]).delay(duration+50);
		
		// Добавляем класс по которому на продукте будет отображаться надпись - добавлено
		Ext.get(node).addCls('this-added');                                	
		
   }
   
});
