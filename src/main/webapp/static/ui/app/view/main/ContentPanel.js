
Ext.define("test.view.main.ContentPanel",{
    extend: "Ext.panel.Panel",
 
    xtype: 'contentPanel',
    id: 'content-panel',

    layout: {
        type: 'hbox',
     	align: 'center',
        pack: 'center'
    },

    scrollable: true
});
