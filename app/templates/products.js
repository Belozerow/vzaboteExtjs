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
        itemTpl: '<a href="#/products/{id}"><div class="images" style="background: url({image}); background-repeat: no-repeat;"></div>'+
                 '<div class="title">{name}</div>'+
                 '</a>'
    },
    products: {
         itemTpl:'<div style="background: url({image});height: 150px; width: 150px; background-size: contain; background-repeat: no-repeat;"></div>'+
                 '<div>{name}</div>'
    },
    cartcontent: {
         itemTpl:'<div style="background: url({image});height: 150px; width: 150px; background-size: contain; background-repeat: no-repeat;"></div>'+
                 '<div>{name}</div>'
    },
    title: {
        html: 'Продукты'
    },
    cartsTitle: {
        html: 'Продуктовые корзины'
    },
    cart: {
        //name,custom,info,image, minprice, maxprice
        itemTpl: '<a href="#/products/carts/{id}"><img src="{image}" style="height: 100px; width: 100px;"/></a>'+
                 '<div class="cart-info">i</div>'+
                 '<div>Добавить в список</div>'+
                 '<div class="cart-name">{name}</div>'+
                 '<div class="cart-price">{minprice} - {maxprice}</div>'
    }
}