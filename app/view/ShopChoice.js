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
        	id: 'header-panel',
        	listeners: {
        		afterrender: function(me, opt){
        			Ext.create('Ext.Button', {
        				text: 'Купить по пути домой?',
        				renderTo: 'button-choice-way-id',
        				handler: function(){
        					alert('qwewqe');
        				}
        			});
        		}
        	}
        }, templates.shopchoice.header));
        
        this.add(this.elTitle);
        
        /*
        // слайдер в header
        this.slider = Ext.create('Vzabote.view.JntSlider',Ext.apply({
        	minValue: 1,
            maxValue: 10,
            increment: 1,
            useTips: false,
            values: [1, 10]
        },templates.products.slider));
        
        this.add(this.slider);*/

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
        
        
        // Въюха body
        this.shopChoiceMain = Ext.create('Ext.container.Container', {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            cls: 'shop-choice-main',
            id: 'shop-choice-main-id',
            items: [
                    this.shopType,
                    this.shopsList
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