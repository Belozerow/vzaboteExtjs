Ext.define('Vzabote.controller.Product',{
   extend: 'Ext.app.Controller',
   productsY: -100,
   cartsY: -300,
   productsIsShown: false,
   cartIsShown: false,
   animDuration: 700,
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
   saveStateAfterLayout: function(){
        var activeItem = this.productsView.getTargetEl();
        if(this.productsIsShown){
            activeItem.setY(this.productsY);
        }
        if(this.cartIsShown){
            activeItem.setY(this.cartsY);
            var inner = Ext.get(this.productsView.getInner());
            inner.setHeight(this.newHeight);
        }
   },
   index: function(query){
       var cardPanel = this.getCardPanel();
       if(this.productsIsShown){
           this.animateProductsHide(function(){
                  this.productsIsShown = false;
                  this.productsView.hideProducts(function(){
                      this.getProductTypesSlider().enableDataView(query.id);
                      this.productsView.cngButton('main');    
                  },this);
           });           
       }
       if(this.cartIsShown){
           this.animateCartHide(function(){
                  this.cartIsShown = false;
                  this.productsView.hideCartContent();
                  this.productsView.cngButton('main');
                  this.productsView.enableCartsDataView();    
           });
       }
       if(cardPanel.layout.getActiveItem().xtype!='products'){
           
            this.getController('Viewport').closeAllWindows();
            
            var store = this.store = Ext.getStore('ProductTypes');
            this.productsStore = Ext.getStore('Products');
            this.cartsStore = Ext.getStore('Carts');
            
            
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
                    animDuration: this.animDuration,
                    itemsHeight: this.getCardPanel().getHeight()/2,
                    listeners: {
                        productsData: {
                            itemclick: function(me,item,node,index,e){
                                var el = Ext.get(e.getTarget());
                                var duration = 1650;
                                var id = item.get('id');
                                
                                if(el.hasCls('loupe')){
                                     this.showProductPopup(node,item);
                                }
                                
                                var uStore = Ext.getStore('UserCart');
                                
                                // Если такой элемент отсутствует в сторе, то можно его добавить
                                if (!uStore.existProduct(item)){
                                    
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
                						y:domDestEl.getY(),
                						width:20,
                						height:20,
                						duration: duration
                					});
                					
                					// Удаление временного DOM-элемента с задержкой(после анимации)
                					imgRemove = new Ext.util.DelayedTask(function(domImg){
                						domImg.remove();
                    					// Обновляем индикатор в header
                    					this.getViewportTopPanel().update({});
                					}, this, [domImg]).delay(duration+50);
                					
                					// Добавляем класс по которому на продукте будет отображаться надпись - добавлено
                					Ext.get(node).addCls('this-added');                                	
                					
                                }

                                
                            },
                            scope: this
                        },
                        cartcontentitemclick: function(me,item,node,index,e){ 
                                var el = Ext.get(e.getTarget());
                                if(el.hasCls('loupe')){
                                     this.showProductPopup(node,item);
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
                            click: function(){
                                this.showBrandsPopup();
                            },
                            scope: this
                        },
                        scope: this
                    }
                });
                this.productsView.on('afterlayout',this.saveStateAfterLayout,this);
                this.productsView.on('deactivate',function(){
                    this.stopAnimation();
                    this.productsIsShown =  false;
                    this.cartIsShown = false;
                    this.productsView.destroy();                    
                },this);
            }
            cardPanel.layout.setActiveItem(this.productsView);
       }
   },
   product: function(query){
       
       if(!this.productsView)
            this.index();
       
       Vzabote.util.onEventOrNow(this.store,'load',this.store.isLoading,true,function(){
           this.productsView.updateSliderInfo({name: this.store.getById(query.id).get('name')});
       },this,{single: true});
       this.getProductTypesSlider().disableDataView(query.id);
       this.productsView.showProducts(function(){
           this.animateProductsShow();       
           this.productsView.cngButton('products');
           this.productsIsShown = true;
       },this);       
   },
   
   carts: function(query){
        if(!this.productsView)
            this.index();
        var cart = Ext.getStore('Carts').getById(parseInt(query.id));
        this.productsView.disableCartsDataView(cart);
        this.productsView.showCartContent(cart);
        this.animateCartShow(query.id);
   },
   animateCartShow: function(cart){
        var carts = this.getCartsDataView();
        Vzabote.util.onEventOrNow(carts,'viewready','viewReady',undefined,function(){
            this.cartsY = - carts.getEl().getY() - carts.getEl().down('.products-carts-dataview').getHeight()/3;
            var activeItem = this.productsView.getTargetEl(),
              newY = this.cartsY;
              
            this.prevY = activeItem.getY();
            activeItem.animate({
                  to: {y: newY},
                  duration: this.animDuration,
                  listeners: {
                      afteranimate: function(){
                            this.cartIsShown = true;
                      },
                      scope: this
                  }
            });
            var inner = Ext.get(this.productsView.getInner()),
                newHeight = inner.getHeight()-newY;
            inner.animate({
                  to: {height: newHeight},
                  duration: this.animDuration,
                  listeners: {
                      afteranimate: function(){
                          this.newHeight = newHeight;
                      },
                      scope: this
                  }
            });
        },this,{single: true});
   },
   animateCartHide: function(callback){
      var activeItem = this.productsView.getTargetEl();
      
      activeItem.animate({
          to: {y: this.prevY},
          duration: this.animDuration,
          listeners: {
              afteranimate: callback||Ext.emptyFn,
              scope: this
          }
      });
      var inner = Ext.get(this.productsView.getInner()),
          newHeight = this.productsView.getTargetEl().getHeight();
      
      inner.animate({
          to: {height: newHeight},
          duration: this.animDuration,
          listeners: {
              afteranimate: function(){
                  this.newHeight = newHeight;
              },
              scope: this
          }
      });
   },
   animateProductsShow: function(){
      this.productsY = -this.getProductTypesSlider().getDataViewHeight()/2;
      var activeItem = this.productsView.getTargetEl(),
          newY = this.productsY;
      this.prevY = activeItem.getY();
      activeItem.animate({
          to: {y: newY},
          duration: this.animDuration,
          listeners: {
              afteranimate: function(){
                 this.productsIsShown = true;
                 this.showProductHintPopup();   
              },
              scope: this
          }
      });
   },
   animateProductsHide: function(callback){
      var activeItem = this.productsView.getTargetEl();
      activeItem.animate({
          to: {y: this.prevY},
          duration: this.animDuration,
          listeners: {
              afteranimate: callback||Ext.emptyFn,
              scope: this
          }
      });
   },
   showCategoryHintPopup: function(){
       if(!this.productsIsShown){
           this.mon(this.getProductTypesSlider().dataView,'show',function(){
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
               id: 'products-choose-info-popup',
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
           id: 'products-choose-info-popup',
           cls: 'info-popup',
           data: item.data,
           alignPosition: 'bl-t'
       },templates.popups.cartInfoPopup));
       this.cartInfoPopup.show();  
   },
   showProductPopup: function(element, item){
       if(this.productPopup)
            this.productPopup.close();       
       this.productPopup = Ext.create('widget.simplepopup',Ext.apply({
           ownerEl: element,
           id: 'products-choose-info-popup',
           cls: 'info-popup',
           layout: {
               type: 'vbox',
               align: 'stretch' 
           },
           alignPosition: 'c-c',
           items: [Ext.apply({
               data: item.data
           },templates.popups.productPopup),Ext.apply({
               xtype: 'button'
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
       var inner = Ext.get(this.productsView.getInner());
       if(inner.getActiveAnimation())
           inner.getActiveAnimation().end();
       
       var activeItem = this.productsView.getTargetEl();
       if(activeItem.getActiveAnimation())
            activeItem.getActiveAnimation().end();
       
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
								html: '',
							}, true);
		
		
		// Задаем дополнительные параметры
		newEl.setOpacity(0.6)
		
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
	   
   }
   
});
