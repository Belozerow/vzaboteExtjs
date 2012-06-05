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
   init: function(){
       Vzabote.bc = this;
       this.control({
          
       });
   },
   updateNav: function(){
       this.getViewportTopPanel().update(this.getData());
   },   
   /*
    * @params is object with @url, @back and @forward fields
    */
   setItem: function(name,params){
       if(name&&this[name]){
           Ext.apply(this[name],params);
           this.updateNav();
       }           
   },
   clearItem: function(name){
       if(this[name]){
           this[name] = {};
           this.updateNav();
       }
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