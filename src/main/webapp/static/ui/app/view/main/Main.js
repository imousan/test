/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('test.view.main.Main', {
    extend: 'Ext.container.Viewport',
    alias : 'widget.main-viewport',
    requires: [
        'test.view.main.MainController',
        'test.view.main.MainModel',
        'test.view.main.Header',
        'test.view.main.Navigation',
        'test.view.main.ContentPanel'
    ],

    controller: 'main',
    viewModel: {
        type: 'main'
    },
    scrollable: true,
    layout: {
        type: 'border'
    },
    listeners:{
        afterrender:  'afterMainPanelRender'
    },
    items: [{
        region: 'north',
        xtype: 'appHeader'
    },{
        xtype: 'navigation-tree',
        title: 'Navigation',
        region: 'west',
        id : 'navigationTree',
        collapsible: true,
        width: 230,
        split: true,
        listeners: {
            itemclick: 'onClickNavigation'
        }
    },{
        region: 'center',
        xtype: 'contentPanel',
        title: 'Workspace'
    }]
});
