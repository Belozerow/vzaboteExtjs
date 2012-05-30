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
        itemTpl: '<a href="#/products/{id}"><div style="background: url({image});height: 150px; width: 150px; background-size: contain; background-repeat: no-repeat;"></div>'+
                 '<div>{name}</div>'+
                 '</a>'
    },
    products: {
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
        itemTpl: '<img src="{image}" style="height: 100px; width: 100px;"/>'+
                 '<div class="cart-info">i</div>'+
                 '<a href="#/products">Добавить в список</a>'+
                 '<div class="cart-name">{name}</div>'+
                 '<div class="cart-price">{minprice} - {maxprice}</div>'
    }
}