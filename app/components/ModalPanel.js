Ext.define('Vzabote.view.ModalPanel',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.modalpanel',
    cls: 'modal-panel',
    left: 0,
    top: 0,
    height: Ext.Element.getViewHeight(),
    width: Ext.Element.getViewWidth(),
    floating: true,
    style: {
        'position': 'absolute',
        'left': '0px',
        'top': '0px'
    },
    initComponent: function(){
        this.renderTo = Ext.getBody();
        this.callParent();
        this.on('afterrender',this.addHandlers,this);
        this.initSizes();
        Ext.EventManager.onWindowResize(function(){
            this.initSizes();
        },this);
    },
    addHandlers: function(){
        
        var keyMap = this.getKeyMap();
        keyMap.on(Ext.EventObject.ESC, this.closePanel, this);
    },
    closePanel: function(){
        Ext.getBody().unmask();
        this.close();
    },
    initSizes: function(){
        var height = Math.max(Ext.getCmp('viewport').cards.getHeight()+Ext.getCmp('header').getHeight(),Ext.Element.getViewHeight()),
            width = Ext.Element.getViewWidth();
        this.setWidth(width);
        this.setHeight(height);
    }
});
