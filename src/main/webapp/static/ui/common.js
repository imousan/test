var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
var tips = '<span style="color:red;font-weight:bold">◥</span>';
var mandatory = '<span style="color:red;font-weight:bold">*</span>';
mandatory = '<span style="float:left;color:red;font-weight:bold;margin-right: 5px">*</span>';
var rightMandatory = '<span style="float: right;margin: -20px -5px 0 0;color:red;font-weight:bold;">*</span>';
/**
 * configOnly:save to config File
 * all:active and hidden items
 * includePrice:collcet price items
 * */
var CAL_CONDITIONS = {configOnly:false, active:true, includePrice:false};
var SAVE_CONDITIONS = {configOnly:true, active:false, includePrice:false};
var RECAL_CONDITIONS = {configOnly:false, active:false, includePrice:false};
var SAVELOCK_CONDITIONS = {configOnly:true, active:false, includePrice:true};

function showComp(comp){
    if(comp){
    	if(Ext.isArray(comp)) {
    		comp.forEach(function(c){
    			showComp(c);
    		});
    	} else {
    		comp.show();
    	}
        for (var i=1;i<arguments.length;i++){
            showComp(arguments[i]);
        }
    }
}

function hideComp(comp){
    if(comp){
    	if(Ext.isArray(comp)) {
    		comp.forEach(function(c){
    			hideComp(c);
    		});
    	} else {
    		comp.hide();
    	}
        for (var i=1;i<arguments.length;i++){
            hideComp(arguments[i]);
        }
    }
}

function setCmpAllowBlank (cmps, value){
    cmps.forEach(function(cmp){
        Ext.apply(cmp, {allowBlank: value}, {});
    });
}

function setMinDateForFIAndReadyDate(cmps, value){
    cmps.forEach(function(cmp){
        //Ext.apply(cmp, {minValue: value}, {}); this will allow to choose invalid date
        cmp.setMinValue(value);
    });
}

function isXType(cmp, xtype){
	//return cmp.isXType(xtype, true);
	return cmp.isXType(xtype);
}

function bindValidator(ctrl){
    var cmps =  ctrl.getView().query('combo');
    if(cmps) {
        for (var i = 0; i < cmps.length; i++) {
            var cmp = cmps[i];
            if(cmp.getStore()){
                cmp.validator = Ext.bind(validateBaseConfigParam, ctrl, cmp,true);
            }
        }
    }
}

function compare2Objects(v1, v2) {
    if (typeof(v1) !== typeof(v2)) {
        return false;
    }
    if (typeof(v1) === "function") {
        return v1.toString() === v2.toString();
    }
    if (v1 instanceof Object && v2 instanceof Object) {
        if (countProps(v1) !== countProps(v2)) {
            return false;
        }
        var r = true;
        for (k in v1) {
            r = compare2Objects(v1[k], v2[k]);
            if (!r) {
                return false;
            }
        }
        return true;
    } else {
        return v1 === v2;
    }

}
function getContentPanelWidth(){
	var clientScreenWidth = document.body.clientWidth;
	if(clientScreenWidth>1366){
		return "98%";
	}else{
		return 1090;
	}
}

function getHalfWidthOfContentPanel(){
	var clientScreenWidth = document.body.clientWidth;
	if(clientScreenWidth>1366){
		return "49%";
	}else{
		return 545;
	}
}

function getBasicConfigData(){
    return Ext.StoreMgr.lookup('BaseConfigs').getData().items[0].getData();
}

function getInvalidFields(form){
    Ext.suspendLayouts();
    var invalid = form.getFields().filterBy(function(field) {
        return !field.validate();
    });
    Ext.resumeLayouts(true);
    return invalid;
}

function deepClone(object){
    return Ext.JSON.decode(Ext.JSON.encode(object));
}
