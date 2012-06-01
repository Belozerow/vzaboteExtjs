Ext.define('Vzabote.store.UserCart', {
	extend: 'Ext.data.Store',
	model: 'Vzabote.model.Product',
	requires: 'Vzabote.model.Product',
	
	/**
	 * Добавляет элемент в сторПеред добавлением данных проверит их в сообветствии с критериями, 
	 * которые указаны в params. 
	 * @param data Экземпляр модели, который будет добавлен в стор
	 * @param params Критерии проверки данных в data перед добавлением
	 * @return [Model|null] Вернет добавленный Инстанс, либо null если ничего не добавлено. 
	 */
	addItem: function(data, params){
		var result = true;
		if (Ext.isObject(params)){
			if (params.dublicate && result)
				if (this.findRecord(params.dublicate, data[params.dublicate])) result = false;	
		}
		if (result)
			return this.add(data);
		else
			return null;
	}

});