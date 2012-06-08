Ext.define('Vzabote.controller.CategorySelect',{
   extend: 'Ext.app.Controller',
   refs: [{
       ref: 'cardPanel',
       selector: '#cardpanel'
   },
   {
       ref: 'categoriesPanel',
       selector: '#mainpage-categoriespanel'
   }],
   init: function(){
       this.control({
          '#mainpage-categoriespanel > container': {
              afterrender: function(me){
                 me.getTargetEl().on('click',function(e,node){
                     var el = Ext.get(e.getTarget());
                     if(el.hasCls('info-icon')){
                         this.showInfoPopup(el,me.index);
                     }
                 },this);
              }
          },
          '#mainpage-categoriespanel': {
              afterrender: function(me){
                  this.mon(me,'afterlayout',function(){
                      this.showPopup(me);
                  },this,{single: true});
              }
          },
          'pricestat container': {
              afterrender: function(me){
                  me.getTargetEl().on('click',function(e,node){
                     var el = Ext.get(e.getTarget());
                     if(el.hasCls('info-icon')){
                         this.showInfoPopup(el,me.index);
                     }
                 },this);
              }
          }
       });
   },
   index: function(query){
       var cardPanel = this.getCardPanel();
       if(cardPanel.layout.getActiveItem().xtype!='mainpage'){
           this.getController('Viewport').closeAllWindows();
           cardPanel.layout.setActiveItem(0);
       }
   },
   pricestat: function(){
       var cardPanel = this.getCardPanel();
       if(cardPanel.layout.getActiveItem().xtype!='pricestat'){
            this.getController('Viewport').closeAllWindows();
            if(!this.pricestatView){
                this.pricestatView = Ext.create('Vzabote.view.PriceStat',{
                });
            }
            cardPanel.layout.setActiveItem(this.pricestatView);
       }
   },
   showInfoPopup: function(element,index){
        if(this.infoPopup)
            this.infoPopup.close();
        this.infoPopup = Ext.create('widget.simplepopup',Ext.apply({
           ownerEl: element,
           id: 'info-popup',
           alignPosition: 'l-tr?',
           cls: 'info-popup',
           data: Ext.getStore('CategoryInfo').data
        },templates.popups.categoryInfo));
        this.infoPopup.show();
   },
   showPopup: function(element){
       if(!this.popup){
          
           this.popup = Ext.create('widget.simplepopup',Ext.apply({
              id: 'hint-popup',
              ownerEl: element.getEl().down('.category-name')
           },templates.popups.productSelect));
           this.popup.show();
       } 
       else
            this.popup.close();
       
   }
});