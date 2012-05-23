Ext.define('Vzabote.controller.CategorySelect',{
   extend: 'Ext.app.Controller',
   init: function(){
       this.control({
          '#category-panel > container': {
             afterlayout:function(me){
                 //для первой, не совсем понятно как должно быть
                 if(me.index == 0){
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
                 },this)
             }
          },
          '#price-stat-button': {
              click: function(){
                  Vzabote.router.dispatch('/pricestat');
              }
          },
          'pricestat container': {
              afterrender: function(me){
                  me.getTargetEl().on('click',function(e,node){
                     var el = Ext.get(e.getTarget());
                     if(el.hasCls('info-icon')){
                         this.showInfoPopup(el,me.index);
                     }
                 },this)
              }
          },
          'pricestat button': {
              click: function(){
                  Vzabote.router.dispatch('/index');
              }
          }
       });
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
           this.popup.show()    
       } 
       else
            this.popup.close();
       
   }
});