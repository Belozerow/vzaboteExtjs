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
        Ext.util.Observable.capture(this.infoPopup,function(e){
            console.log(e)
        });
        this.infoPopup.show();
   },
   showPopup: function(element){
       if(this.popup) 
            this.popup.close();
       var html = '';
       switch(element.index){
            case 0:
                html = templates.popups.productSelect.html;
                break;
            case 1:
                html = templates.popups.medSelect.html;  
                break;
            case 2:
                html = templates.popups.gasSelect.html;
                break;
       }
       this.popup = Ext.create('widget.simplepopup',{
          html: html,
          ownerEl: element.getEl().down('.category-name')
       });
       this.popup.show()
   }
});