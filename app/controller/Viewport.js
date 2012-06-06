Ext.define('Vzabote.controller.Viewport',{
   extend: 'Ext.app.Controller',
   refs: [{
       ref: 'cardPanel',
       selector: '#cardpanel'
   },{
       ref: 'mainPage',
       selector: 'mainpage'
   }],
   windowsExceptions: ['loginpopup'],
   init: function(){
       this.control({
            'viewport': {
               afterrender: function(me){
                    me.getTargetEl().on('mousedown',function(e,node){
                        if(Ext.WindowMgr.front){
                            var windowEl = Ext.WindowMgr.front.getEl();
                            if(!windowEl.contains(node) && Ext.WindowMgr.front.closeOnViewportClick){
                                    Ext.WindowMgr.front.close();
                            }    
                        }                        
                    },this);
               }
            },
            '#viewport-addshop-button': {
                click: function(){
                    this.showAddShopModal();
                }
            }
       });
   },
   closeAllWindows: function(){
       while(Ext.WindowMgr.front){
            Ext.WindowMgr.front.close();
       } 
   },
   showAddShopModal: function(){
       this.addShopModal = Ext.create('Vzabote.view.AddShop',{
       });
       
       this.addShopModal.show();
   }
});
