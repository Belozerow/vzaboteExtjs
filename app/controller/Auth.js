Ext.define('Vzabote.controller.Auth',{
    extend: 'Ext.app.Controller',
    authUrl: 'http://auth.v-zabote.ru/oauth/authorize/',
    accessUrl: 'http://auth.v-zabote.ru/oauth/get_access_token/',
    client_id: 2,
    client_secret: 12345,    
    getAuthUrl: function(){
        return this.getUrl(this.authUrl,{
            client_id: this.client_id,
            redirect_uri: 'http://192.168.139.105/vzaboteExtjs/#/auth'
        });
    },
    getAccessUrl: function(code){
        return this.getUrl(this.accessUrl,{
            grant_type: 'authorization_code',
            client_id: this.client_id,
            client_secret: this.client_secret,
            code: code,
            redirect_uri: 'http://192.168.139.105/vzaboteExtjs/#/auth'
        });
    },
    getUrl: function(url,params){
        url+='?';
        for(var param in params){
            if(params.hasOwnProperty(param)){
                url+=param+'='+encodeURI(params[param])+'&';
            }
        }
        return url.slice(0,-1);
    },
    auth: function(query){
        var code = this.getParameterByName('code');
        Ext.data.JsonP.request({
            url: this.getAccessUrl(code)
        });
    },
    getParameterByName: function(name){
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if(results === null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
});
//http://auth.v-zabote.ru/oauth/authorize/?client_id=2&redirect_uri=http://192.168.139.105/vzaboteExtjs/#/auth
