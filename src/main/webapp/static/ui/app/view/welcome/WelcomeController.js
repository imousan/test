var contactsInfo =  '<font size=3 style="font-weight:bold;">' + 'Help' + '</font></br></br>'+
                    'All upgrades are assumed to be remote delivery. If you require On-site delivery, then an exemption request is necessary.</br>'+
                    'Some releases are phased out, or close to being phased out, and requires an Exemption Request. ' +
                    'Contact your delivery center to agree upon the scope related options and fixed price for the project. ' +
                    'Remember to ensure the PO and quotated price correspond.</br>'+
                    'Send the exemption request to BUGS On-Site Exemption Board.</br>'+
                    'Please write your E. R. according to this '+
                    '<a href=http://anon.imousan.se/eridoc/component/eriurl/?objectId=09004cff84fa7b7d&docno=EAB-11%3A049520Uen&action=approved&format=msw8 target=_blank>template</a>' +
                    '<span></span><h4 align="left"><font size=3 style="font-weight:bold;">' + 'Contacts' + '</font></h4></span>'+
                    'Please ensure, that MORE request issued and SPM from allocated GSC contacted with You, before You start to fill the file.'+
                    'If You are only interesting for price,please use freely the file!</br></br>If You need help, You can turn to the following Program Managers:</br></br>'+
                    'WRAN,GRAN &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="mailto:hongbo.jiang@imousan.com">Hongbo Jiang</a></br>'+
                    'MSC-S,HLR,STP&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="mailto:bo.a.xu@imousan.com">Bo Xu A</a></br>'+
                    'M-MGw,HLR-FE&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="mailto:alan.w.wang@imousan.com">Alan Wang W</a></br>'+
                    'GSN,SASN,SAPC&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="mailto:ting.p.lin@imousan.com">Ting Lin P</a></br>'+
                    'LTE C-NRO,SSR&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="mailto:susan.yan@imousan.com">Susan Yan</a></br>'+
                    'APG43L OSU&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="mailto:annie.liu@imousan.com">Annie Liu</a></br>'+
                    'RRPM &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + '<a href="mailto:peter.barany@imousan.com">Peter Barany</a></br></br></br>'+
                    'You have a possibility to order several product within 1 configuration, ' +
                    'but please follow the instruction for the PO handling. ' +
                    'OM Sweden is able to help only in financial HANDLING issues. ' +
                    'In case of technical questions please turn to the allocated SPM or to the relevant Program managers above.';
                    
                    
Ext.define('test.view.welcome.WelcomeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.welcomeCtrl',
    refs : [{
            ref : 'welcome',
            selector : 'welcome'
        }],
    init : function() {
        this.control({
                    'welcome': {
                        linkclick: this.linkclick  
                    },
                    'welcome button[action=start]' : {
                        click : this.start
                    }
                });
    },

    linkclick: function (el) {  
        var name = el.name; //information
        if(name=='information') {  
            var win = Ext.widget('informationWin');
            win.show();
        } else if(name=='help') { 
            var win = Ext.widget('helpWin');
            win.show();
        } else if(name == 'contacts'){
            Ext.MessageBox.show({
                title:'Welcome in world of SWDP/C-NRO!',
                width: 600,
                height:450,
                icon:Ext.Msg.INFO,
                msg:contactsInfo,
                buttonText: {ok: "ok"},
                fn: function(btn){
                    if("ok" == btn) {
                        this.close
                    }
                }
            });
        } else if(name=='mail') {
            window.location = 'mailto:swdp.config.tool.helpdesk@imousan.com';
        }
    },


    start : function(){
        var mainCtrl = this.getView().up("main-viewport").getController();
        mainCtrl.showLoadingMask();
        
    },
});
