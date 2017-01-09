Ext.define('test.view.user.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.userEdit',
    autoShow: true,
    editMode:false,
    title: this.editMode?'Edit User':'Add User',
    controller: "user-users",
    viewModel: {
        type: "user-edit"
    },
    requires: [
               'test.view.user.EditModel'
           ],
    modal: true,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                region: 'center',
                fieldDefaults: {
                	msgTarget: 'side',
                    width: 300
                },
                defaultType: 'textfield',
                bodyPadding: '10 10 10 10',
                border: false,
                bodyStyle: {background: 'transparent'},
                items: [{   
		                    readOnly : this.editMode,
		                    name : 'eid',
                            allowBlank:false,
		                    fieldLabel: 'EID'
		                },
                        {
		                	readOnly : this.editMode,
		                	hidden:!this.editMode,
		                    name : 'name',
		                    fieldLabel: 'Name'
                        },
                        {
                        	readOnly : this.editMode,
		                	hidden:!this.editMode,
		                    name : 'email',
		                    fieldLabel: 'Email'
                        },
                        {
                            xtype : 'combo',
                            name : 'roleId',
                            allowBlank:false,
                            displayField: 'name',
                            valueField: 'id',
                      	  	queryMode: 'local',
                      	  	editable: false,
                            bind: {
                                store: '{roles}'
                            },
                            fieldLabel:'Role'
                        }
                    ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                scope: this,
                listeners: {
                    click: 'saveUserClicked'
                }
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});