Ext.define('Vzabote.view.ModalPanel',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.modalpanel',
    cls: 'modal-panel',
    floating: true,
    fullWidth: false,
    fullHeight: false,
    initComponent: function(){
        this.callParent();
        this.on('afterrender',this.addHandlers,this);
        this.maskEl = Ext.getBody().mask();
        this.maskEl.addCls('modal-panel-mask');
        if(this.fullHeight)
            this.setHeight(Ext.getBody().getHeight());
        if(this.fullWidth)
            this.setWidth(Ext.getBody().getWidth());
    },
    addHandlers: function(){
        this.mon(this.maskEl,'click',this.closePanel,this);
        var keyMap = this.getKeyMap();
        keyMap.on(27, this.closePanel, this);
        this.alignTo(Ext.getBody(),'l-l');
    },
    closePanel: function(){
        Ext.getBody().unmask();
        this.close();
    }
});
