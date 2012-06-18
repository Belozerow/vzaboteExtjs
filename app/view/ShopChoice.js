Ext.define('Vzabote.view.ShopChoice',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.shopChoice',
    id: 'shopChoice',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function(){
        this.callParent();

        // Заголовок
        this.elTitle = Ext.create('Ext.container.Container', Ext.apply({
        	id: 'shop-choice-header'
        }, templates.shopchoice.header));
        
        // Кнопка "Купить по пути домой?"
        this.buttonShopWay = Ext.create('Ext.button.Button', {
        	id: 'button-shop-way',
        	text: 'Купить по пути домой?'
        });
                
        // Header страницы
        this.headArea = Ext.create('Ext.container.Container', {
        	layout: {
        		type: 'hbox',
        		align: 'stretch'
        	},
        	id: 'shop-chioce-head-id',
        	cls: 'shop-chioce-head-cls',
        	items: [
        	   this.elTitle,
        	   this.buttonShopWay
        	]
        });
        
        this.add(this.headArea);
        
        // слайдер под header'ом
        this.slider = Ext.create('Vzabote.view.JntSlider',Ext.apply({
        	minValue: 1,
            maxValue: 10,
            increment: 1,
            useTips: false,
            values: [3],
            flex: 2
        },templates.shopchoice.slider));
        
        //this.shopCats = {}
        this.cat1 = Ext.create('Ext.form.field.Checkbox', Ext.apply(this.shopCat({
        	id: 'cat-id-1',
        	cls: 'cat-cls-1',
        	flex: 1
    	}, Ext.getStore('ShopCategories'), 1), templates.shopchoice.categories));
        
        this.cat2 = Ext.create('Ext.form.field.Checkbox', Ext.apply(this.shopCat({
        	id: 'cat-id-2',
        	cls: 'cat-cls-2',
        	flex: 1
    	}, Ext.getStore('ShopCategories'), 2), templates.shopchoice.categories));
        
        this.cat3 = Ext.create('Ext.form.field.Checkbox', Ext.apply(this.shopCat({
        	id: 'cat-id-3',
        	cls: 'cat-cls-3',
        	flex: 1
    	}, Ext.getStore('ShopCategories'), 3), templates.shopchoice.categories));
        
        this.etc = Ext.create('Ext.button.Button', {
        	id: 'button-etc-categories',
        	text: 'Еще...',
        	flex: 1
        });
        
/*        // Категории для фильтрации магазинов
        this.shopCategories = Ext.create('Ext.view.View', Ext.apply({
        	store: Ext.getStore('ShopCategories'),
        	cls: 'shop-categories',
        	itemCls: 'shop-cat-item',
        	listeners: {
        		afterrender: function(me, opts){
        			console.log("%o %o", me, opts);
        		}
        	},
        	flex: 3
        }, templates.shopchoice.categories));*/

        // Блок со слайдером. Также включает категории магазинов
        this.sliderBlock = Ext.create('Ext.container.Container', {
        	layout: {
        		type: 'hbox',
        		align: 'stretch'
        	},
        	id: 'slider-block',
        	items: [
        	    this.slider,
//        	    this.shopCategories

				this.cat1,
				this.cat2,
				this.cat3,
				this.etc
        	    
        	]
        });
        
        this.add(this.sliderBlock);
        
        // типы магазинов
        this.shopType = Ext.create('Ext.view.View', Ext.apply({
        	store: Ext.getStore('ShopTypes'),
        	cls: 'shops-type',
        	itemCls: 'shops-type-item',
        }, templates.shopchoice.shoptype));
        
        // слайдер с продуктами
        this.shopsList = Ext.create('Vzabote.view.ScrollableDataView',Ext.apply({
            store: Ext.getStore('Products'),//this.store,
            cardParent: this,
            id: 'shopsList'
        },templates.shopchoice.dataviewList));
        
        // Кнопка "Забронировать товары"
        this.reserveProducts = Ext.create('Ext.button.Button', {
        	id: 'button-reserve-products',
        	text: 'Забронировать товары',
        	flex: 1
        });
        
        // Кнопка "Отправить, распечатать список..."
        this.sendPrintList = Ext.create('Ext.button.Button', {
        	id: 'send-print-list',
        	text: 'Отправить, распечатать список...',
        	flex: 1
        });
        
        
        // Блок с кнопками под списком товаров
        this.buttons = Ext.create('Ext.container.Container', {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
        	id: 'buttons-box-id',
        	cls: 'buttons-box-cls',
        	items: [
				this.reserveProducts,
				{
					xtype: 'tbspacer',
					flex: 3
				},
				this.sendPrintList
        	]
        });
        
        // Въюха body
        this.shopChoiceMain = Ext.create('Ext.container.Container', {
            cls: 'shop-choice-main',
            id: 'shop-choice-main-id',
            items: [
                    this.shopType,
                    this.shopsList,
                    this.buttons
            ]
        });

        this.add(this.shopChoiceMain);

        this.navPanel = Ext.create('Vzabote.view.NavigationPanel',{
            step: 'shops',
            dock: 'bottom'
        });
        this.addDocked(this.navPanel);
        this.on('activate',function(){
            this.navPanel.updateButtons();
        },this);

    },
    
    /**
     * Формирует обект для создания элемента Checkbox 
     * на основе присутствующих в сторе элементов.
     * @param {Object}  config Исходный config-объект для элемента
     * @param {Store}   store  Хранилище. На основе элементов из него строятся checkbox'ы
     * @param {Integer} index  Порядковый номер элемента в сторе, на основе которого нужно создать checkbox
     * @return {Object} Готовый config-объект, либо null.
     */
    shopCat: function(config, store, index){
    	config = config || {};
    	
    	// Если в сторе количество элементов больше либо равное index, 
    	// запрашиваем store[index] и далее создаем элемент
    	if (store.getCount() >= index){
    		item = store.getAt(index);
    		config['renderData'] = {
    				//id: item.get('id'),
    				name: item.get('name'),
    				image: item.get('image')
    		};
    		config['renderSelectors'] = {
    				nameEl: 'div.name',
    				imageEl: 'div.image'
    		};
    		config['checked'] = item.get('checked')==1?true:false;
    		config['boxLabel'] = '<img class="cb-image" style="width:30px;height:35px;" src="'+ item.get('image') +'" />' + ' ' + item.get('name');
    		
    		return config;
    	}
    	
    	return null;
    }
});