Ext.define("test.view.user.Users",{
    extend: "Ext.grid.Panel",

    alias: 'widget.user-list',
    xtype: 'users',

    requires: [
        'test.view.ux.form.SearchField',
        "test.view.user.UsersController",
        "test.view.user.UsersModel",
        "test.view.user.Edit"
    ],
    
    controller: "user-users",
    viewModel: {
        type: "user-users"
    },
    bind: {
        store: '{users}'
    },

    plugins: 'gridfilters',
    listeners: {
        boxready : 'gridIsReady'
    },
    columns: [{
        text: 'EID',
        dataIndex: 'eid',
        filter: 'string'
    }, {
        text: 'Name',
        dataIndex: 'name',
        filter: 'string'
    }, {
        text: 'Email',
        dataIndex: 'email',
        filter: 'string',
        flex: 1
    }],

    dockedItems: [{
        xtype: 'toolbar',
        //bind:{hidden:'{!isAdmin}'},
        dock: 'top',
        items: [
            {
            	text: 'Add',
            	icon: 'static/ui/resources/images/fam/application_form_add.png',
            	scope: this,
            	listeners: {
            		click: 'addClicked'
            	}
            },{
            	text: 'Edit',
            	icon: 'static/ui/resources/images/fam/application_form_edit.png',
            	scope: this,
            	listeners: {
            		click: 'editClicked'
            	}
            },{
            	text: 'Delete',
            	icon: 'static/ui/resources/images/fam/delete.png',
            	scope: this,
            	listeners: {
            		click: 'removeClicked'
            	}
            },{
                text: 'Refresh',
                icon: 'static/ui/resources/images/fam/arrow_refresh.png',
                scope: this,
                listeners: {
                    click: 'refreshClicked'
                }
            }
        ]
    }],
    
    height: 300,
    width: 600,

    viewConfig: {
        emptyText: 'No users.'
    }
});
