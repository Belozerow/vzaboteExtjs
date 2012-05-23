Ext.define('Vzabote.controller.Viewport',{
   extend: 'Ext.app.Controller',
   refs: [{
       ref: 'cardpanel',
       selector: '#cardpanel'
   }], 
   windowsExceptions: ['loginpopup'],
   init: function(){
       this.control({
           //tabs active
            '#header': {
              afterrender: function(me){
                me.getEl().on('click',function(e,node){
                   this.setActiveTab(node.id); 
                },this);
              }                  
            },
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
   setActiveTab: function(id){
      var cardPanel = this.getCardpanel();
      if(id=="list-tab"){
          cardPanel.layout.setActiveItem(1)
      }
      else if(id == 'shops-tab')
        cardPanel.layout.setActiveItem(2)
      else 
        cardPanel.layout.setActiveItem(0)
   },
   
});
