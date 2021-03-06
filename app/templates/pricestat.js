templates.pricestat = {
    title: {
        html: '<div class="pricestat-title">Полная статистика цен</div>'
    },
    stat: {
        tpl: 
             '<div class="category-sub-name">{subname}</div><div class="info-icon"></div>'+
             '<ul class="list">'+
             '<tpl for="categoryitems">'+
                '<li><span class="name">{name}</span> <span class="price">{[Vzabote.util.price(values.price)]} <b class="rub">a</b><b class="price-change-{pricechange}"></b></span></li>'+
             '</tpl>'+
             '</ul>'
    },
    goback: {
        text: 'На главную',
        cls: 'back-button'
    }
}