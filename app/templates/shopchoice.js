templates.shopchoice = {

	header: {
		html: '<h1 class="title">Выбор магазина</h1>'
	},

    sliderinfo: {
        tpl: '<div class="slider-title">{name}</div>'+
             '<div class="slider-values">Показывать цены: <b>{minprice} - {maxprice}</b> Р / <span>{measure}</span></div>'
    },
	
	slider: {
        width: 350
    },
	
    categories: {
    	tpl: '<div class="image">{image}</div>' +
    			 '<div class="name">{name}</div>'
    },

	shoptype: {
		itemTpl: 
			'<div class="collection">' + 
				'<div class="title">{name}</div>'+
				'<div class="address">{address}</div>' +
				'<div class="price">{price} P</div>' +
				'<div class="distance">{distance} км</div>' + 
				'<div class="info">{info}</div>' +
			'</div>'
	},
		
	dataviewList: {
		itemTpl: '<div style="background: url({image});height: 150px; width: 150px; background-size: contain; background-repeat: no-repeat;"></div>'+
                '<div class="loupe">Лупа</div>' +
                '<div class="name">{name}</div>'
	},
	

		
};