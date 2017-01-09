Ext.define('test.view.welcome.Help', {
    extend: 'Ext.window.Window',
    alias : 'widget.helpWin',
    modal: true,
    width:600,
    height: 300,
    //autoScroll:true,
    title:'Help',
    buttonAlign : 'center',
    overflowX :'hidden',
    overflowY : 'auto',
    
    initComponent: function () {
    	this.items = [
            {
                xtype: 'form',
                border: false,
                defaults: {
        			xtype: 'container'
   				},
                items: [{
                    padding : '20 0 0 0',
                	html: '<font>' + 'All upgrades are assumed to be remote delivery. If you require On-site delivery, then an exemption request is necessary.' + '</font>'
                }]
            }
        ],
        this.buttons = [{
                text: 'ok',
                scope: this,
                handler: this.close
            }
        ];
      this.callParent(arguments);
    }
  });
  