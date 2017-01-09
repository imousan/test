/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('test.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        // 'Ext.window.MessageBox'
    ],

    alias: 'controller.main',

    init: function() {
    	this.getCurrentUser();
        this.control({

            '#navigationTree' : {
                afterrender:  this.initNavigationView
            }
        });
    },

    getCurrentUser: function() {
        Ext.Ajax.request({
            url: 'users/me',
            method: 'GET',
            async: false,
            scope: this,
            success: function(resp) {
                var me = Ext.decode(resp.responseText);
                var vm = this.getViewModel();
                vm.set('me', test.model.User.create(me));
                vm.notify();
            }
        });
    },

    afterMainPanelRender : function(){
        var rootCtrl = test.app.getController('Root');
        rootCtrl.redirectTo({widgetName: 'test.view.welcome.Welcome', title:'Welcome'});
    },

    onClickNavigation : function(s,r){
    },

    showLoadingMask : function(){
        var mask = Ext.getBody().mask("Loading...");
        mask.setZIndex(99999);
    },
    
    hideLoadingMask : function(){
        Ext.getBody().unmask();
    },

    refresh : function(){
        this.initNavigationView();
        var contentPanel =  Ext.ComponentQuery.query('contentPanel')[0];
        var panels = contentPanel.items.items;
        for (var i = 0; i < panels.length; i++) {
             if(panels[i].getController().refresh){
                panels[i].getController().refresh();
             }
        }
    },
    
    initNavigationView : function(){
        var mainViewModel = this.getViewModel();
        var navigationData = deepClone(mainViewModel.get("navigation"));
        var navigationTree = this.getView().queryById("navigationTree");
        navigationTree.setRootNode({
            expanded : true,
            children : navigationData
        });
        
    }
});
