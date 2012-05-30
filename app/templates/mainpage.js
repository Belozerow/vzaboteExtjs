templates.mainpage = {
    categoryitem: {
        //name, subname, categoryitems {name,price,pricechange}
        tpl: '<a href="#/products"><img src="{image}" style="max-width: 220px; max-height: 1000px;" class="category-image"/></a>'+
             '<div class="category-name">{name}</div>'+
             '<div class="category-sub-name">{subname}</div>'+
             '<a href="#/index" class="info-icon"></a>'+
             '<ul class="list">'+
             '<tpl for="categoryitems">'+
             	'<li><span class="name">{name}</span> <span class="price">{price} <b class="rub">a</b><b class="price-change-{pricechange}"></b></span></li>'+
             '</tpl>'+
             '</ul>'
    },
    title: {
        html: 'Простой и удобный инструмент для ежедневных покупок',
        cls: 'service-title'
    },
    pricestat: {
        text: '<div class="price-stat-button">Полная статистика цен</div>',
        cls: 'price-stat'
    },
    infopanelfirst: {
        html:
        	'<div class="first">'+
        		'<div class="check-image"></div>'+
        		'<div class="sub-title">Выбирайте товары</div>'+
				'<div class="info">В каталоге представлены<br />товары большинства<br />магазинов города</div>'+
        	'</div>'
    },
    infopanelsecond:{
        html:
        	'<div class="second">'+
        		'<div class="list-image"></div>'+
        		'<div class="sub-title">Добавляйте в список</div>'+
        		'<div class="info">Система сама подскажет<br />'+
        		'где выгодней покупать<br />по деньгам и по времени</div>'+
        	'</div>'
    },
    infopanelthird:{
        html:
            '<div class="third">'+
            	'<div class="location-image"></div>'+
                '<div class="sub-title">Покупайте близко и дешего!</div>'+
                '<div class="info">Мы найдем для вас лучшее!</div>'+
            '</div>'  
    }
    
}