Ext.define('Vzabote.view.ScrollableDataView',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.scrollabledataview',
    cls: 'scrollable-dataview',
    tpl: '',
    scrollOverWidth: 300,
    animSpeed: 8,
    animDuration: 800,
    constrainMargin: 2,
    scrollItemsCount: 3,
    scrollerIsActive: true,
    initComponent: function(){
        this.callParent();
        this.itemElWidth = 0;
        this.scrollerDiff = 0;
        this.dataViewConstrainX = [0,0];
        this.scrollWidth = 0;
        
        this.animDelay = new Ext.util.DelayedTask(function(){
            this.animationIsActive = false;
        },this);
        
        this.store = Ext.getStore(this.store);
        if(!this.store)
            console.error('Scrollable dataview requires store');
        if(!this.cardParent){
            console.warn('Scrollable dataview requires cardParent param to save animation on card switch');
        }
        else{
            this.mon(this.cardParent,'deactivate',function(){
                this.stopAnimation();
            },this);
            this.mon(this.cardParent,'activate',function(){
                if(this.scrollWidth>0)
                    this.dragEnd(0);
            },this);   
        }
        this.dataView = this.add({
            xtype: 'dataview',
            store: this.store,
            cls: 'scrollable-dataview-dataview',
            itemCls: 'scrollable-dataview-item',
            itemTpl: this.itemTpl,
            listeners: {
                scope: this,
                itemclick: function(me,item,node,index,e){
                    if(!this.animationIsActive)
                        this.fireEvent('itemclick',me,item,node,index,e)
                }
                
            }
        })
        this.mon(this.store,'load',this.refresh,this);
        this.mon(this.store,'datachanged',this.refresh,this);
        
        this.dataView.on('viewready',function(){
            if(!this.store.isLoading()){
                this.refresh();
            }
        },this,{single: true})
        this.scrollerContainer = Ext.create('Ext.container.Container',{
            cls: 'scroll-bar',
            html: '<div class="scroller-container">'+ //scrollerEl
                            '<div class="scroller"></div>'+ //scrollEl
                  '</div>',
            width: 800
        })
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
                },this.scrollerContainer,{
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
    onScrollerClick: function(e,node){
        var scroller = this.scrollEl;
        if(!this.scrollEl.contains(node)){
            this.dragEnd(((e.getX() - this.scrollConstrainX[0]) - (scroller.getX() - this.scrollConstrainX[0] + scroller.getWidth()/2))/(this.scrollerSizeRatio*this.animSpeed))
        }
    },
    initElements: function(scrollerHtml){
        
        if(Ext.isString(scrollerHtml))
            this.scrollerContainer.update(scrollerHtml)
        if(this.scrollerEl) 
            this.scrollerEl.un('click',this.onScrollerClick,this);
        this.scrollerEl = this.scrollerContainer.getEl().down('.scroller-container');
        this.scrollEl = this.scrollerEl.down('.scroller');
        
        this.scrollerEl.on('click',this.onScrollerClick,this)
        
        if(this.ddTracker) this.ddTracker.destroy()
        this.ddTracker = new Ext.dd.DragTracker({
            el: this.dataView.getEl(),
            prevPos: 0,
            speed: 0,
            listeners: {
                dragstart: function(e){
                    this.ddTracker.prevPos = e.startXY[0];
                    this.animationIsActive = true;
                },
                dragend: function(e){
                    this.animDelay.cancel();
                    this.animDelay.delay(200);
                    this.dragEnd(this.ddTracker.speed)
                },
                drag: function(e){
                    this.animationIsActive = true;
                    this.ddTracker.speed = this.ddTracker.prevPos - e.lastXY[0];
                    this.scrollTo(this.ddTracker.prevPos - e.lastXY[0])
                    this.ddTracker.prevPos = e.lastXY[0];
                },
                scope: this
            }
        });
        if(this.scrollerDDTracker) this.scrollerDDTracker.destroy()
        this.scrollerDDTracker = new Ext.dd.DragTracker({
            el: this.scrollEl,
            prevPos: 0,
            speed: 0,
            listeners: {
                dragstart: function(e){
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
        if(!this.scrollerEl)
            this.initElements()
        var itemEl = this.dataView.getEl().first('.scrollable-dataview-item');
        if(itemEl){
            
            var aElements = this.dataView.getEl().select('a');
            if(aElements){
                aElements.un('click',this.onLinkClick,this);
                aElements.on('click',this.onLinkClick,this);    
            }
            this.itemElWidth = itemEl.getWidth() + itemEl.getMargin().left + itemEl.getMargin().right;
            this.dataView.setWidth(this.store.getCount()*this.itemElWidth+itemEl.getMargin().right);
            
            this.dataViewConstrainX = [this.getEl().getX(),(this.getWidth()-this.dataView.getWidth())];
            
            this.scrollerSizeRatio = ((this.getWidth()*this.scrollerEl.getWidth())/this.dataView.getWidth())/this.getWidth();
            if(this.metaData){
                var metaData = this.metaData,
                    i=0,
                    ln = metaData.length,
                    scrollerContainer = this.scrollerContainer,
                    width = 0,
                    scrollerHtml = '<div class="scroller-container"><div class="scroller"></div>',
                    scrollerMetaHtml = '<div class="scroller-meta">',
                    fullWidth = 0;
                for(; i < ln; i++){
                    width = metaData[i].count*this.itemElWidth*this.scrollerSizeRatio;
                    if(i+1==ln){
                        width = this.scrollerEl.getWidth() - fullWidth;
                    }
                    fullWidth+=width;
                    scrollerHtml += '<div class="scroller-part scroller-part-'+i+' '+((i+1==ln)?'scroller-part-last ':'')+'" style="width:'+width+'px"></div>';
                    scrollerMetaHtml += '<div class="scroller-meta-part scroller-meta-part-'+i+'" style="width:'+width+'px">'+metaData[i].name+'</div>'
                }
                scrollerHtml += '</div>' + scrollerMetaHtml + '</div>'
                this.initElements(scrollerHtml)
            }
            
            if(this.dataView.getEl().getWidth() < this.getEl().getWidth())
                this.scrollWidth = -1;
            else
                this.scrollWidth = (this.getWidth()*this.scrollerEl.getWidth())/this.dataView.getWidth()
            this.scrollEl.setWidth(this.scrollWidth);
            this.scrollConstrainX = [this.scrollerEl.getX()+this.constrainMargin,this.scrollerEl.getX()+this.scrollerEl.getWidth()-this.constrainMargin]
            // this.scrollerSizeRatio = this.scrollEl.getWidth()/this.getWidth();
            this.scrollEl.setX(this.scrollConstrainX[0])
        }
                
    },
    scrollTo: function(diff){
        if(this.scrollWidth != -1 && this.scrollerIsActive){
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
        if(this.scrollWidth != -1 && this.scrollerIsActive){
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
    stopAnimation: function(){
        var el = this.dataView.getEl(),
                    scroller = this.scrollEl;
        if(el.getActiveAnimation())
            el.getActiveAnimation().end()
        if(scroller.getActiveAnimation())
            scroller.getActiveAnimation().end();
    },
    hideScrollBar: function(){
        this.scroller.hide();
    },
    showScrollBar: function(){
        this.scroller.show();
    },
    onLinkClick: function(e){
        if(this.animationIsActive)
            e.preventDefault()
    },
    disableScroller: function(){
        this.scrollerIsActive = false;
    },
    enableScroller: function(){
        this.scrollerIsActive = true;
    },
    disableDataView: function(elementId){
        this.dataView.getTargetEl().mask()
        if(!this.store.isLoading()){
            this.activeElement = Ext.get(this.dataView.getNode(this.store.getById(elementId)));
            this.activeElement.addCls('scrollable-dataview-item-selected')    
        }
        else{
            this.mon(this.store,'load',function(){
                this.activeElement = Ext.get(this.dataView.getNode(this.store.getById(elementId)));
                this.activeElement.addCls('scrollable-dataview-item-selected')
            },this,{single: true})
        }        
        this.hideScrollBar();
        this.disableScroller();
    },
    enableDataView: function(){
        this.dataView.getTargetEl().unmask()
        this.activeElement.removeCls('scrollable-dataview-item-selected')
        this.showScrollBar();
        this.enableScroller();
    }
})
