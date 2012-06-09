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
        itemTpl: new Ext.XTemplate('<a href="{[this.getUrl(values)]}"><div class="images producttypes-image" style="background: url(<tpl if="image">{image}</tpl><tpl if="!image">resources/imunitet.png</tpl>); background-repeat: no-repeat;"></div>'+
                 '<div class="title">{name}</div>'+
                 '<div class="price">{[Vzabote.util.price(values.minprice)]} - {[Vzabote.util.price(values.maxprice)]}<b class="rub">a</b></div>'+
                 '<div class="measure">/л</div>'+
                 '</a>',{
                     getUrl: function(values){
                         return Vzabote.bc.products.url + '/' + values.id;
                     }
                 }),
        titleTpl: {
            tpl: '<div class="block-title">{title}</div>'
        }
    },
    products: {
         itemTpl:
        	 	 new Ext.XTemplate(
	        	 	 '<div class="images product-image {[this.existInCart(values)]}" id="imgProd" style="background: url({image}); background-repeat: no-repeat;"></div>'+
	                 '<div class="loupe"></div>'+
	                 '<div class="title">{name}{title}</div>'+
	                 '<div class="cart-price">{[Vzabote.util.price(values.minprice)]} - {[Vzabote.util.price(values.maxprice)]}<b class="rub">a</b></div>'+
	                 '<div class="offerscount <tpl if=\"offerscount &lt; 4\">few</tpl>">{offerscount} {[Vzabote.util.offer(values.offerscount)]}</div>',
	                 {
	        	 		 existInCart: function(v){
	        	 			 if (Ext.getStore('UserCart').findRecord('id', v.id) !== null)
	        	 				 return 'this-added';
	        	 			 return '';
	        	 		 }
	                 }
                 )
    },
    cartcontent: {
         itemTpl:
        	 new Ext.XTemplate(
        	 	 '<div class="images product-image {[this.existInCart(values)]}" id="imgProd" style="background: url({image}); background-repeat: no-repeat;"></div>'+
                 '<div class="loupe"></div>'+
                 '<div>{name}</div>'+
                 '<div>{[Vzabote.util.price(values.minprice)]} - {[Vzabote.util.price(values.maxprice)]}<b class="rub">a</b></div>'+
                 '<div class="offerscount <tpl if=\"offerscount &lt; 4\">few</tpl>">{offerscount} {[Vzabote.util.offer(values.offerscount)]}</div>',
                 {
        	 		existInCart: function(v){
       	 			 if (Ext.getStore('UserCart').findRecord('id', v.id) !== null)
       	 				 return 'this-added';
       	 			 return '';
       	 		 	}
                 }),
         titleTpl: {
            tpl: '<div class="block-title">{title}</div>'
         }
    },
    cart: {
        //name,custom,info,image, minprice, maxprice
        itemTpl:
                new Ext.XTemplate('<div class="cart-style cart-style-{[this.getCartId(values)]}">'+
                    '<div class="prodcarts">'+
                        '<a href="{[this.getUrl(values)]}">'+
                        '<tpl if="custom">'+
                            '<div class="cart-custom-image{[this.getCustomCartClass(values)]}"><div class="star"></div></div>'+
                        '</tpl>'+
                        '<tpl if="!custom">'+
                            '<div class="cart-images"></div>'+
                        '</tpl>'+
                        '</a>'+
                        '<div class="info-icon cart-info"></div>'+
                        '<div class="add" id="add-button">Добавить в список</div>'+
                    '</div>'+
                    '<div class="cart-name">{name}</div>'+
                    '<div class="cart-price">{[Vzabote.util.price(values.minprice)]} - {[Vzabote.util.price(values.maxprice)]}<b class="rub">a</b></div>'+
                '</div>',{
                    cartNum: 0,
                    customNum: 0,
                    getCartId: function(values){
                        if(values.custom)
                            return 'custom';
                        return this.cartNum++;
                    },
                    getCustomCartClass: function(values){
                        if(this.customNum%2 === 0){
                            this.customNum++;
                            return '-odd';
                        }
                    },
                    getUrl: function(values){
                         return Vzabote.bc.products.url + '/carts/' + values.id;
                    }
                }),
        titleTpl: {
           tpl: '<div class="block-title">{title}</div>'
        }
    },
    sliderinfo: {
        tpl: '<div class="slider-title">{name}</div>'+
             '<div class="slider-values">Показывать цены: <b>{[Vzabote.util.price(values.minprice)]} - {[Vzabote.util.price(values.maxprice)]}</b> Р / <span>{measure}</span></div>'
    },
    slider: {
        width: 350
        //cls: 'slider'
    },
    brandfilter: {
        text: 'Ещё'
    },
    brands: {
        //потом надо перенести все в css
        tpl: '<div class="brand-item<tpl if=\"selected\"> brand-item-selected</tpl>" style="float:left;"><img src="{image}" style="width:50px;height:50px;"/></div>'
    },
    searchtitle: {
        html: 'Поиск лекарств'
    }
}