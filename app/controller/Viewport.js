Ext.define('Vzabote.controller.Viewport',{
   extend: 'Ext.app.Controller',
   refs: [{
       ref: 'cardpanel',
       selector: '#cardpanel'
   }], 
   init: function(){
       this.control({
           //tabs active
          'viewport > #header': {
              afterrender: function(me){
                me.getEl().on('click',function(e,node){
                   this.setActiveTab(node.id); 
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
   }
});
