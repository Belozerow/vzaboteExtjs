templates.products = {
    backbutton: {
        text: 'На главную'
    },
    backbuttonproducts: {
        text: 'Продукты'
    },
    forwardbutton: {
        text: 'В список покупок'
    },
    dataview: {
        itemTpl: '<a href="#/products/{id}"><div class="images producttypes-image" style="background: url({image}); background-repeat: no-repeat;"></div>'+
                 '<div class="title">{name}</div>'+
                 '</a>'
    },
    products: {
         itemTpl:
        	 	 new Ext.XTemplate(
	        	 	 '<div class="images product-image {[this.existInCart(values)]}" id="imgProd" style="background: url({image}); background-repeat: no-repeat;"></div>'+
	                 '<div class="loupe">Лупа</div>'+
	                 '<div>{name}</div>'+
	                 '<div>{minprice} - {maxprice}<b class="rub">a</b></div>'+
	                 '<div>{offerscount} предложений</div>',
	                 {
	        	 		 existInCart: function(v){
	        	 			 
	        	 			 if (Ext.getStore('UserCart').findRecord('id', v.id) != null)
	        	 				 return 'this-added';
	        	 			 
	        	 			 return '';
	        	 		 }
	                 }
                 )
    },
    cartcontent: {
         itemTpl:'<div class="images product-image" style="background: url({image}); background-repeat: no-repeat;"></div>'+
                 '<div class="loupe">Лупа</div>'+
                 '<div>{name}</div>'+
                 '<div>{minprice} - {maxprice}<b class="rub">a</b></div>'+
                 '<div>{offerscount} предложений</div>'
    },
    title: {
        html: '<div class="block-title">Продукты</div>'
    },
    cartsTitle: {
        html: '<div class="block-title">Продуктовые корзины</div>'
    },
    cart: {
        //name,custom,info,image, minprice, maxprice
        itemTpl:
                new Ext.XTemplate('<div class="cart-style cart-style-{[this.getCartId(values)]}">'+
                    '<div class="prodcarts">'+
                        '<a href="#/products/carts/{id}">'+
                        '<tpl if="custom">'+
                            '<div class="cart-custom-image{[this.getCustomCartClass(values)]}"></div>'+
                        '</tpl>'+
                        '<tpl if="!custom">'+
                            '<div style="background: url({image}); height: 150px; width: 162px;"></div>'+
                        '</tpl>'+
                        '</a>'+
                        '<div class="info-icon cart-info"></div>'+
                        '<div class="add">Добавить в список</div>'+
                    '</div>'+
                    '<div class="cart-name">{name}</div>'+
                    '<div class="cart-price">{minprice} - {maxprice}<b class="rub">a</b></div>'+
                '</div>',{
                    cartNum: 0,
                    customNum: 0,
                    getCartId: function(values){
                        if(values.custom)
                            return 'custom';
                        return this.cartNum++;
                    },
                    getCustomCartClass: function(values){
                        if(this.customNum%2 == 0){
                            this.customNum++;
                            return '-odd'
                        }
                    }
                })
    },
    sliderinfo: {
        tpl: '<div class="slider-title">{name}</div>'+
             '<div class="slider-values">Показывать цены: <b>{minprice} - {maxprice}</b> Р / {measure}</div>'
    },
    slider: {
        width: 300
    },
    brandfilter: {
        text: 'Любые бренды'
    }
}