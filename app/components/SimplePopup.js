Ext.define('Vzabote.view.SimplePopup',{
    extend: 'Ext.window.Window',
    alias: 'widget.simplepopup',
    header: false,
    border: false,
    closable: false,
    draggable: false,
    resizable: false,
    closeAfterAnimation: false,
    anim: {
        from: {opacity: 0},
        duration: 700
    },
    initComponent: function(){
        this.callParent();
        this.on('show',this.showPopup,this)
    },
    showPopup: function(){
        if(this.ownerEl){
            this.alignTo(this.ownerEl);
        }
        this.getEl().hide()
        this.getEl().fadeIn(this.anim);
    },
    close: function(){
        if(this.getActiveAnimation().running)
            this.getActiveAnimation().end();    
        this.callParent(arguments)
   }
    
})
