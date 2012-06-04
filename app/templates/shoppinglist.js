templates.shoppingList = {
    backbutton: {
        text: 'Выбор товара'
    },
    backbuttonproducts: {
        text: '.....'
    },
    forwardbutton: {
        text: 'Выбор магазина'
    },
    dataview: {
        itemTpl: new Ext.XTemplate('<a href="#/products/{id}"><div style="background: url({image});height: 150px; width: 150px; background-size: contain; background-repeat: no-repeat;"></div>'+
                 '<div>{minprice} — {maxprice}<br>{offerscount} предложений{[this.method(values)]}</div>'+
                 //'<div>{name}</div>' +
                 '</a>'+
                 '<div class="dec-button">minus</div><div class="item-count">{amount} {amount_measure}</div><div class="inc-button">plus</div>',{
                     method: function(values){
                         console.log('%o - lkfgjfd', values);
                     }
                 }

        )
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
    },
    inTotal: {
        tpl: '<div>Итого к заказу</div>' +
                 '<div>{count} товаров на сумму</div>' +    
                 '<div>{minprice}-{maxprice} рублей</div>'
                 
    },
    saveLoadButton: {
        text: '<button>Сохранить, загрузить или очистить список...</button>'
                 
    }
}
