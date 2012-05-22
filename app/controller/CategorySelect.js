Ext.define('Vzabote.controller.CategorySelect',{
   extend: 'Ext.app.Controller',
   requires: [
        'Vzabote.view.SimplePopup'
   ],
   init: function(){
       this.control({
          '#category-panel > container': {
                 afterrender:function(me){
                     me.getEl().on('click',function(){
                         if(typeof me.index != 'undefined'){
                             this.showPopup(me);
                         }
                     },this)
                 } 
          } 
       });
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
                html = templates.popups.gasSelect.html
                break;
       }
       this.popup = Ext.create('widget.simplepopup',{
          html: html,
          ownerEl: element.getEl().down('.category-name')
       });
       this.popup.show()
   }
});