Ext.define("test.view.welcome.Welcome", {
    extend: 'Ext.Container',
    alias: 'widget.welcome',
    xtype: 'welcome',

    width: '100%',
    height: '100%',
    layout: 'border',

    requires: [
        'test.view.welcome.WelcomeController',
        "test.view.welcome.WelcomeModel",
        'test.view.welcome.Help'
    ],

    controller: 'welcomeCtrl',
    viewModel: {
        type: 'welcomeModel'
    },
    items:[{
        xtype : 'container',
        region: 'center',
        cls : 'contentPanel',
        scrollable: true,
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        items:[{
            xtype :'container',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items:[{
                xtype: 'container',
                html: '<div>Welcome to SWDP configurator</div>',
                cls : 'welcome-header-title'
            }]
        }]
    }]
});
