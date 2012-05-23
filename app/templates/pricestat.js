templates.pricestat = {
    title: {
        html: '<div class="pricestat-title">Полная статистика цен</div>'
    },
    stat: {
        tpl: 
             '<div class="category-sub-name">{subname}</div><a href="#" class="info-icon">i</a>'+
             '<ul class="list">'+
             '<tpl for="categoryitems">'+
                '<li><span class="name">{name}</span> <span class="price">{price} <b class="rub">a</b><b class="price-change-{pricechange}"></b></span></li>'+
             '</tpl>'+
             '</ul>'
    },
    goback: {
        text: 'На главную',
        cls: 'back-button'
    }
}