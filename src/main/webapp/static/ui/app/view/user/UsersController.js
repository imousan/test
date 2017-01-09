Ext.define('Ext.ux.fixed.ListFilter', {
    override: 'Ext.grid.filters.filter.List',
    setValue: function (values) {
        var me = this;
        if (!values) {
            me.callParent();
            return;
        }
        var len = values.length;
        if (!me.menu) {
            me.createMenu();
        }
        me.filter.setValue(values);

        if (len && me.active) {
            me.updateStoreFilter(me.filter);
        } else {
            me.setActive(!!len);
        }
    }
});
Ext.define('test.view.user.UsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user-users',
    
    editClicked: function() {
        var sel = this.getView().getSelection()[0];
        if (!sel) {
            Ext.Msg.alert('Information', 'Please select user to edit.');
            return;
        }

        this.showEdit(sel, {editMode:true});
    },
    
    removeClicked: function() {
        var sel = this.getView().getSelection()[0];
        if (!sel) {
            Ext.Msg.alert('Information', 'Please select user to remove.');
            return;
        }

        var store = this.getView().getStore();
        var pCtrl = this;
        Ext.Msg.confirm("Delete User", "The selected user and its Configurations will be removed from system?", function(btn) {
            if (btn == 'yes') {
                store.remove(sel);
                store.sync({failure: function(batch, operations) {
                    Ext.Msg.show({
                        title: "Error",
                        message: "Failed to delete user.",
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }});
            }
        });
    },

    addClicked : function(){
        this.showEdit(Ext.create('test.model.User'));
    },

    showEdit: function(record, config) {
        var win = Ext.widget('userEdit',Ext.apply({parent: this.getView()}, config || {}));
        var form =win.down('form');
        form.loadRecord(record);
        win.show();
    },

    saveUserClicked : function(button) {
    	var win = button.up('window');
        form = win.down('form');
        if (!form.getForm().isValid()) return;
        var pCtrl = this.getView().parent.getController();
    
        var record = form.getRecord();
        var values = form.getValues();
        var store = this.getView().parent.getViewModel().getStore('users');
        record.set('roleId', values.roleId);
        
        if(!win.editMode) {
        	record.set('eid', values.eid);
        	record.set('name', values.name);
        	record.set('email', values.email);
        	record.set('id', null);
        }
        var loadMask = new Ext.LoadMask(this.getView(), {msg:'Saving...'});
		loadMask.show();
        record.save({success : function(resp, opts) {
        				store.reload();
        				loadMask.hide();
        				win.close();
        			},
        			failure:function(resp,opts){
        				loadMask.hide();
        				var result = Ext.JSON.decode(opts.error.response.responseText);
        				if(result)
        					Ext.Msg.alert('Error', result.msg);
        			}
        });
    },

    refreshClicked: function () {
        this.getStore('users').reload();
    },

    changeFilter: function (store, filters, eOpts) {
        var mainView = this.getView().up("main-viewport");
        mainView.getViewModel().set("userFilters", filters)
    },

    gridIsReady: function () {
        var ctrl = this;
        var vm = ctrl.getViewModel();
        var store = vm.getStore("users");
        var userFilters = vm.get('userFilters');
        if (userFilters.length > 0) {
            store.filter(userFilters);
            ctrl.getView().filters.clearFilters();
        }
    }
});
