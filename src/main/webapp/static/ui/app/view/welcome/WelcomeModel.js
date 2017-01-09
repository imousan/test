Ext.define('test.view.welcome.WelcomeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.welcomeModel',

    formulas: {

        userguideLink: function(get) {
            if (get('isAdmin')){
                return '<a href=https://erilink.imousan.se/eridoc/erl/objectId/09004cff8a46ead4?docno=BUGS-15:034006Uen&action=current&format=ppt12 target=_blank>User Guide</a>';
            }else if(get('isFinancial')){
                return '<a href=https://erilink.imousan.se/eridoc/erl/objectId/09004cff8a46ead5?docno=BUGS-15:034007Uen&action=current&format=ppt12 target=_blank>User Guide</a>';
            }else if(get('isSpm')){
                return '<a href=https://erilink.imousan.se/eridoc/erl/objectId/09004cff8a46ead6?docno=BUGS-15:034006Uen&action=current&format=ppt12 target=_blank>User Guide</a>';
            }else if(get('isOrdinary')){
                return '<a href=https://erilink.imousan.se/eridoc/erl/objectId/09004cff8a46ead7?docno=BUGS-15:034006Uen&action=current&format=ppt12 target=_blank>User Guide</a>';
            }
        }

    },

    data: {
    }

});
