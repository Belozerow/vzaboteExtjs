templates.shopchoice = {

	header: {
		html: '<h1 class="title">Выбор магазина</h1><div class="button-choice-way-cls" id="button-choice-way-id"></div>'
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