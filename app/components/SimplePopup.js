Ext.define('Vzabote.view.SimplePopup',{
    extend: 'Ext.window.Window',
    alias: 'widget.simplepopup',
    cls: 'simple-popup',
    closeOnViewportClick: true,
    header: false,
    border: false,
    closable: false,
    draggable: false,
    resizable: false,
    alignPosition: "tl-bl",
    anim: {
        from: {opacity: 0},
        duration: 700
    },
    closeAnim: {
        to: {opacity: 0},
        duration: 700,
        callback: function(){
            this.close();
        }
    },
    initComponent: function(){
        this.callParent();
        this.on('show',this.showPopup,this);
        var me = this;
        this.closeAnim.scope = me;
    },
    showPopup: function(){
        if(this.ownerEl){
            this.alignTo(this.ownerEl,this.alignPosition);
        }
        this.getEl().hide();
        this.getEl().fadeIn(this.anim);
    },
    close: function(withAnimation){
        if(this.getActiveAnimation())
            this.getActiveAnimation().end();
        if(withAnimation&&this.getEl()){
            this.getEl().fadeOut(this.closeAnim);
        } 
        else
            this.callParent();
   },
   destroy: function(){
       if(this.corner)
            this.corner.destroy();
       this.callParent(arguments);
   }
    
})
