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
            } 
       });
   },
   setActiveTab: function(tab){
       var cardPanel = this.getCardPanel();
       console.log(this.getMainPage())
       switch(tab){
            case 'pricestat':
                if(!this.pricestat){
                    this.pricestat = Ext.create('Vzabote.view.PriceStat',{
                    });
                }            
                cardPanel.layout.setActiveItem(this.pricestat)
                break;
            case 'mainpage':
                cardPanel.layout.setActiveItem(0);
            
       }
   }   
});
