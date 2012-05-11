templates.mainpage = {
    categoryitem: {
        //name, subname, categoryitems {name,price,pricechange}
        tpl: '<img src="{image}" style="max-width: 250px; max-height: 1000px;" class="category-image"/>'+
                   '<div class="category-name">{name}</div>'+
                   '<div class="category-sub-name">{subname}</div><div class="info-icon"></div>'+
                   '<tpl for="categoryitems">'+
                        '<div>{name}</div><div>{price}</div><div class="price-change-{pricechange}"></div>'+
                   '</tpl>'
    },
    pricestat: {
        text: '<div class="price-stat-button">Полная статистика цен</div>',
        cls: 'price-stat'
    },
    infopanelfirst: {
        html: '<div class="check-image"></div>'+
                        '<div class="sub-title">Выбирайте товары</div>'+
                        '<div class="info">В каталоге представлены товары большинства магазинов города</div>'
    },
    infopanelsecond: {
        html: '<div class="list-image"></div>'+
                        '<div class="sub-title">Добавляйте в список</div>'+
                        '<div class="info">Система сама подскажет где выгодней покупать по деньгам и по времени</div>'
    },
    infopanelthird: {
        html: '<div class="location-image"></div>'+
                        '<div class="sub-title">Покупайте близко и дешего!</div>'+
                        '<div class="info">Мы найдем для вас лучшее!</div>'
    }
}