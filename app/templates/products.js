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
         itemTpl:'<div class="images product-image" style="background: url({image}); background-repeat: no-repeat;"></div>'+
                 '<div class="loupe"></div>'+
                 '<div class="title">{name}</div>'+
                 '<div>{minprice} - {maxprice}<b class="rub">a</b></div>'+
                 '<div>{offerscount} предложений</div>'
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
                            '<div class="cart-custom-image{[this.getCustomCartClass(values)]}"><div class="star"></div></div>'+
                        '</tpl>'+
                        '<tpl if="!custom">'+
                            '<div class="cart-images"></div>'+
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
             '<div class="slider-values">Показывать цены: <b>{minprice} - {maxprice}</b> Р / <span>{measure}</span></div>'
    },
    slider: {
        width: 350,
        //cls: 'slider'
    },
    brandfilter: {
        text: 'Любые бренды'
    }
}