Ext.define('test.view.user.EditModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user-edit',
    data: {
    },

    stores: {
    	roles : {
        	model: 'test.model.meta.Role',
            autoLoad: true,
            proxy: {
                type: 'rest',
                url: 'roles'
            }
        }
    }
});
