Ext.define('Vzabote.controller.CategorySelect',{
   extend: 'Ext.app.Controller',
   refs: [{
       ref: 'cardPanel',
       selector: '#cardpanel'
   }],
   init: function(){
       this.control({
          '#mainpage-categoriespanel > container': {
             afterlayout:function(me){
                 if(me.index === 0){
                     this.showPopup(me);
                 }
             },
             afterrender: function(me){
                 me.getTargetEl().on('click',function(e,node){
                     var el = Ext.get(e.getTarget());
                     if(el.hasCls('category-image')){
                         console.log('category-select');
                     } 
                     if(el.hasCls('info-icon')){
                         this.showInfoPopup(el,me.index);
                     }
                 },this);
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
           var tpl = '';
           switch(element.index){
                case 0:
                    tpl = templates.popups.productSelect;
                    break;
                case 1:
                    tpl = templates.popups.medSelect;  
                    break;
                case 2:
                    tpl = templates.popups.gasSelect;
                    break;
           }
           this.popup = Ext.create('widget.simplepopup',Ext.apply({
              id: 'hint-popup',
              ownerEl: element.getEl().down('.category-name')
           },tpl));
           this.popup.show();
       } 
       else
            this.popup.close();
       
   }
});