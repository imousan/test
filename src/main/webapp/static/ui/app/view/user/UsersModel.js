Ext.define('test.view.user.UsersModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.user-users',
    data: {
    },

    stores: {
        users: {
            model: 'test.model.User',
            remoteFilter:true,
            autoLoad: true,
            listeners:{
                filterchange : 'changeFilter'
            },
            proxy: {
                type: 'rest',
                url: 'users'
            }
        }
    }
});
