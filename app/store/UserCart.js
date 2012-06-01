Ext.define('Vzabote.store.UserCart', {
	extend: 'Ext.data.Store',
	model: 'Vzabote.model.Product',
	requires: 'Vzabote.model.Product',
	
	addItem: function(data){
		return this.add(data);
	}

});