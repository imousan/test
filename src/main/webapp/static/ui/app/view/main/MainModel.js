/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('test.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    links: {

    },


    data: {
        me: null ,   // will be loaded in controller in sync manner.

        userFilters : [],
        navigation: [
            { text: "Welcome", leaf: true,id : "welcome", widgetName: 'test.view.welcome.Welcome' },
            { text: "User", leaf: true,id : "user", widgetName: 'test.view.user.Users' }

        ]
    },

    stores: {
    },
   
    formulas: {
        /**
         * This formula used roleTreated data to find if the currentEngineRoleId could be treated as other role.
         * If it could be treated as other role,this formula will return the engineRoleId which been treated as
         * ,or it will return null.
         * This formula doesn't support nested treat.
         */
    }
});