Ext.define('Vzabote.view.ScrollableDataView',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.scrollabledataview',
    cls: 'scrollable-dataview',
    tpl: '',
    // height: 300,
    scrollOverWidth: 300,
    animSpeed: 8,
    animDuration: 800,
    constrainMargin: 2,
    scrollItemsCount: 3,
    initComponent: function(){
        this.callParent();
        this.itemElWidth = 0;
        this.scrollerDiff = 0;
        this.dataViewConstrainX = [0,0];
        this.scrollWidth = 0;
        this.store = Ext.getStore(this.store);
        
        this.dataView = this.add({
            xtype: 'dataview',
            store: this.store,
            // height: 250,
            itemCls: 'scrollable-dataview-item',
            itemTpl: this.itemTpl,
            listeners: {
                scope: this,
                afterrender: function(){
                    // this.dataView.getEl().on('mousedown',function(){
                        // this.animationStop();
                    // },this)
                },
                itemclick: function(){
                    // if(this.animationIsActive())
                        // this.animationStop();
                    // else{
                        // console.log('itemselect')
                    // }
                }
                
            }
        })
        this.mon(this.store,'load',this.refresh,this);
        this.on('afterrender',this.initElements);
        
        this.scroller = Ext.create('Ext.panel.Panel',{
            // height: 50,
            dock: 'bottom',
            cls: 'scrollabledataview-controller',
            layout:{
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },             
            items: [{
                    xtype: 'button',
                    text: 'left',
                    cls: 'scrollabledataview-left',
                    width: 100,
                    handler: function(){
                        this.scrollLeft();
                    },
                    scope: this
                },{
                    xtype: 'container',
                    cls: 'scroll-bar',
                    html: '<div class="scroller-container">'+ //scrollerEl
                                    '<div class="scroller"></div>'+ //scrollEl
                          '</div>',
                    width: 800
                },{
                    xtype: 'button',
                    text: 'right',
                    cls: 'scrollabledataview-right',
                    width: 100,
                    handler: function(){
                        this.scrollRight();
                    },
                    scope: this
            }]   
        })
        this.addDocked(this.scroller)
        
    },
    initElements: function(){
        
        this.mon(this.store,'datachanged',this.refresh,this)
        
        this.scrollerEl = this.scroller.getEl().down('.scroller-container');
        this.scrollEl = this.scrollerEl.down('.scroller');
        
        this.scrollerEl.on('click',function(e,node){
            var scroller = this.scrollEl;
            if(!this.scrollEl.contains(node)){
                this.dragEnd(((e.getX() - this.scrollConstrainX[0]) - (scroller.getX() - this.scrollConstrainX[0] + scroller.getWidth()/2))/(this.scrollerSizeRatio*this.animSpeed))
            }
        },this)
        
        this.ddTracker = new Ext.dd.DragTracker({
            el: this.dataView.getEl(),
            prevPos: 0,
            speed: 0,
            listeners: {
                dragstart: function(e){
                    this.ddTracker.prevPos = e.startXY[0];
                },
                dragend: function(e){
                    this.dragEnd(this.ddTracker.speed)
                },
                drag: function(e){
                    this.ddTracker.speed = this.ddTracker.prevPos - e.lastXY[0];
                    this.scrollTo(this.ddTracker.prevPos - e.lastXY[0])
                    this.ddTracker.prevPos = e.lastXY[0];
                },
                scope: this
            }
        });
        
        this.scrollerDDTracker = new Ext.dd.DragTracker({
            el: this.scrollEl,
            prevPos: 0,
            speed: 0,
            listeners: {
                dragstart: function(e){
                    console.log('dragstart')
                    this.scrollerDDTracker.prevPos = e.startXY[0];
                },
                dragend: function(e){
                     this.dragEnd(-this.scrollerDDTracker.speed)
                },
                drag: function(e){
                    this.scrollerDDTracker.speed = this.scrollerDDTracker.prevPos - e.lastXY[0];
                    this.scrollTo(-(this.scrollerDDTracker.prevPos - e.lastXY[0])/this.scrollerSizeRatio)
                    this.scrollerDDTracker.prevPos = e.lastXY[0];
                },
                scope: this
            }
        });
    },
    refresh: function(){
        var itemEl = this.dataView.getEl().first('.scrollable-dataview-item');
        if(itemEl){
            this.itemElWidth = itemEl.getWidth() + itemEl.getMargin().left + itemEl.getMargin().right;
            this.dataView.setWidth(this.store.getCount()*this.itemElWidth+itemEl.getMargin().right);
            
            this.dataViewConstrainX = [this.getEl().getX(),(this.getWidth()-this.dataView.getWidth())];
            
            if(this.dataView.getEl().getWidth() < this.getEl().getWidth())
                this.scrollWidth = -1;
            else
                this.scrollWidth = (this.getWidth()*this.scrollerEl.getWidth())/this.dataView.getWidth()
            this.scrollEl.setWidth(this.scrollWidth);
            this.scrollConstrainX = [this.scrollerEl.getX()+this.constrainMargin,this.scrollerEl.getX()+this.scrollerEl.getWidth()-this.constrainMargin]
            this.scrollerSizeRatio = this.scrollEl.getWidth()/this.getWidth();
            this.scrollEl.setX(this.scrollConstrainX[0])    
        }
                
    },
    scrollTo: function(diff){
        if(this.scrollWidth != -1){
            var el = this.dataView.getEl(),
                leftOver = (el.getX() >  this.dataViewConstrainX[0] + this.scrollOverWidth),
                rightOver = (el.getX() < this.dataViewConstrainX[1] - this.scrollOverWidth),
                scroller = this.scrollEl;
                        
            if((!leftOver&&!rightOver) || (leftOver && !rightOver && diff > 0) || (rightOver && !leftOver && diff < 0)){
                if(el.getActiveAnimation())
                    el.getActiveAnimation().end()
                el.setX(el.getX()-diff)
                
                //scroller
                if(scroller.getActiveAnimation())
                    scroller.getActiveAnimation().end();
                
                if(el.getX() > this.dataViewConstrainX[0]){
                     this.changeScrollWidth = true;
                     scroller.setWidth(this.scrollWidth-((el.getX()-this.dataViewConstrainX[0])*this.scrollerSizeRatio))
                     scroller.setX(this.scrollConstrainX[0])
                }
                else if(el.getX() < this.dataViewConstrainX[1]){
                     this.changeScrollWidth = true;
                     scroller.setWidth(this.scrollWidth-((this.dataViewConstrainX[1] - el.getX())*this.scrollerSizeRatio))
                     scroller.setX(this.scrollConstrainX[1]-scroller.getWidth())
                }
                else{
                    if(this.changeScrollWidth){
                        scroller.setWidth(this.scrollWidth);
                        this.changeScrollWidth = false;
                    }
                    this.scrollerDiff+=diff*this.scrollerSizeRatio;
                    if(Math.abs(this.scrollerDiff)>1){
                        scroller.setX(Math.max(Math.min(scroller.getX() + parseInt(this.scrollerDiff),this.scrollConstrainX[1]-scroller.getWidth()),this.scrollConstrainX[0]))
                        this.scrollerDiff = this.scrollerDiff - parseInt(this.scrollerDiff);
                    }    
                }
                
            }
        }
        
    },
    dragEnd: function(speed){
        if(this.scrollWidth != -1){
            var el = this.dataView.getEl(),
            scroller = this.scrollEl,
            speed = speed*this.animSpeed;
            if(el.getActiveAnimation())
                el.getActiveAnimation().end()
            
            el.animate({
                to: {x: Math.max(Math.min(el.getX() - speed,this.dataViewConstrainX[0]),this.dataViewConstrainX[1])},
                duration: this.animDuration
            });
            
            if(scroller.getActiveAnimation())
                    scroller.getActiveAnimation().end();
            
            scroller.animate({
                to: {
                        x: Math.max(Math.min(scroller.getX() + speed*this.scrollerSizeRatio,this.scrollConstrainX[1]-this.scrollWidth),this.scrollConstrainX[0]),
                        width: this.scrollWidth
                    },
                duration: this.animDuration
            });   
        }
    },
    scrollLeft: function(){
        this.dragEnd((-this.itemElWidth/this.animSpeed)*this.scrollItemsCount);
    },
    scrollRight: function(){
        this.dragEnd((this.itemElWidth/this.animSpeed)*this.scrollItemsCount);
    },
    animationIsActive: function(){
        var el = this.dataView.getEl();
        if(el.getActiveAnimation())
            return true;
        return false;
    },
    animationStop: function(){
        var el = this.dataView.getEl(),
                    scroller = this.scrollEl;
        if(el.getActiveAnimation())
            el.getActiveAnimation().end()
        if(scroller.getActiveAnimation())
            scroller.getActiveAnimation().end();
    }
})
