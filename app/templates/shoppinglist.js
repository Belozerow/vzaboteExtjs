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
        itemTpl: new Ext.XTemplate('<div style="background: url({image});height: 150px; width: 150px; background-size: contain; background-repeat: no-repeat;"></div>'+
                '<div class="loupe">Лупа</div>' +
                 '<div>{[Vzabote.util.price(values.minprice)]} - {[Vzabote.util.price(values.maxprice)]}<br>{offerscount} {[Vzabote.util.offer(values.offerscount)]}{[this.method(values)]}</div>'+
                 '</a>'+
                 '<div class="dec-button">minus</div><div class="item-count">{amount} {amount_measure}</div><div class="inc-button">plus</div>',{
                     method: function(values){
                         //console.log('%o - lkfgjfd', values);
                     }
                 }

        ),
        titleTpl: {
            tpl: '<div class="block-title">{title}</div>'
        }
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
                 '<div class="cart-price">{[Vzabote.util.price(values.minprice)]} - {[Vzabote.util.price(values.maxprice)]}</div>'
    },
    inTotal: {
        tpl: '<div>Итого к заказу</div>' +
                 '<div>{count} {[Vzabote.util.product(values.count)]} на сумму</div>'+
                 '<div>{[Vzabote.util.price(values.minprice)]} - {[Vzabote.util.price(values.maxprice)]} рублей</div>'
                 
    },
    saveLoadButton: {
        text: 'Сохранить, загрузить или очистить список...'
                 
    }
}
