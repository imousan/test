Ext.define("test.view.ux.form.testField.testNumberField",{
	extend: "Ext.form.field.Number",
    
    alias: 'widget.testNumberfield',
    
    mixins: ['test.view.ux.form.testField'],
    
    allowDecimals : false,
    minValue : 0,
    initComponent: function () {
    	var me = this;
    	me.callParent(arguments);
    	me.inittestfield();
    }
});


Ext.define("test.view.ux.form.testField.testOverHeadPriceField",{
    extend: "Ext.form.field.Number",

    alias: 'widget.testOverHeadPriceField',

    mixins: ['test.view.ux.form.testField'],

    allowDecimals : false,
    minValue : 0,
    cls:'overhead-price',

    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        me.inittestfield();
    }
});


Ext.define("test.view.ux.form.testField.testTextField",{
	extend: "Ext.form.field.Text",
    
    alias: 'widget.testTextfield',
    
    mixins: ['test.view.ux.form.testField'],

    initComponent: function () {
    	var me = this;
    	me.callParent(arguments);
    	me.inittestfield();
    }
});

Ext.define("test.view.ux.form.testField.testDisplayField",{
	extend: "Ext.form.field.Display",
    
    alias: 'widget.testDisplayfield',
    
    mixins: ['test.view.ux.form.testField'],
    
    initComponent: function () {
    	var me = this;
    	me.callParent(arguments);
    	me.inittestfield();
    }
});

Ext.define("test.view.ux.form.testField",{
	mixinId: 'testfield',
    
    unitText:undefined,
	
	inittestfield:function(){
		var me = this;
    	me.on("render", function(field){
    		if (me.unitText)
    			me.createUnit();
    	});
	},
	
	setUnitText:function(unit){
		unit = unit || '';
		var me = this;
		me.unitText = unit;
		if (me.rendered) {
			me.unitEl = me.getEl().child('[name="unit"]');
			if(me.unitEl)
				me.unitEl.setHtml(me.unitText);
			else
				me.createUnit();
			me.updateLayout();
		}
	},
	
	//@private
	createUnit:function(){
		var me = this;
		me.unitEl = me.getEl().createChild({
			name:'unit',
			tag : 'div',
			html : me.unitText
		});
		me.unitEl.addCls('x-form-unit');
	}
});

Ext.define("test.view.ux.form.testField.UpgradeStepsRadio",{
    extend: "Ext.form.RadioGroup",
    alias: 'widget.upgradeStepsRadio',
    stepCount:1,
    checkedStep:undefined,
    initComponent : function(){
    	this.items = [];
    	for(var i =1; i<=this.stepCount; i++) {
    		this.items.push({ boxLabel: i+(i==1?'step':' steps'), name: 'rb'+this.getId(), inputValue: i , checked:this.checkedStep==i?true:false});
    	}
    	this.callParent();
    }
});

Ext.define("test.view.ux.form.testField.OrderClassification", {
    extend : "Ext.form.field.Text",
    alias : 'widget.orderClassification',
    fieldLabel : 'Order classification',
    bind : {
        hidden : '{!showForAdminFinancialSpm}'
    },
    labelWidth : 280,
    testId : null,
    flex : 1,
    readOnly : true,
    tipsText : "This string shows the type of project for this particular project. It used for reporting purpose."
            + "<br>CS (for Cold Start)"
            + "<br>FI (for Upgrade)"
            + "<br>FIRO (for Upgrade and Roll Out)"
            + "<br>RO (for Roll Out)"
            + "<br>PS (for Pre Sales)"
            + "<br>SUM (for Updates)"
            + "<br>CD (for Continuous Deployment)",
    plugins : new testtips()

});

Ext.define('test.view.ux.form.testField.PercentNumberField', {
    extend: "test.view.ux.form.testField.testNumberField",
    alias: 'widget.testPercentField',
    mixins: ['test.view.ux.form.testField'],


    spinDown: function() {
        var me = this;
        if (!me.disabled) {
            me.fireEvent('spin', me, 'down');
            me.fireEvent('spindown', me);
            me.onSpinDown();
        }
    },


    // override onSpinUp
    onSpinUp: function() {
        var me = this;
        if (!me.readOnly) {
            var val = parseInt(me.processRawValue(me.getRawValue()));
            var newVal = val + me.step;
            if (newVal <= me.maxValue){
                me.setRawValue(newVal);
            }
        }
    },

    // override onSpinDown
    onSpinDown: function() {
        var me = this;
        if (!me.readOnly) {
            var val = parseInt(me.processRawValue(me.getRawValue()));
            var newVal = val - me.step;
            if (newVal >= me.minValue){
                me.setRawValue(newVal);
            }
        }
    },

    valueToRaw: function(v) {
        if(v == 0)
            return this.callParent([v]);
        return v > 1
            ? parseInt(v)
            : parseInt(v * 100);
    },

    rawToValue: function(v) {
        return v < 1
            ? parseFloat(v)
            : parseFloat((v / 100).toFixed(2));
    }
});