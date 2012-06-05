Ext.define('Vzabote.view.JntSlider',{
   extend: 'Ext.slider.Multi',
   animate: false,
   initComponent: function(){
       this.callParent(arguments);
       this.on('afterrender',this.addJnt,this);
       this.on('change',this.cngJnt,this);
       this.on('beforechange',this.cngJnt,this);
       
   },
   addJnt: function(){
       var dh = Ext.DomHelper;
       this.thumbsCount = this.thumbs.length; 
       if(this.thumbsCount == 2)
            this.jnt = Ext.get(dh.insertAfter(this.thumbs[0].el,'<div class="slider-jnt"></div>'));
       else if(this.thumbsCount == 1){
           this.jnt = Ext.get(dh.insertBefore(this.thumbs[0].el,'<div class="slider-jnt"></div>'));
       }
       this.cngJnt();
   },
   cngJnt: function(){
       if(this.thumbsCount == 2){
            var fThumb = this.thumbs[0].el,
                sThumb = this.thumbs[1].el;
            this.jnt.setX(fThumb.getX()+fThumb.getWidth()/2);
            this.jnt.setWidth(sThumb.getX()-fThumb.getX());
       }
       else{
           var thumb = this.thumbs[0].el;
           this.jnt.setWidth(thumb.getX());
       }
   }
});
