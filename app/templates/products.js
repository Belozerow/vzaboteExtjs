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
                 '<div class="loupe">Лупа</div>'+
                 '<div>{name}</div>'
    },
    cartcontent: {
         itemTpl:'<div style="background: url({image});height: 150px; width: 150px; background-size: contain; background-repeat: no-repeat;"></div>'+
                 '<div>{name}</div>'
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
        		'<div class="prodcarts">'+
        			'<a href="#/products/carts/{id}"><img src="{image}" style="height: 150px; width: 162px;"/></a>'+
                	'<div class="info-icon cart-info"></div>'+
                	'<div class="add">Добавить в список</div>'+
        		'</div>'+
                '<div class="cart-name">{name}</div>'+
                '<div class="cart-price">{minprice} - {maxprice}<b class="rub">a</b></div>'
    }
}