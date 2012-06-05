Ext.define('Vzabote.view.NavigationPanel',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.navpanel',
    cls: 'navigation-panel',
    initComponent: function(){
        this.callParent();
        this.updateButtons();
    },
    updateButtons: function(){
        this.removeAll();
        if(this.step){
            var bcItem = Vzabote.bc.getItem(this.step);
            if(bcItem){
                if(bcItem.back&&bcItem.back.url){
                    this.back = Ext.create('Ext.button.Button',{
                        text: bcItem.back.text,
                        href: bcItem.back.url,
                        hrefTarget: '_self',
                        cls: 'back-button'
                    });
                    this.add(this.back);
                }
                if(bcItem.forward&&bcItem.forward.url){
                    this.forward = Ext.create('Ext.button.Button',{
                        text: bcItem.forward.text,
                        href: bcItem.forward.url,
                        hrefTarget: '_self',
                        cls: 'forward-button'
                    });
                    this.add(this.forward);
                }                
            }
        }
    }
});
