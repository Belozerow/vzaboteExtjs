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
          },
          '#login-button': {
              click: function(){
                  this.showLogin();
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
   showLogin: function(){
       if(this.loginPopup) 
            this.loginPopup.close();
       
       this.loginPopup = Ext.create('widget.loginpopup',{
       });
       this.loginPopup.show()
   }
});
