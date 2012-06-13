Ext.define('Vzabote.controller.Breadcrumb',{
   extend: 'Ext.app.Controller',
   refs: [{
       ref: 'viewportTopPanel',
       selector: '#top-panel'
   }],
   home: {url: '#/index'},
   products: {},
   cart: {url: '#/cart'},
   shops: {},
   active: 'home',
   init: function(){
       Vzabote.bc = this;
       this.control({
          
       });
   },
   updateNav: function(){
       this.getViewportTopPanel().update(this.getData());
   },   
   getActive: function(){
       return this.active;
   },
   setActive: function(active){
       this.active = active;
   },
   /*
    * @params is an object with @url, @back and @forward fields
    *         @back and 
    *         @forward fields are objects with @text and @url fields
    */
   setItem: function(name,params,doActive){
       if(name&&this[name]){
           Ext.apply(this[name],params);
           if(doActive===undefined||doActive===true)
               this.setActive(name);
           this.updateNav();
       }
   },
   clearItem: function(name){
       if(this[name]){
           this[name] = {};
           this.updateNav();
       }
   },
   getItem: function(name){
       return this[name];
   },
   getData: function(){
       return {
                home: this.home,
                products: this.products,
                cart: this.cart,
                shops: this.shops
       };
   }
});