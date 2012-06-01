templates.popups = {
    productSelect: {
        html: 'Начните выбор товаров с одного из разделов. Например, с продуктов'
    },
    medSelect: {
        html: 'Начните выбор товаров с одного из разделов. Например, с лекарств'
    },
    gasSelect: {
        html: 'Начните выбор товаров с одного из разделов. Например, с топлива'
    },
    categoryInfo: {
        tpl:'<div class="product-info-title">Состав продуктовой корзины</div>'+ 
            '<tpl for="items">'+
                '<div class="product-info">'+
                    '<div class="product-name">{data.name},</div>'+
                    '<div class="product-title-extra">{data.titleextra}</div>'+
                '</div>'+
            '</tpl>'
    },
    productsChooseInfo: {
        html: 'Выберите категорию продуктов <br/>'+
              '&#8592; &nbsp; &#8594; <br/>'+
              'Перетаскивайте список категорий вбок, как будто прохаживаетесь в магазие вдоль реальных отделов'
    },
    productsProductInfo: {
        html: 'Нажмите на товар &#8212; он добавится в список покупок. <br/>'+
              '<b>10 &#8212 25 р</b> <br/>'+
              'Диапозон цены показывает разброс стоимости по всем магазинам города.<br/>'+
              'Просто добавьте товары в список, мы подберем где все купить <b>ближе и дешевле</b>'
    },
    cartInfoPopup: {
        tpl: '{info}'
    },
    productPopup: {
        tpl: '<img src="{image}"/>'+
             '<div>{name}</div>'+
             '<div>{minprice} - {maxprice}</div>'+
             '<div>{offerscount}</div>'
    },
    productPopupButton: {
        text: 'Добавить в список'
    },
    brands: {
        itemTpl: '<img src="{image}"/>'+
                 '<div>{name}</div>'
    }
}