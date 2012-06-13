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

        this.elTitle = Ext.create('Ext.container.Container', Ext.apply({
        	id: 'shop-choice-header',
        	listeners: {
        		afterrender: function(me, opt){
        			Ext.create('Ext.Button', {
        				text: 'Купить по пути домой?',
        				id: 'button-id-id',
        				renderTo: 'button-choice-way-id'/*,
        				handler: function(){
        					alert('Покупаем по пути домой');
        				}*/
        			});
        		}
        	}
        }, templates.shopchoice.header));
        
        this.add(this.elTitle);
        
        
        // слайдер под header'ом
        this.slider = Ext.create('Vzabote.view.JntSlider',Ext.apply({
        	minValue: 1,
            maxValue: 10,
            increment: 1,
            useTips: false,
            values: [3],
        },templates.shopchoice.slider));
        
        //this.add(this.slider);

        // Блок со слайдером. Также включает категории магазинов
        this.sliderBlock = Ext.create('Ext.container.Container', {
        	layout: {
        		type: 'hbox',
        		align: 'stretch'
        	},
        	id: 'slider-block',
        	items: [
        	    this.slider
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

    }
});