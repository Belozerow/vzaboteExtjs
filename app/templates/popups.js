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
    }
}