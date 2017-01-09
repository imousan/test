Ext.define('test.controller.Root', {
    extend: 'Ext.app.Controller',

    requires: [
        'test.view.main.Main'
    ],

    models: [
        'User'
    ],

    stores: [
        'Navigation'
    ],

    config: {
        control: {
            'viewport > navigation-tree': {
                selectionchange: 'onTreeNavSelectionChange'
            }
        },
        refs: {
        }        
    },

    onTreeNavSelectionChange: function(selModel, records) {
        if(records.length==0){
            return;
        }
        var record = records[0],
            id = record.getId();

        var store = Ext.StoreMgr.lookup('Navigation');
        var node = store.getNodeById(id);

        if (!node.isLeaf()) {
            return;
        }

        function getNodeTitle(node) {
            var spliter = ' - ';
            var text = node.get('text'),
                title = node.isLeaf() && !node.parentNode.isRoot() ? (node.parentNode.get('text') + spliter + text) : text;

            return title;
        }

        this.redirectTo({widgetName: node.get('widgetName'), title: getNodeTitle(node),id : node.get('id')});
    },
    
    /*
     * Redirect to a specific view, so that it show in content panel.
     *
     * @param config
     *      The {id} of the component to render is needed.
     *      The {title} is optional, because you can update the application title through {@link updateTitle(title)}.
     */
    redirectTo: function(config, options) {
        if (!config.widgetName) {
            return;
        }

        var contentPanel =  Ext.ComponentQuery.query('contentPanel')[0];
        Ext.suspendLayouts();
        var panels = contentPanel.items.items;
        var removed = [];
        for (var i = 0; i < panels.length; i++) {
             panels[i].hide();
             if(!panels[i].configId){
                removed.push(panels[i]);
             }
        }
        
        for (var i = 0; i < removed.length; i++) {
            contentPanel.remove(removed[i]);
        }

        var cmp,
            className =config.widgetName;

        if (className) {
            if(config.id&&config.id!="config-list"){
                var configId = config.id;
                cmp = contentPanel.down("panel[configId="+configId+"]");
            }
            if(!cmp){
                cmp = Ext.create(className, options || {});
                cmp.configId = configId;
                contentPanel.add(cmp);
            }
           
            this.updateTitle(config.title || 'Workspace');
        }

        Ext.resumeLayouts(true);

        if (cmp) {
            cmp.show();
        }
        return cmp;
    },

    /*
     * Update the application (content panel) title.
     *
     * @param title
     *      the application title
     */
    updateTitle: function(title) {
        Ext.ComponentQuery.query('contentPanel')[0].setTitle(title);
        var header = Ext.ComponentQuery.query('contentPanel')[0].getHeader();
        header.removeCls("x-unselectable");
        //header.getEl().selectable();
        header.getTitle().textEl.dom.setAttribute("unselectable","off");
    },

    onLaunch: function() {
        Ext.TaskManager.start({
            run: function() {
                test.model.User.load('me', {
                    failure: function(record, operation) {
                        Ext.Msg.show({
                            title: "Error",
                            message: "You may not operate for a long time or server cannot be reached, please try to refresh your browser.",
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                    }
                });
            },
            interval: 120000
        });
    }
    
});
