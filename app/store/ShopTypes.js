Ext.define('Vzabote.store.ShopTypes', {
	extend: 'Ext.data.Store',
	model: 'Vzabote.model.ShopType',
	requires: 'Vzabote.model.ShopType',
	
	data: [
	        {id: 1, type: 'Дешевый', distance: 4, address: 'ул. Героев Танкограда, д.128', price: 1458.6, info: 'Информация о дешевых магазинах'},
	        {id: 2, type: 'Ближайший', distance: 1.2, address: 'ул. Горького, д.48', price: 2158.6, info: 'Это самый ближайший магазин'},
	        {id: 3, type: 'Популярный', distance: 2, address: 'ул. Горького, д.36', price: 1958.6, info: 'Наиболее популярный магазин'},
	        {id: 4, type: 'Эконом-список', distance: 16, address: 'пр-т Победы, д.128', price: 958.6, info: 'Эконом-список. Подборка магазинов с минимальными ценами.'}
	    ]    

});
