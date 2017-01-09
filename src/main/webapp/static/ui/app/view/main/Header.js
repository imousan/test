
Ext.define("test.view.main.Header",{
    extend: "Ext.Container",
    xtype: 'appHeader',
    id: 'app-header',
    requires: [

    ],

    height: 70,
    layout: {
        type: 'hbox',
        align: 'middle'
    },

    items: [{
        xtype: 'component',
        id: 'app-header-logo'
    },{
        xtype: 'component',
        id: 'app-header-title',
        html: 'SWDP test Web',
        flex: 1
    }, {
        xtype : 'container',
        id : 'app-header-greeting',
        items : [ {
            xtype : 'component',
            bind : {
                html : 'Welcome, {me.name}'
            }
        }]
    }]
});
