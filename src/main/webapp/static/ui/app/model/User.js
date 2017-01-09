Ext.define('test.model.User', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'eid', 'email'],
    proxy: {
        type: 'rest',
        url: 'users'
    },
    
    isAdmin : function() {
    	return this.get('engineRoleId') == 1;
    },
    isOrdinary : function() {
    	return this.get('engineRoleId') == 0;
    }
});