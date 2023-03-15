sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("nmspoplog.oplog.controller.delta", {
            //La función onInit se ejecuta al ejecutar la applicación

            onInit: function () {
                sap.ui.core.BusyIndicator.show();
                //#region objetos Cabecera   
                //Fecha




                //#region onfocusout Para agregar el evento on focus out al combo box Storage



                //ipt_storage.today1


                //#endregion

                //#region JSON Se incluyen todos los objetos de la vista
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oView = this.getView("delta");
                var dataModelDt = this.getOwnerComponent().getModel("dataDt");//Will contain data mapped from the ODATA services
                var dataModelMain = this.getOwnerComponent().getModel("dataMain");//Will contain data mapped from the ODATA services
                //var i18Bundle = oView.getModel("i18n").getResourceBundle();
                //var servOk = "";
                //var models = oView.getModel("models").getResourceBundle();
                if (dataModelDt.oData.init !== "X") {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.getRoute("RouteDt").attachMatched(this._onRouteMatched, this);
                }

                this.setBtn(dataModelDt, dataModelMain, oView);


                var oJSON = {
                    //Muchos de los objetos combobox, tienen el mismo texto informativo (Tooltip)
                    //por eso se decidió crear uno en el controllador que puede ser instanciado por
                    //cualquier combobox que lo requiera, en lugar de definir uno a uno en cada objeto
                    //revisar vista propiedad value
                    //#region Generales
                    cbx_tooltip: "To change: Click the \n\r drop-down arrow \n\r and make selection.",
                    rmk_tooltip: "Enter exceptions and remarks.  \n\rThis field will expand  \n\rto accommodate your text.",
                    valSubmitted: "",
                    //#endregion
                    val_mandt: "",
                    val_date: "",
                    val_dateRmrk: "",
                    val_opname: "",
                    val_DbOpname: "",
                    val_OnDateSub: "",
                    //En nuestro modelo json podemos crear listas para utilizarlas como dataset en los objetos combobox
                    //Estas listas se instancían desde la vista, revisar propiedad items.

                    //#region Jurisdiction and control

                    lst_AquedCtrl: [
                        {
                            key: "itm_AquedCtrl_1",
                            text: "DFD"
                        },
                        {
                            key: "itm_AquedCtrl_2",
                            text: "POC"
                        }
                    ],
                    itm_selAquedCtrl: "",

                    lst_CliGteCtr: [
                        {
                            key: "itm_CliGteCtr_1",
                            text: "DFD"
                        },
                        {
                            key: "itm_CliGteCtr_2",
                            text: "POC"
                        }
                    ],
                    itm_sel_CliGteCtr: "",

                    lst_scaHost: [
                        {
                            key: "itm_scaHost_1",
                            text: "PCA"
                        },
                        {
                            key: "itm_scaHost_2",
                            text: "PCB"
                        },
                        {
                            key: "itm_scaHost_3",
                            text: "FB"
                        },

                        {
                            key: "itm_scaHost_4",
                            text: "CB"
                        }
                    ],
                    itm_selscaHost: "",
                    //#endregion

                    //#region Security Threat Levels
                    val_secColor: "",
                    val_SecThreatLvls_nat: "",
                    lst_SecThreatLvls_nat: [
                        {
                            key: "itm_SecThreatLvls_nat1",
                            text: "NORMAL"
                        },
                        {
                            key: "itm_SecThreatLvls_nat2",
                            text: "ELEVATED"
                        },
                        {
                            key: "itm_SecThreatLvls_nat3",
                            text: "IMMINENT"
                        },
                        
                        {
                            key: "itm_SecThreatLvls_nat4",
                            text: "GREEN"
                        },
                        
                        {
                            key: "itm_SecThreatLvls_nat5",
                            text: "BLUE"
                        },
                        
                        {
                            key: "itm_SecThreatLvls_nat6",
                            text: "YELLOW"
                        },
                        
                        {
                            key: "itm_SecThreatLvls_nat7",
                            text: "ORANGE"
                        },
                        
                        {
                            key: "itm_SecThreatLvls_nat8",
                            text: "RED"
                        },

                    ],
                    val_SecThreatLvls_dwr: "",
                    lst_SecThreatLvls_dwr: [
                        {
                            key: "itm_SecThreatLvls_dwr1",
                            text: "NORMAL"
                        },
                        {
                            key: "itm_SecThreatLvls_dwr2",
                            text: "ELEVATED"
                        },
                        {
                            key: "itm_SecThreatLvls_dwr3",
                            text: "IMMINENT"
                        },
                        {
                            key: "itm_SecThreatLvls_dwr4",
                            text: "1"
                        },
                        {
                            key: "itm_SecThreatLvls_dwr5",
                            text: "2"
                        },
                        {
                            key: "itm_SecThreatLvls_dwr6",
                            text: "3"
                        },
                        {
                            key: "itm_SecThreatLvls_dwr7",
                            text: "4"
                        }


                    ],
                    //#endregion

                    //#region Clifton Court

                    val_CliftCourt1_intake: "",
                    lst_CliftCourt1_intake: [
                        {
                            key: "itm_CliftCourt1_intake1",
                            text: "1"
                        },
                        {
                            key: "itm_CliftCourt1_intake2",
                            text: "2"
                        },
                        {
                            key: "itm_CliftCourt1_intake3",
                            text: "3"
                        },
                    ],
                    val_CliftCourt_PrevDayDivAllot: "",
                    val_CliftCourt_Dif: "",
                    val_CliftCourt_PrevSchAllot: "",
                    val_CliftCourt_af: "",
                    val_CliftCourt5_gate: "",
                    lst_CliftCourt5_gate: [
                        {
                            key: "itm_CliftCourt5_gate1",
                            text: "OPEN"
                        },
                        {
                            key: "itm_CliftCourt5_gate2",
                            text: "CLOSED"
                        },
                        {
                            key: "itm_CliftCourt5_gate3",
                            text: "OPENED"
                        }
                    ],
                    val_CliftCourt_elev: "",
                    val_CliftCourt_storaf: "",
                    //#endregion

                    //#region Power Source
                    val_PwrSource_OM: "",
                    lst_PwrSource_OM: [
                        {
                            key: "itm_PwrSource_OM1",
                            text: "BAPP"
                        },
                        {
                            key: "itm_PwrSource_OM2",
                            text: "SEG"
                        },
                    ],

                    val_PwrSource_FishFac: "",
                    lst_PwrSource_FishFac: [
                        {
                            key: "itm_PwrSource_FishFac1",
                            text: "BAPP"
                        },
                        {
                            key: "itm_PwrSource_FishFac2",
                            text: "PGAE"
                        },
                    ],
                    val_PwrSource_remarks: "",

                    //#endregion

                    //#region Fish Facility - Weeds/Debris Removed

                    val_fisfac_primchnl: "",
                    val_fisfac_secdchnl: "",
                    val_fisfac_holdtnks: "",
                    val_fisfac_byHarvstr: "",

                    //#endregion

                    //#region BAPP
                    val_Bapp_CtrlIn: "",
                    lst_Bapp_CtrlIn: [
                        {
                            key: "itm_app_CtrlIn1",
                            text: "DFD"
                        },
                        {
                            key: "itm_app_CtrlIn2",
                            text: "POC"
                        },
                    ],
                    val_bapp_pumped: "",
                    val_bapp_on: "",
                    val_bapp_rmrks: "",

                    //#endregion

                    //#region SBPP
                    val_sbpp_rmrks: "",
                    val_sbpp_aquedBlend: "",
                    val_sbpp_dvRes: "",
                    val_sbpp_bethRes: "",
                    val_sbpp_storageaf: "",
                    //#endregion

                    //#region Contractor Turnout Total Flows
                    val_ContTurn_alamedaCoun: "",
                    val_ContTurn_santaClara: "",
                    val_ContTurn_Zone7: "",
                    //#endregion

                    //#region SBPP Aqueduct(Cont)
                    val_sbpp_AquContRmrks: "",
                    //#endregion

                    //#region DVPP

                    val_dvpp_lake: "",
                    val_dvpp_storage: "",
                    val_dvpp_intoRes: "",
                    val_dvpp_arrMtr: "",
                    val_dvpp_relIntoAqu: "",
                    val_dvpp_floodRel: "",
                    valCheck_dvpp_tier1: "",
                    valCheck_dvpp_tier2: "",
                    valCheck_dvpp_tier3: "",
                    valCheck_dvpp_tier4: "",
                    valCheck_dvpp_tier5: "",
                    val_dvpp_emerGates: "",
                    lst_dvpp_emerGates: [
                        {
                            key: "itm_dvpp_emerGates1",
                            text: "OPEN"
                        },
                        {
                            key: "itm_dvpp_emerGates2",
                            text: "CLOSED"
                        }
                    ],
                    val_dvpp_regGates: "",
                    lst_dvpp_regGates: [
                        {
                            key: "itm_dvpp_RegGates1",
                            text: "OPEN"
                        },
                        {
                            key: "itm_dvpp_RegGates2",
                            text: "CLOSED"
                        }
                    ],
                    val_dvpp_rmrks: "",

                    //#endregion

                    //#region North Bay

                    val_northBay_bsppRmrks: "",
                    val_northBay_crppRmrks: "",
                    val_northBay_fairfield: "",
                    val_northBay_travis: "",
                    val_northBay_montezuma: "",
                    lst_northBay_montezuma: [
                        {
                            key: "itm_northBay_montezuma1",
                            text: "OPEN"
                        },
                        {
                            key: "itm_northBay_montezuma2",
                            text: "CLOSED"
                        },
                    ],
                    val_northBay_operating: "",
                    val_northBay_boatlock: "",
                    lst_northBay_boatlock: [
                        {
                            key: "itm_northBay_boatlock1",
                            text: "YES"
                        },
                        {
                            key: "itm_northBay_boatlock2",
                            text: "NO"
                        },
                    ],
                    val_northBay_dateSrvc: "",
                    val_northBay_flashBoards: "",
                    lst_northBay_flashBoards: [
                        {
                            key: "itm_northBay_flashBoards1",
                            text: "INSTALLED"
                        },
                        {
                            key: "itm_northBay_flashBoards2",
                            text: "REMOVED"
                        },
                    ],
                    val_northBay_date: "",
                    val_northbay_rmrks: "",

                    //#endregion

                    //#region NorthBayCont

                    valCheck_northBayCont_roar1: "",
                    valCheck_northBayCont_roar2: "",
                    valCheck_northBayCont_roar3: "",
                    valCheck_northBayCont_roar4: "",
                    valCheck_northBayCont_roar5: "",
                    valCheck_northBayCont_roar6: "",
                    valCheck_northBayCont_roar7: "",
                    valCheck_northBayCont_roar8: "",
                    valTxt_northBayCont_rmrks: "",

                    //#endregion

                    //#region Delta Water Ways

                    val_deltawtr_rockBarrRmrks: "",
                    val_deltawtr_midRiverRmrks: "",

                    //#endregion

                    //#region Delta Water Ways(Cont)

                    val_deltaWtrCont_Headrmrks: "",
                    val_deltaWtrCont_Oldrmrks: "",
                    val_deltaWtrCont_GrantLinermrks: "",

                    //#endregion

                    //#region wcd_table
                    val_wcd_table: "",
                    val_plntt: "",

                    //#endregion
                    val_pmtDate: ""
                }
                var oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.setData(null);
                oJSONModel.setData(oJSON);
                var oView = this.getView("delta");
                oView.setModel(oJSONModel);

                //var i18Bundle = oView.getModel("i18n").getResourceBundle();
                //var servOk = "";

                var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "yyyyMMdd"
                });
                var oDateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "M/d/yy"
                });
                //var today = new Date();
                var todayRmrk = oDateFormat.format(new Date());
                var today = oDateFormat1.format(new Date());
                var todayOn = new Date();


                var object;
                object = this.getView("delta").byId("ipt_CliftCourt6_elevation");
                var decAll = 0;
                decAll = this.getDecAll(object)
                this.addEvent(object, "ipt_CliftCourt6_elevation", "val_CliftCourt_elev", decAll);

                decAll = 0;
                object = "";
                object = this.getView("delta").byId("ipt_sbpp_BethRes");
                decAll = this.getDecAll(object)
                this.addEvent(object, "ipt_sbpp_BethRes", "val_sbpp_bethRes", decAll);

                decAll = 0;
                object = "";
                object = this.getView("delta").byId("ipt_ContTurn_AlCount");
                decAll = this.getDecAll(object)
                this.addEvent(object, "ipt_ContTurn_AlCount", "val_ContTurn_alamedaCoun", decAll);

                decAll = 0;
                object = "";
                object = this.getView("delta").byId("ipt_ContTurn_StaClara");
                decAll = this.getDecAll(object)
                this.addEvent(object, "ipt_ContTurn_StaClara", "val_ContTurn_santaClara", decAll);

                decAll = 0;
                object = "";
                object = this.getView("delta").byId("ipt_ContTurn_Zone7");
                decAll = this.getDecAll(object)
                this.addEvent(object, "ipt_ContTurn_Zone7", "val_ContTurn_Zone7", decAll);

                decAll = 0;
                object = "";
                object = this.getView("delta").byId("ipt_DvppLake");
                decAll = this.getDecAll(object)
                this.addEvent(object, "ipt_DvppLake", "val_dvpp_lake", decAll);

                decAll = 0;
                object = "";
                object = this.getView("delta").byId("ipt_NthBayFairfld");
                decAll = this.getDecAll(object)
                this.addEvent(object, "ipt_NthBayFairfld", "val_northBay_fairfield", decAll);

                decAll = 0;
                object = "";
                object = this.getView("delta").byId("ipt_NthBayTrav");
                decAll = this.getDecAll(object)
                this.addEvent(object, "ipt_NthBayTrav", "val_northBay_travis", decAll);



                todayOn.setDate(todayOn.getDate() - 1);
                var todayOnSub = oDateFormat.format(todayOn);
                todayOn = oDateFormat1.format(todayOn);


                //var year = today.getFullYear().toString();
                //year = year.substring(2, 4);
                //var today1 = (today.getMonth() + 1) + '/' + (today.getDate() + '/' + (year));
                //Se puede obtener el objeto que necesitamos modificar por medio del id del mismo objeto
                //this.getView("delta").byId("lbl_hddate").setText(today);
                //#endregion objetos Cabecera
                oJSONModel.setData(oJSON);
                //oView.setModel(oJSONModel);
                //#endregion JSON

                //#region Odata Services Consumption
                var view = this.getView("delta");
                // var model = view.getModel();
                var model = oJSONModel;
                var RmrksData = "";
                // /sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/USER_ADDRSet

                //#region User
                var serviceUsrUrl = "/sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/";
                var UsrModel = new sap.ui.model.odata.ODataModel(serviceUsrUrl, true);
                if (!(typeof UsrModel === "undefined") || !(typeof UsrModel === "null")) {
                    //Esto sirve para saber si una variables ya esta definida

                    UsrModel.read("/USER_ADDRSet", {
                        //urlParameters: {
                        //  "$top" : 1
                        //},
                        success: function (oData, oResponse) {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            var UsrData = oData;
                            var UsrResp = oResponse;


                            //#region WcdByDivision
                            var servicetbl1Url = "/sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/";
                            var Tbl1Model = new sap.ui.model.odata.ODataModel(servicetbl1Url, true);
                            var Tbl1Data = "";
                            if (!(typeof Tbl1Model === "undefined") || !(typeof Tbl1Model === "null")) {
                                //Esto sirve para saber si una variables ya esta definida
                                Tbl1Model.read("/WcdByDivision", {
                                    urlParameters: {
                                        "Div": "'WRDT'"
                                        //"$top" : 1
                                    },
                                    success: function (oData, oResponse) {
                                        //alert(oData.results[0].Accm);
                                        //alert(oResponse);
                                        Tbl1Data = oData;
                                        var Tbl1Resp = oResponse;
                                        //model.setProperty("/val_opname",UsrData.results[0].NameTextc);

                                        //#region UnitStatDivision
                                        var servicetbl2Url = "/sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/";
                                        var Tbl2Model = new sap.ui.model.odata.ODataModel(servicetbl2Url, true);
                                        if (!(typeof Tbl2Model === "undefined") || !(typeof Tbl2Model === "null")) {
                                            //Esto sirve para saber si una variables ya esta definida
                                            Tbl2Model.read("/UnitStatDivision", {
                                                urlParameters: {
                                                    "Divis": "'WRDT'"
                                                    //"$top" : 1
                                                },
                                                success: function (oData, oResponse) {
                                                    //alert(oData.results[0].Accm);
                                                    //alert(oResponse);
                                                    var Tbl2Data = oData;
                                                    var Tbl2Resp = oResponse;
                                                    //model.setProperty("/val_opname",UsrData.results[0].NameTextc);

                                                    //#region Remarks
                                                    // /sap/opu/odata/sap/ZODATA_MC_WRDTREM_DT_SRV/ZWCM_MC_WRDT_REMARKSSet
                                                    //var serviceRmrksUrl = "/sap/opu/odata/sap/ZODATA_MC_WRDTREM_DT_SRV/";  
                                                    var serviceRmrksUrl = "/sap/opu/odata/sap/ZODATA_MC_MULTDIV_REMARK_OPLOG_SRV/";
                                                    var RmrksModel = new sap.ui.model.odata.ODataModel(serviceRmrksUrl, true);
                                                    if (!(typeof RmrksModel === "undefined") || !(typeof RmrksModel === "null")) {
                                                        //Esto sirve para saber si una variables ya esta definida
                                                        //RmrksModel.read("/ZWCM_MC_WRDT_REMARKSSet", {
                                                        RmrksModel.read("/Delta", {
                                                            urlParameters: {
                                                                "Deltadate": dataModelMain.oData.valParamDate
                                                                //"$top" : 1
                                                            },
                                                            success: function (oData, oResponse) {
                                                                //alert(oData.results[0].Accm);
                                                                //alert(oResponse);
                                                                RmrksData = oData;
                                                                var RmrksResp = oResponse;
                                                                //model.setProperty("/val_opname",UsrData.results[0].NameTextc);

                                                                //#region ZWCM_MC_WRDTSet
                                                                //var sserviceurl = "/sap/opu/odata/sap/ZODATA_MC_WRDT_C_SRV/";
                                                                var sserviceurl = "/sap/opu/odata/sap/ZODATA_MC_MULTDIV_OPLOG_SRV/";
                                                                var oModel = new sap.ui.model.odata.ODataModel(sserviceurl, true);
                                                                if (!(typeof oModel === "undefined") || !(typeof oModel === "null")) {
                                                                    //Esto sirve para saber si una variables ya esta definida
                                                                    var OjsonModel = new sap.ui.model.json.JSONModel();
                                                                    // oModel.read("/ZWCM_MC_WRDTSet/",null,null,true,function(oDAta,response){
                                                                    //oModel.read("/ZWCM_MC_WRDTSet/?$top=1",null,null,true,function(oDAta,response){
                                                                    //  OjsonModel.setData(oData);
                                                                    //});
                                                                    //var data = "";

                                                                    //oModel.read("/ZWCM_MC_WRDTSet", {
                                                                    oModel.read("/Delta", {
                                                                        urlParameters: {
                                                                            "Deltadate": dataModelMain.oData.valParamDate
                                                                        },
                                                                        success: function (oData, oResponse) {
                                                                            //alert(oData.results[0].Accm);
                                                                            //alert(oResponse);
                                                                            var data = oData;
                                                                            var resp = oResponse;
                                                                            //servOk = "X";
                                                                            var ctrllr = oView.getController();
                                                                            var obj = "";
                                                                            var date = dataModelMain.oData.valNoLogDate;
                                                                            //var Ctrller = sap.ui.getCore().byId("delta").getController();
                                                                            // create JSON model

                                                                            //******************//OPLOG LOGIC******************

                                                                            var opLogData = "";
                                                                            var sserviceurl = "/sap/opu/odata/sap/ZODATA_MC_MULTDIV_TABLE_OPLOG_SRV/";
                                                                            var oModel = new sap.ui.model.odata.ODataModel(sserviceurl, true);
                                                                            if (!(typeof oModel === "undefined") || !(typeof oModel === "null")) {
                                                                                //Esto sirve para saber si una variables ya esta definida
                                                                                var OjsonModel = new sap.ui.model.json.JSONModel();
                                                                                // oModel.read("/ZWCM_MC_WRDTSet/",null,null,true,function(oDAta,response){
                                                                                //oModel.read("/ZWCM_MC_WRDTSet/?$top=1",null,null,true,function(oDAta,response){
                                                                                //  OjsonModel.setData(oData);
                                                                                //});
                                                                                //var data = "";

                                                                                //oModel.read("/ZWCM_MC_WRDTSet", {
                                                                                oModel.read("/TableZoplog", {
                                                                                    urlParameters: {
                                                                                        "Date": dataModelMain.oData.valParamDate,
                                                                                        "Division": "'WRDT'",
                                                                                        "Plant": "''"
                                                                                    },
                                                                                    success: function (oDataOp, oResponse) {
                                                                                        //alert(oData.results[0].Accm);
                                                                                        //alert(oResponse);
                                                                                        var dataop = oDataOp;
                                                                                        var resp = oResponse;
                                                                                        //servOk = "X";
                                                                                        var ctrllr = oView.getController();
                                                                                        var obj = "";
                                                                                        var date = dataModelMain.oData.valNoLogDate;
                                                                                        //var Ctrller = sap.ui.getCore().byId("delta").getController();
                                                                                        // create JSON model
                                                                                        if (dataop.results.length === 0) {
                                                                                            sap.ui.core.BusyIndicator.hide();
                                                                                            MessageBox.warning("No Log found.\n\r" +
                                                                                                "Please check the date " + date);
                                                                                        }
                                                                                        else {
                                                                                            var formResult = dataop.results;
                                                                                            for (let index = 0; index < dataop.results.length; index++) {

                                                                                                var val = dataop.results[index].Text;
                                                                                                val = val.replace(/["¬"]/g, " ");
                                                                                                formResult[index].Text = val;
                                                                                                val = "";

                                                                                            }


                                                                                        }
                                                                                        opLogData = formResult;
                                                                                        //******************//OPLOG LOGIC******************






                                                                                        if (data.results.length === 0) {
                                                                                            sap.ui.core.BusyIndicator.hide();
                                                                                            MessageBox.warning("No Log found.\n\r" +
                                                                                                "Please check the date " + date);
                                                                                            Oview.byId("chk_DvppTier1").setSelected(false);
                                                                                            Oview.byId("chk_DvppTier2").setSelected(false);
                                                                                            Oview.byId("chk_DvppTier3").setSelected(false);
                                                                                            Oview.byId("chk_DvppTier4").setSelected(false);
                                                                                            Oview.byId("chk_DvppTier5").setSelected(false);

                                                                                        }
                                                                                        else {







                                                                                            //if (data.results[0].Mcdate === oDateFormat.format(new Date())) {
                                                                                            // if ("DUMMY" === oDateFormat.format(new Date())) {
                                                                                            //var btnSb = oView.byId("btn_Submit");
                                                                                            //btnSb.setEnabled(false);
                                                                                            //MessageBox.warning("This form has been successfully submitted.\n\r" +
                                                                                            //    "No other midnight condition report for this date may be created or submitted");
                                                                                            //model.setProperty("/valSubmitted", "This form has been submitted")

                                                                                            //}
                                                                                            //#region SETDATA
                                                                                            var oODataJSONModel = new sap.ui.model.json.JSONModel();
                                                                                            var logDate = oData.results[0].Mcdate.substring(4, 6) + "/" + oData.results[0].Mcdate.substring(6, 8) + "/" + oData.results[0].Mcdate.substring(0, 4);
                                                                                            model.setProperty("/val_mandt", oData.results[0].Mandt);
                                                                                            //model.setProperty("/val_opname", UsrData.results[0].NameTextc);
                                                                                            model.setProperty("/val_opname", oData.results[0].Uname);
                                                                                            model.setProperty("/val_DbOpname", UsrData.results[0].Bname);
                                                                                            //model.setProperty("/val_date", today);
                                                                                            model.setProperty("/val_date", oData.results[0].Date);
                                                                                            model.setProperty("/val_dateRmrk", todayRmrk);
                                                                                            model.setProperty("/val_OnDateSub", todayOnSub);
                                                                                            model.setProperty("/val_log_table", opLogData);//OPLOG
                                                                                            oView.byId("lbl_hddate").setText(logDate);



                                                                                            //#region Jurisdiction and Control
                                                                                            switch (oData.results[0].Cacin) {
                                                                                                case "DFD":
                                                                                                    model.setProperty("/itm_selAquedCtrl", "itm_AquedCtrl_1");
                                                                                                    break;
                                                                                                case "POC":
                                                                                                    model.setProperty("/itm_selAquedCtrl", "itm_AquedCtrl_2");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/itm_selAquedCtrl", "");
                                                                                                    break;
                                                                                            }
                                                                                            switch (oData.results[0].Ccgcin) {
                                                                                                case "DFD":
                                                                                                    model.setProperty("/itm_sel_CliGteCtr", "itm_CliGteCtr_1");
                                                                                                    break;
                                                                                                case "POC":
                                                                                                    model.setProperty("/itm_sel_CliGteCtr", "itm_CliGteCtr_2");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/itm_sel_CliGteCtr", "");
                                                                                                    break;
                                                                                            }
                                                                                            switch (oData.results[0].Scada) {
                                                                                                case "PCA":
                                                                                                    model.setProperty("/itm_selscaHost", "itm_scaHost_1");
                                                                                                    break;
                                                                                                case "PCB":
                                                                                                    model.setProperty("/itm_selscaHost", "itm_scaHost_2");
                                                                                                    break;
                                                                                                case "FB":
                                                                                                    model.setProperty("/itm_selscaHost", "itm_scaHost_3");
                                                                                                    break;
                                                                                                case "CB":
                                                                                                    model.setProperty("/itm_selscaHost", "itm_scaHost_4");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/itm_selscaHost", "");
                                                                                                    break;
                                                                                            }

                                                                                            //#endregion Jurisdiction and Control

                                                                                            //#region Security Threat Levels
                                                                                            var iconSec = oView.byId("SecThr_color");
                                                                                            var iconDWR = oView.byId("SecDwr_color");
                                                                                            switch (oData.results[0].Natsec) {
                                                                                                case "NORMAL":
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "itm_SecThreatLvls_nat1");

                                                                                                    iconSec.setBackgroundColor("green");
                                                                                                    iconSec.setColor("green");
                                                                                                    //var lbl = view.byId("lbl_SecThreatLvls_color");
                                                                                                    //lbl.addStyleClass("cbx_green");
                                                                                                    break;
                                                                                                case "ELEVATED":
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "itm_SecThreatLvls_nat2");
                                                                                                    iconSec.setBackgroundColor("orange");
                                                                                                    iconSec.setColor("orange");
                                                                                                    //var lbl = view.byId("lbl_SecThreatLvls_color");
                                                                                                    //lbl.addStyleClass("cbx_orange");
                                                                                                    break;
                                                                                                case "IMMINENT":
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "itm_SecThreatLvls_nat3");
                                                                                                    iconSec.setBackgroundColor("red");
                                                                                                    iconSec.setColor("red");
                                                                                                    //var lbl = view.byId("lbl_SecThreatLvls_color");
                                                                                                    //lbl.addStyleClass("cbx_red");
                                                                                                    break;
                                                                                                case "GREEN":
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "itm_SecThreatLvls_nat4");
                                                                                                    iconSec.setBackgroundColor("");
                                                                                                    iconSec.setColor("");
                                                                                                    //var lbl = view.byId("lbl_SecThreatLvls_color");
                                                                                                    //lbl.addStyleClass("cbx_red");
                                                                                                    break;
                                                                                                case "BLUE":
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "itm_SecThreatLvls_nat5");
                                                                                                    iconSec.setBackgroundColor("");
                                                                                                    iconSec.setColor("");
                                                                                                    break;
                                                                                                case "YELLOW":
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "itm_SecThreatLvls_nat6");
                                                                                                    iconSec.setBackgroundColor("");
                                                                                                    iconSec.setColor("");
                                                                                                    break;
                                                                                                case "ORANGE":
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "itm_SecThreatLvls_nat7");
                                                                                                    iconSec.setBackgroundColor("");
                                                                                                    iconSec.setColor("");
                                                                                                    break;
                                                                                                case "RED":
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "itm_SecThreatLvls_nat8");
                                                                                                    iconSec.setBackgroundColor("");
                                                                                                    iconSec.setColor("");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "");
                                                                                                    iconSec.setBackgroundColor("");
                                                                                                    iconSec.setColor("");

                                                                                                    break;
                                                                                            }



                                                                                            switch (oData.results[0].Dwrsec) {
                                                                                                case "NORMAL":
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "itm_SecThreatLvls_dwr1");
                                                                                                    iconDWR.setBackgroundColor("green");
                                                                                                    iconDWR.setColor("green");
                                                                                                    //var lbl = view.byId("lbl_SecThreatLvls_dwr_color");
                                                                                                    //lbl.addStyleClass("cbx_green");
                                                                                                    break;
                                                                                                case "ELEVATED":
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "itm_SecThreatLvls_dwr2");
                                                                                                    iconDWR.setBackgroundColor("orange");
                                                                                                    iconDWR.setColor("orange");
                                                                                                    //var lbl = view.byId("lbl_SecThreatLvls_dwr_color");
                                                                                                    //lbl.addStyleClass("cbx_orange");
                                                                                                    break;
                                                                                                case "IMMINENT":
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "itm_SecThreatLvls_dwr3");
                                                                                                    iconDWR.setBackgroundColor("red");
                                                                                                    iconDWR.setColor("red");
                                                                                                    //var lbl = view.byId("lbl_SecThreatLvls_dwr_color");
                                                                                                    //lbl.addStyleClass("cbx_red");
                                                                                                    break;
                                                                                                case "1":
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "itm_SecThreatLvls_dwr4");
                                                                                                    iconDWR.setBackgroundColor("");
                                                                                                    iconDWR.setColor("");
                                                                                                    break;
                                                                                                case "2":
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "itm_SecThreatLvls_dwr5");
                                                                                                    iconDWR.setBackgroundColor("");
                                                                                                    iconDWR.setColor("");
                                                                                                    break;
                                                                                                case "3":
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "itm_SecThreatLvls_dwr6");
                                                                                                    iconDWR.setBackgroundColor("");
                                                                                                    iconDWR.setColor("");
                                                                                                    break;
                                                                                                case "4":
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "itm_SecThreatLvls_dwr7");
                                                                                                    iconDWR.setBackgroundColor("");
                                                                                                    iconDWR.setColor("");
                                                                                                    break;

                                                                                                default:
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "");
                                                                                                    iconDWR.setBackgroundColor("");
                                                                                                    iconDWR.setColor("");
                                                                                                    break;
                                                                                            }

                                                                                            //#endregion Security Threat Levels.

                                                                                            //#region Clifton Court
                                                                                            switch (oData.results[0].Ccip) {
                                                                                                case "1":
                                                                                                    model.setProperty("/val_CliftCourt1_intake", "itm_CliftCourt1_intake1");
                                                                                                    break;
                                                                                                case "2":
                                                                                                    model.setProperty("/val_CliftCourt1_intake", "itm_CliftCourt1_intake2");
                                                                                                    break;
                                                                                                case "3":
                                                                                                    model.setProperty("/val_CliftCourt1_intake", "itm_CliftCourt1_intake3");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/val_CliftCourt1_intake", "");
                                                                                                    break;
                                                                                            }
                                                                                            //model.setProperty("/val_CliftCourt_PrevDayDivAllot", oData.results[0].Cca);
                                                                                            obj = oView.byId("ipt_CliftCourt2_PrevDay_DA");
                                                                                            model.setProperty("/val_CliftCourt_PrevDayDivAllot", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, obj.data().sign, oData.results[0].Cca));

                                                                                            obj = oView.byId("ipt_CliftCourt3_dif");
                                                                                            model.setProperty("/val_CliftCourt_Dif", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, obj.data().sign, oData.results[0].Ccdif));
                                                                                            //model.setProperty("/val_CliftCourt_Dif", oData.results[0].Ccdif);

                                                                                            obj = oView.byId("ipt_CliftCourt4_PrevDay_SA");
                                                                                            model.setProperty("/val_CliftCourt_PrevSchAllot", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Ccmcfsw));
                                                                                            //model.setProperty("/val_CliftCourt_PrevSchAllot", oData.results[0].Ccmcfsw);

                                                                                            obj = oView.byId("ipt_CliftCourt_PrevDay_SAAf");
                                                                                            model.setProperty("/val_CliftCourt_af", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, obj.data().sign, oData.results[0].Ccaw));
                                                                                            //model.setProperty("/val_CliftCourt_af", oData.results[0].Ccaw);

                                                                                            switch (oData.results[0].Gsamn) {
                                                                                                case "OPEN":
                                                                                                    model.setProperty("/val_CliftCourt5_gate", "itm_CliftCourt5_gate1");
                                                                                                    break;
                                                                                                case "CLOSED":
                                                                                                    model.setProperty("/val_CliftCourt5_gate", "itm_CliftCourt5_gate2");
                                                                                                    break;
                                                                                                case "OPENED":
                                                                                                    model.setProperty("/val_CliftCourt5_gate", "itm_CliftCourt5_gate3");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/val_CliftCourt5_gate", "");
                                                                                                    break;
                                                                                            }

                                                                                            obj = oView.byId("ipt_CliftCourt6_elevation");
                                                                                            model.setProperty("/val_CliftCourt_elev", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, obj.data().sign, oData.results[0].Ccffe));
                                                                                            //model.setProperty("/val_CliftCourt_elev", oData.results[0].Ccffe);

                                                                                            obj = oView.byId("ipt_CliftCourt6_1Storage");
                                                                                            model.setProperty("/val_CliftCourt_storaf", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Ccf));
                                                                                            //model.setProperty("/val_CliftCourt_storaf", oData.results[0].Ccf);



                                                                                            //#endregion Clifton Court

                                                                                            //#region Power Source
                                                                                            switch (oData.results[0].Mon) {
                                                                                                case "BAPP":
                                                                                                    model.setProperty("/val_PwrSource_OM", "itm_PwrSource_OM1");
                                                                                                    break;
                                                                                                case "SEG":
                                                                                                    model.setProperty("/val_PwrSource_OM", "itm_PwrSource_OM2");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/val_PwrSource_OM", "");
                                                                                                    break;
                                                                                            }
                                                                                            switch (oData.results[0].Ffon) {
                                                                                                case "BAPP":
                                                                                                    model.setProperty("/val_PwrSource_FishFac", "itm_PwrSource_FishFac1");
                                                                                                    break;
                                                                                                case "PGAE":
                                                                                                    model.setProperty("/val_PwrSource_FishFac", "itm_PwrSource_FishFac2");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/val_PwrSource_FishFac", "");
                                                                                                    break;
                                                                                            }
                                                                                            model.setProperty("/val_PwrSource_remarks", RmrksData.results[0].Remarkffo);



                                                                                            //#endregion

                                                                                            //#region  Fish Facility/Weeds&Debris removed
                                                                                            obj = oView.byId("ipt_FishFac_PrimCh");
                                                                                            model.setProperty("/val_fisfac_primchnl", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Wdrfpc));
                                                                                            //model.setProperty("/val_fisfac_primchnl", oData.results[0].Wdrfpc);

                                                                                            obj = oView.byId("ipt_FishFac_SecCh");
                                                                                            model.setProperty("/val_fisfac_secdchnl", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Wdrfsc));
                                                                                            //model.setProperty("/val_fisfac_secdchnl", oData.results[0].Wdrfsc);

                                                                                            obj = oView.byId("ipt_FishFac_holdtnks");
                                                                                            model.setProperty("/val_fisfac_holdtnks", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Wdrfpht));
                                                                                            //model.setProperty("/val_fisfac_holdtnks", oData.results[0].Wdrfpht);

                                                                                            obj = oView.byId("ipt_FishFac_ByHvstr");
                                                                                            model.setProperty("/val_fisfac_byHarvstr", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Wdrfbh));
                                                                                            //model.setProperty("/val_fisfac_byHarvstr", oData.results[0].Wdrfbh);
                                                                                            //#endregion

                                                                                            //#region BAPP
                                                                                            switch (oData.results[0].Bci) {
                                                                                                case "DFD":
                                                                                                    model.setProperty("/val_Bapp_CtrlIn", "itm_app_CtrlIn1");
                                                                                                    break;
                                                                                                case "POC":
                                                                                                    model.setProperty("/val_Bapp_CtrlIn", "itm_app_CtrlIn2");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/val_Bapp_CtrlIn", "");
                                                                                                    break;
                                                                                            }

                                                                                            obj = oView.byId("ipt_Bapp_pumpd");
                                                                                            model.setProperty("/val_bapp_pumped", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Bappd));
                                                                                            //model.setProperty("/val_bapp_pumped", oData.results[0].Bappd);

                                                                                            model.setProperty("/val_bapp_on", oData.results[0].Bpon.substring(4, 6) + "/" + oData.results[0].Bpon.substring(6, 8) + "/" + oData.results[0].Bpon.substring(0, 4));//OPLOG DATE


                                                                                            model.setProperty("/val_bapp_rmrks", RmrksData.results[0].Remarkpscne);
                                                                                            //#endregion

                                                                                            //#region SBPP
                                                                                            //
                                                                                            model.setProperty("/val_sbpp_rmrks", RmrksData.results[0].Remarksbpp);

                                                                                            obj = oView.byId("ipt_sbpp_aqbld");
                                                                                            model.setProperty("/val_sbpp_aquedBlend", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Sbab));
                                                                                            //model.setProperty("/val_sbpp_aquedBlend", oData.results[0].Sbab);

                                                                                            obj = oView.byId("ipt_sbpp_DVRes");
                                                                                            model.setProperty("/val_sbpp_dvRes", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Sbabd));
                                                                                            //model.setProperty("/val_sbpp_dvRes", oData.results[0].Sbabd);

                                                                                            obj = oView.byId("ipt_sbpp_BethRes");
                                                                                            model.setProperty("/val_sbpp_bethRes", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Bfte));
                                                                                            //model.setProperty("/val_sbpp_bethRes", oData.results[0].Bfte);

                                                                                            obj = oView.byId("ipt_sbpp_strge");
                                                                                            model.setProperty("/val_sbpp_storageaf", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Betres));
                                                                                            //model.setProperty("/val_sbpp_storageaf", oData.results[0].Betres);

                                                                                            //#endregion

                                                                                            //#region Contractor Turnout Total Flows
                                                                                            obj = oView.byId("ipt_ContTurn_AlCount");
                                                                                            model.setProperty("/val_ContTurn_alamedaCoun", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Acttf));
                                                                                            //model.setProperty("/val_ContTurn_alamedaCoun", oData.results[0].Acttf);

                                                                                            obj = oView.byId("ipt_ContTurn_StaClara");
                                                                                            model.setProperty("/val_ContTurn_santaClara", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Sccttf));
                                                                                            //model.setProperty("/val_ContTurn_santaClara", oData.results[0].Sccttf);

                                                                                            obj = oView.byId("ipt_ContTurn_Zone7");
                                                                                            model.setProperty("/val_ContTurn_Zone7", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Zsttf));
                                                                                            //model.setProperty("/val_ContTurn_Zone7", oData.results[0].Zsttf);

                                                                                            //#endregion

                                                                                            //#region SBPP Aqueduct(Cont)
                                                                                            model.setProperty("/val_sbpp_AquContRmrks", RmrksData.results[0].Remarkz7);

                                                                                            //#endregion

                                                                                            //#region DVPP
                                                                                            obj = oView.byId("ipt_DvppLake");
                                                                                            model.setProperty("/val_dvpp_lake", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Ldveft));
                                                                                            //model.setProperty("/val_dvpp_lake", oData.results[0].Ldveft);

                                                                                            obj = oView.byId("ipt_DvppStorg");
                                                                                            model.setProperty("/val_dvpp_storage", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Ldveftf));
                                                                                            //model.setProperty("/val_dvpp_storage", oData.results[0].Ldveft);

                                                                                            obj = oView.byId("ipt_DvppInRes");
                                                                                            model.setProperty("/val_dvpp_intoRes", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Dvppir));
                                                                                            //model.setProperty("/val_dvpp_intoRes", oData.results[0].Dvppir);

                                                                                            obj = oView.byId("ipt_DvppArrMtr");
                                                                                            model.setProperty("/val_dvpp_arrMtr", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Accm));
                                                                                            //model.setProperty("/val_dvpp_arrMtr", oData.results[0].Accm);

                                                                                            obj = oView.byId("ipt_DvppRelInAq");
                                                                                            model.setProperty("/val_dvpp_relIntoAqu", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Devria));
                                                                                            //model.setProperty("/val_dvpp_relIntoAqu", oData.results[0].Devria);

                                                                                            obj = oView.byId("ipt_DvppFloorRel");
                                                                                            model.setProperty("/val_dvpp_floodRel", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Flre));
                                                                                            //model.setProperty("/val_dvpp_floodRel", oData.results[0].Flre);


                                                                                            if (oData.results[0].Tvop1 === "1") {
                                                                                                view.byId("chk_DvppTier1").setSelected(true);
                                                                                                model.setProperty("/valCheck_dvpp_tier1", "1");
                                                                                            }
                                                                                            else {
                                                                                                view.byId("chk_DvppTier1").setSelected(false);
                                                                                                model.setProperty("/valCheck_dvpp_tier1", "");
                                                                                            }
                                                                                            if (oData.results[0].Tvop2 === "1") {
                                                                                                view.byId("chk_DvppTier2").setSelected(true);
                                                                                                model.setProperty("/valCheck_dvpp_tier2", "1");
                                                                                            }
                                                                                            else {
                                                                                                view.byId("chk_DvppTier2").setSelected(false);
                                                                                                model.setProperty("/valCheck_dvpp_tier", "2");
                                                                                            }
                                                                                            if (oData.results[0].Tvop3 === "1") {
                                                                                                view.byId("chk_DvppTier3").setSelected(true);
                                                                                                model.setProperty("/valCheck_dvpp_tier3", "1");
                                                                                            }
                                                                                            else {
                                                                                                view.byId("chk_DvppTier3").setSelected(false);
                                                                                                model.setProperty("/valCheck_dvpp_tier3", "");
                                                                                            }
                                                                                            if (oData.results[0].Tvop4 === "1") {
                                                                                                view.byId("chk_DvppTier4").setSelected(true);
                                                                                                model.setProperty("/valCheck_dvpp_tier4", "1");
                                                                                            }
                                                                                            else {
                                                                                                view.byId("chk_DvppTier4").setSelected(false);
                                                                                                model.setProperty("/valCheck_dvpp_tier4", "");
                                                                                            }
                                                                                            if (oData.results[0].Tvop5 === "1") {
                                                                                                view.byId("chk_DvppTier5").setSelected(true);
                                                                                                model.setProperty("/valCheck_dvpp_tier5", "1");
                                                                                            }
                                                                                            else {
                                                                                                view.byId("chk_DvppTier5").setSelected(false);
                                                                                                model.setProperty("/valCheck_dvpp_tier5", "");
                                                                                            }
                                                                                            switch (oData.results[0].Emgates) {
                                                                                                case "OPEN":
                                                                                                    model.setProperty("/val_dvpp_emerGates", "itm_dvpp_emerGates1");
                                                                                                    break;
                                                                                                case "CLOSED":
                                                                                                    model.setProperty("/val_dvpp_emerGates", "itm_dvpp_emerGates2");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/val_dvpp_emerGates", "");
                                                                                                    break;
                                                                                            }
                                                                                            switch (oData.results[0].Rgates) {
                                                                                                case "OPEN":
                                                                                                    model.setProperty("/val_dvpp_regGates", "itm_dvpp_RegGates1");
                                                                                                    break;
                                                                                                case "CLOSED":
                                                                                                    model.setProperty("/val_dvpp_regGates", "itm_dvpp_RegGates2");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/val_dvpp_regGates", "");
                                                                                                    break;
                                                                                            }
                                                                                            model.setProperty("/val_dvpp_rmrks", RmrksData.results[0].Remarkd);
                                                                                            //#endregion

                                                                                            //#region North Bay

                                                                                            model.setProperty("/val_northBay_bsppRmrks", RmrksData.results[0].Bsremark);

                                                                                            model.setProperty("/val_northBay_crppRmrks", RmrksData.results[0].Crremark);

                                                                                            obj = oView.byId("ipt_NthBayFairfld");
                                                                                            model.setProperty("/val_northBay_fairfield", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Favaf));
                                                                                            //model.setProperty("/val_northBay_fairfield", oData.results[0].Favaf);

                                                                                            obj = oView.byId("ipt_NthBayTrav");
                                                                                            model.setProperty("/val_northBay_travis", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Trato));
                                                                                            //model.setProperty("/val_northBay_travis", oData.results[0].Trato);

                                                                                            switch (oData.results[0].Msgates) {
                                                                                                case "OPEN":
                                                                                                    model.setProperty("/val_northBay_montezuma", "itm_northBay_montezuma1");
                                                                                                    break;
                                                                                                case "CLOSED":
                                                                                                    model.setProperty("/val_northBay_montezuma", "itm_northBay_montezuma2");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/val_northBay_montezuma", "");
                                                                                                    break;
                                                                                            }

                                                                                            model.setProperty("/val_northBay_operating", oData.results[0].Msgateso);

                                                                                            switch (oData.results[0].Boop) {
                                                                                                case "YES":
                                                                                                    model.setProperty("/val_northBay_boatlock", "itm_northBay_boatlock1");
                                                                                                    break;
                                                                                                case "NO":
                                                                                                    model.setProperty("/val_northBay_boatlock", "itm_northBay_boatlock2");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/val_northBay_boatlock", "");
                                                                                                    break;
                                                                                            }

                                                                                            model.setProperty("/val_northBay_dateSrvc", oData.results[0].Dinser);

                                                                                            switch (oData.results[0].Flain) {
                                                                                                case "INSTALLED":
                                                                                                    model.setProperty("/val_northBay_flashBoards", "itm_northBay_flashBoards1");
                                                                                                    break;
                                                                                                case "REMOVED":
                                                                                                    model.setProperty("/val_northBay_flashBoards", "itm_northBay_flashBoards2");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/val_northBay_flashBoards", "");
                                                                                                    break;
                                                                                            }

                                                                                            model.setProperty("/val_northBay_date", oData.results[0].Flindate);
                                                                                            model.setProperty("/val_northbay_rmrks", RmrksData.results[0].Remarkfin);

                                                                                            //#endregion

                                                                                            //#region NorthBayCont
                                                                                            if (oData.results[0].Rrgis1 === "1") {
                                                                                                view.byId("chk_NthBayCtRoar1").setSelected(true);
                                                                                                model.setProperty("/valCheck_northBayCont_roar1", "1");
                                                                                            }
                                                                                            else {
                                                                                                view.byId("chk_NthBayCtRoar1").setSelected(false);
                                                                                                model.setProperty("/valCheck_northBayCont_roar1", "");
                                                                                            }
                                                                                            if (oData.results[0].Rrgis2 === "1") {
                                                                                                view.byId("chk_NthBayCtRoar2").setSelected(true);
                                                                                                model.setProperty("/valCheck_northBayCont_roar2", "1");
                                                                                            }
                                                                                            else {
                                                                                                view.byId("chk_NthBayCtRoar2").setSelected(false);
                                                                                                model.setProperty("/valCheck_northBayCont_roar2", "");
                                                                                            }
                                                                                            if (oData.results[0].Rrgis3 === "1") {
                                                                                                view.byId("chk_NthBayCtRoar3").setSelected(true);
                                                                                                model.setProperty("/valCheck_northBayCont_roar3", "1");
                                                                                            }
                                                                                            else {
                                                                                                view.byId("chk_NthBayCtRoar3").setSelected(false);
                                                                                                model.setProperty("/valCheck_northBayCont_roar3", "");
                                                                                            }
                                                                                            if (oData.results[0].Rrgis4 === "1") {
                                                                                                view.byId("chk_NthBayCtRoar4").setSelected(true);
                                                                                                model.setProperty("/valCheck_northBayCont_roar4", "1");
                                                                                            }
                                                                                            else {
                                                                                                view.byId("chk_NthBayCtRoar4").setSelected(false);
                                                                                                model.setProperty("/valCheck_northBayCont_roar4", "");
                                                                                            }
                                                                                            if (oData.results[0].Rrgis5 === "1") {
                                                                                                view.byId("chk_NthBayCtRoar5").setSelected(true);
                                                                                                model.setProperty("/valCheck_northBayCont_roar5", "1");
                                                                                            }
                                                                                            else {
                                                                                                view.byId("chk_NthBayCtRoar5").setSelected(false);
                                                                                                model.setProperty("/valCheck_northBayCont_roar5", "");
                                                                                            }
                                                                                            if (oData.results[0].Rrgis6 === "1") {
                                                                                                view.byId("chk_NthBayCtRoar6").setSelected(true);
                                                                                                model.setProperty("/valCheck_northBayCont_roar6", "1");
                                                                                            }
                                                                                            else {
                                                                                                view.byId("chk_NthBayCtRoar6").setSelected(false);
                                                                                                model.setProperty("/valCheck_northBayCont_roar6", "");
                                                                                            }
                                                                                            if (oData.results[0].Rrgis7 === "1") {
                                                                                                view.byId("chk_NthBayCtRoar7").setSelected(true);
                                                                                                model.setProperty("/valCheck_northBayCont_roar7", "1");
                                                                                            }
                                                                                            else {
                                                                                                view.byId("chk_NthBayCtRoar7").setSelected(false);
                                                                                                model.setProperty("/valCheck_northBayCont_roar7", "");
                                                                                            }
                                                                                            if (oData.results[0].Rrgis8 === "1") {
                                                                                                view.byId("chk_NthBayCtRoar8").setSelected(true);
                                                                                                model.setProperty("/valCheck_northBayCont_roar8", "1");
                                                                                            }
                                                                                            else {
                                                                                                view.byId("chk_NthBayCtRoar8").setSelected(false);
                                                                                                model.setProperty("/valCheck_northBayCont_roar8", "");
                                                                                            }
                                                                                            model.setProperty("/valTxt_northBayCont_rmrks", RmrksData.results[0].Remarkrr);
                                                                                            //#region Delta Water Ways
                                                                                            model.setProperty("/val_deltawtr_rockBarrRmrks", RmrksData.results[0].Remarkrbs);
                                                                                            model.setProperty("/val_deltawtr_midRiverRmrks", RmrksData.results[0].Midriv);

                                                                                            //#endregion

                                                                                            //#region Delta Water Ways(Cont)
                                                                                            model.setProperty("/val_deltaWtrCont_Headrmrks", RmrksData.results[0].Headoldriver);
                                                                                            model.setProperty("/val_deltaWtrCont_Oldrmrks", RmrksData.results[0].Oldrivern);
                                                                                            model.setProperty("/val_deltaWtrCont_GrantLinermrks", RmrksData.results[0].Grantlc);
                                                                                            //#endregion

                                                                                            //#endregion
                                                                                            //#endregion SETDATA

                                                                                            model.setProperty("/val_wcd_table", Tbl1Data.results);
                                                                                            model.setProperty("/val_plntt", Tbl2Data.results);


                                                                                            var tb1 = view.byId("wcd_table");
                                                                                            tb1.addStyleClass("table");

                                                                                            var itms = view.byId("colfunloc1");

                                                                                            var tab2 = view.byId("plnt_unit");
                                                                                            //tab2.addStyleClass("table");
                                                                                            sap.ui.core.BusyIndicator.hide();

                                                                                            view.setModel(model);
                                                                                            view.byId("lbl_hdstate").focus();
                                                                                            var lbl = view.byId("ipt_NthBayOper");
                                                                                            //ctrllr.applyInitialFocusTo(lbl);
                                                                                            //view.byId("btn_Submit").setWidth("500%"); 

                                                                                        }
                                                                                        //******************//OPLOG LOGIC******************

                                                                                    },

                                                                                    error: function (oData) {
                                                                                        MessageBox.error("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                                                                                        //alert("Conection Error:" + oResponse);
                                                                                        sap.ui.core.BusyIndicator.hide();
                                                                                    }

                                                                                }, { async: false })
                                                                            }
                                                                            else {//Validation for service Midnight conditions
                                                                                MessageBox.error("Error with service: , /sap/opu/odata/sap/ZODATA_MC_MULTDIV_TABLE_OPLOG_SRV/");
                                                                                //alert("Error with service: , /sap/opu/odata/sap/ZODATA_MC_WRDT_C_SRV/")
                                                                                sap.ui.core.BusyIndicator.hide();
                                                                            }
                                                                            //******************//OPLOG LOGIC******************
                                                                        },


                                                                        error: function (oData) {
                                                                            MessageBox.error("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                                                                            //alert("Conection Error:" + oResponse);
                                                                            sap.ui.core.BusyIndicator.hide();
                                                                        }

                                                                    }, { async: false })
                                                                }
                                                                else {//Validation for service Midnight conditions
                                                                    MessageBox.error("Error with service: , /sap/opu/odata/sap/ZODATA_MC_WRDT_C_SRV/");
                                                                    //alert("Error with service: , /sap/opu/odata/sap/ZODATA_MC_WRDT_C_SRV/")
                                                                    sap.ui.core.BusyIndicator.hide();
                                                                }
                                                                //#endregion
                                                            },
                                                            error: function (oData) {
                                                                MessageBox.error("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                                                                //alert("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                                                                sap.ui.core.BusyIndicator.hide();
                                                            }

                                                        }, { async: false })
                                                    }
                                                    else {//Validation for service variable Remarks
                                                        MessageBox.error("Error with service: , /sap/opu/odata/sap/ZODATA_MC_WRDTREM_DT_SRV/");
                                                        //alert("Error with service: , /sap/opu/odata/sap/ZODATA_MC_WRDTREM_DT_SRV/")
                                                        sap.ui.core.BusyIndicator.hide();
                                                    }
                                                    //#endregion

                                                },
                                                error: function (oData) {
                                                    MessageBox.error("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                                                    //alert("Conection Error:" + oResponse);
                                                    sap.ui.core.BusyIndicator.hide();
                                                }

                                            }, { async: false })
                                        }
                                        else {//Validation for service variable Tabla1
                                            MessageBox("Error with service: , /sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/");
                                            //alert("Error with service: , /sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/")
                                            sap.ui.core.BusyIndicator.hide();
                                        }
                                        //#endregion
                                    },
                                    error: function (oData) {
                                        MessageBox.error("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                                        //alert("Conection Error:" + oResponse);
                                        sap.ui.core.BusyIndicator.hide();
                                    }

                                }, { async: false })
                            }
                            else {//Validation for service variable Table 2
                                MessageBox.error("Error with service: , /sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/");
                                //alert("Error with service: , /sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/")
                                sap.ui.core.BusyIndicator.hide();
                            }
                            //#endregion

                        },
                        error: function (oData, oResponse) {
                            MessageBox.error("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            sap.ui.core.BusyIndicator.hide();
                            //alert("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                        }

                    }, { async: false })
                }
                else {//Validation for service variable Catalogues

                    MessageBox.error("Error with service: /sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/");
                    sap.ui.core.BusyIndicator.hide();
                    //alert("Error with service: /sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/")
                }
                //#endregion
                //#endregion Odata Services Consumption


            },









            /**Se dispara con el evento liveChange, Para validar input solo números, limitado a 5 dígitos, separador de miles = "," */
            OnChange_storage: function (evt) {

                //Para obtener los parámetros enviados en el eventhandler(evt), esto nos servirá para
                //Crear el objeto formateador
                var dig = evt.getSource().data("digitsallowed");     //Número de dígitos permitidos
                var id = evt.getSource().data("error");              //Texto identificador del mensaje de error
                var decAllwd = evt.getSource().data("decAllwd");     //Número de decimales permitidos
                var obj_name = evt.getSource().data("name");         //Nombre del objeto que dispara el evento
                var obj_valId = evt.getSource().data("val");         //Nombre de la variable que contiene el valor
                var sign_allwd = evt.getSource().data("sign");       //Indica que el campo acepta signos + o -
                var flag_dec = "";                                   //Flag para saber si contiene decimales
                var sign = "";                                       //Para considerar signos.
                //#region Variables para calculo de diferencia
                var prevDaySchAllaf = 0;
                var prevday = 0;
                var dif = 0;
                var dif_val = 0;
                var netValInt = 0;
                var netValDec = 0;
                var flag = "";
                var values;
                //#endregion
                //------------------------------------

                //Se crea un objeto de tipo formateador, el cual sirve para aplicar el formato requerido al objeto
                var oNumberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
                    //Número de decimales permitidos, en este caso solo queremos números enteros
                    maxFractionDigits: decAllwd,
                    //Se agrupan los números, en este caso de 3 en 3
                    groupingEnabled: true,
                    //Separados de grupos
                    groupingSeparator: ",",
                    //Separador para decimales
                    decimalSeparator: ".",
                    //Número máximo de dígitos permitidos
                    maxIntegerDigits: dig
                });

                //-------------------------------------------

                //Se crea el modelo json que nos servirá para recuperar y mandar valores a los objetos de la vista
                //Se obtiene la vista, lo cual nos da acceso a todos los componentes en ella.
                var vistaOnChange = this.getView("delta");
                //var oJSONModel = new sap.ui.model.json.JSONModel();
                var Modelo_vista = vistaOnChange.getModel();
                var json_datos = Modelo_vista.getData();

                //Se obtiene la fuente (objeto) que disparó el evento y a continuación el valor de dicho objeto
                var value = evt.getSource().getValue();
                Modelo_vista.setData(null);

                //if (typeof IntDec === "undefined") {
                //Esto sirve para saber si una variables ya esta definida
                //}

                //----------------------------
                if ((value.substring(0, 1).includes("+") || value.substring(0, 1).includes("-")) && sign_allwd === "X") {
                    switch (value.substring(0, 1)) {
                        //case "+":
                        //  sign = "+";
                        //break;
                        case "-":
                            sign = "-";
                            break;
                        default:
                            break;
                    }

                }
                //Verificamos si el valor contiene . decimal
                if (value.includes(".")) {
                    //Si se encontró el . decimal entonces separamos enteros de decimales en un array
                    var IntDec = value.split('.');

                    //Nos aseguramos de que solo existan dígitos tanto en los enteros como en los decimales
                    var netvalueint = IntDec[0].replace(/[^\d]/g, "");//Regex muy simple si encuentra "," en cualquier parte del valor, lo reemplaza o en este caso lo elimina.
                    // if(decAllwd !=""){
                    var netvaluedec = IntDec[1].replace(/[^\d]/g, "");
                    flag_dec = "X";
                    //}
                    //else{

                    //   var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                    // " digit number." + "\n\r Please enter a proper value.";
                    //json_datos[obj_valId] = "";
                    //format_value = ""; //oNumberFormat.format(netvalueint);
                    //sap.m.MessageBox.error(msgerror);
                    //}

                }
                //Si no se encuentra . decimale entonces tomamos el valor enviado por el usuario
                else {
                    //Nos aseguramos de que solo existan dígitos
                    var value = value.replace(/[^\d]/g, "");//Regex muy simple si encuentra "," en cualquier parte del valor, lo reemplaza o en este caso lo elimina.
                    flag_dec = "";
                }
                if ((flag_dec === "X" && decAllwd != "") || flag_dec === "") {



                    //---------------------------------

                    //Verificamos que los enteros no excedan el valor indicado de digitos permitidos ()
                    //Se verifica si la variante netvaluint esta definida(se encontró . decimal y se realizó el split)
                    if (typeof netvalueint !== "undefined") {
                        // Si esta definida hay punto decimal y por l tanto usamos el valor recuperado de la vista
                        if (netvalueint.length > dig) {
                            //Si se sobrepaso el número de dígitos permitidos se lanza msg de error.
                            if (decAllwd > 0) {
                                if (decAllwd === "1") {
                                    var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                        " digit number with " + decAllwd + " decimal place." + "\n\r Please enter a proper value.";
                                    json_datos[obj_valId] = "";

                                    format_value = "";
                                }
                                else {
                                    var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                        " digit number with " + decAllwd + " decimal places." + "\n\r Please enter a proper value.";
                                    json_datos[obj_valId] = "";

                                    format_value = "";
                                }

                                //values = this.number_val(json_datos.val_CliftCourt_PrevDayDivAllot, flag);// [flag,int,dec]
                                //this.dif_cal(json_datos, flag, prevday, prevDaySchAllaf, dif_val,values, netValInt, netValDec,oNumberFormat, dif)


                                //Modelo_vista.setData(json_datos);//se envía el objeto json al modelo json creado previamente
                                //Modelo_vista.updateBindings(true);
                                //vistaOnChange.setModel(Modelo_vista);//Se modifican los datos de la vista por medio del modelo json.
                            }
                            else {
                                var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                    " digit number." + "\n\r Please enter a proper value.";
                                json_datos[obj_valId] = "";
                                format_value = "";
                                //values = this.number_val(json_datos.val_CliftCourt_PrevDayDivAllot, flag);// [flag,int,dec]
                                //this.dif_cal(json_datos, flag, prevday, prevDaySchAllaf, dif_val,values, netValInt, netValDec,oNumberFormat, dif)

                                //Modelo_vista.setData(json_datos);//se envía el objeto json al modelo json creado previamente
                                //Modelo_vista.updateBindings(true);
                                //vistaOnChange.setModel(Modelo_vista);//Se modifican los datos de la vista por medio del modelo json.
                            }
                            sap.m.MessageBox.error(msgerror);
                        }
                        else {
                            //Verificamos que la variable contenga valores, en este punto deberian ser dígitos o null o podría ser "" por q se ingresó
                            //un . decimal como primer caracter
                            if (netvalueint !== null & netvalueint !== "") {

                                //Verificamos si existen valores en la parte decimal
                                if ((netvaluedec !== null && netvaluedec !== "" && netvaluedec !== undefined)) {
                                    //Si hay decimales se concatenan a los enteros y se formatea
                                    value = netvalueint + '.' + netvaluedec;
                                    var format_value = sign + oNumberFormat.format(value);
                                }
                                else {
                                    //Si no hay decimales se formatean solo los enteros

                                    var format_value = oNumberFormat.format(netvalueint);
                                    //Se agrega el punto decimal 
                                    if (decAllwd != "") {
                                        format_value = sign + format_value + ".";
                                    }
                                    else {
                                        format_value = sign + format_value;
                                    }

                                }
                            }
                            else {
                                //No se encontraron valores enteros
                                //Se verifica si hay valores decimales
                                if (netvaluedec !== null & netvaluedec !== "") {
                                    value = '.' + netvaluedec;
                                    var format_value = sign + oNumberFormat.format(value);
                                }
                                else {
                                    // no hay decimales, se devuelve el punto decimal.
                                    var format_value = sign + '.';
                                }
                            }
                        }
                    }
                    //Si no se realizó el split se usa el valor recuperado de la vista (value)
                    else {
                        if (value.length > dig) {
                            //Si se sobrepaso el número de dígitos permitidos se lanza msg de error.
                            if (decAllwd > 0) {
                                if (decAllwd === "1") {
                                    var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                        " digit number with " + decAllwd + " decimal place." + "\n\r Please enter a proper value.";
                                    json_datos[obj_valId] = "";

                                    format_value = "";
                                }
                                else {
                                    var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                        " digit number with " + decAllwd + " decimal places." + "\n\r Please enter a proper value.";
                                    json_datos[obj_valId] = "";

                                    format_value = "";
                                }

                                //values = this.number_val(json_datos.val_CliftCourt_PrevDayDivAllot, flag);// [flag,int,dec]
                                //this.dif_cal(json_datos, flag, prevday, prevDaySchAllaf, dif_val,values, netValInt, netValDec,oNumberFormat, dif)


                                //Modelo_vista.setData(json_datos);//se envía el objeto json al modelo json creado previamente
                                //Modelo_vista.updateBindings(true);
                                //vistaOnChange.setModel(Modelo_vista);//Se modifican los datos de la vista por medio del modelo json.
                            }
                            else {
                                var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                    " digit number. " + "\n\r Please enter a proper value.";
                                json_datos[obj_valId] = "";
                                format_value = "";
                                // values = this.number_val(json_datos.val_CliftCourt_PrevDayDivAllot, flag);// [flag,int,dec]
                                //this.dif_cal(json_datos, flag, prevday, prevDaySchAllaf, dif_val,values, netValInt, netValDec,oNumberFormat, dif)

                                //Modelo_vista.setData(json_datos);//se envía el objeto json al modelo json creado previamente
                                //Modelo_vista.updateBindings(true);
                                //vistaOnChange.setModel(Modelo_vista);//Se modifican los datos de la vista por medio del modelo json.
                            }
                            sap.m.MessageBox.error(msgerror);
                        }
                        else {
                            if (value !== "") {
                                var format_value = sign + oNumberFormat.format(value);
                            }
                            else {
                                var format_value = sign + "";
                            }

                        }
                    }
                }
                else {
                    var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                        " digit number." + "\n\r Please enter a proper value.";
                    json_datos[obj_valId] = "";
                    format_value = ""; //oNumberFormat.format(netvalueint);
                    sap.m.MessageBox.error(msgerror);
                }

                //Se crea el objeto json que contiene los objetos que necesitamos modificar 

                //oJSONModel.getProperty("/cbx_secThr_Lvl_class");
                //oJSONModel.setProperty("/cbx_secThr_Lvl_class","cbx_green");
                //oModel.setData(modelData);

                // oJSONModel.setData(oJSON);//se envía el objeto json al modelo json creado previamente
                //oView.setModel(oJSONModel);//Se modifican los datos de la vista por medio del modelo json. 

                json_datos[obj_valId] = format_value;
                if (obj_name === "ipt_DvppInRes") {
                    var relintaq = vistaOnChange.byId("ipt_DvppRelInAq");
                    if (json_datos.val_dvpp_intoRes !== "0") {

                        json_datos.val_dvpp_relIntoAqu = "0";
                        relintaq.setEnabled(false);
                    }
                    else {
                        relintaq.setEnabled(true);
                    }

                }

                if (obj_name === "ipt_DvppRelInAq") {
                    var relintaq = vistaOnChange.byId("ipt_DvppInRes");
                    if (json_datos.val_dvpp_relIntoAqu !== "0") {

                        json_datos.val_dvpp_intoRes = "0";
                        relintaq.setEnabled(false);
                    }
                    else {
                        relintaq.setEnabled(true);
                    }

                }
                if (obj_name === "ipt_CliftCourt2_PrevDay_DA" || obj_name === "ipt_CliftCourt_PrevDay_SAAf") {


                    values = this.number_val(json_datos.val_CliftCourt_PrevDayDivAllot, flag);// [flag,int,dec]
                    this.dif_cal(json_datos, flag, prevday, prevDaySchAllaf, dif_val, values, netValInt, netValDec, oNumberFormat, dif)
                }
                //Cuando se modifique el valor del campo Prev. Day Scheduled Allotment, se calcula el valor del campo
                //Prev. Day Scheduled AllotmentAF
                if (obj_name === "ipt_CliftCourt4_PrevDay_SA") {
                    //Se crea un objeto de tipo formateador, el cual sirve para aplicar el formato requerido al objeto
                    var oNumberFormat1 = sap.ui.core.format.NumberFormat.getFloatInstance({
                        //Número de decimales permitidos, en este caso solo queremos números enteros
                        maxFractionDigits: 0,
                        //Se agrupan los números, en este caso de 3 en 3
                        groupingEnabled: true,
                        //Separados de grupos
                        groupingSeparator: ",",
                        //Separador para decimales
                        decimalSeparator: "",
                        //Número máximo de dígitos permitidos
                        maxIntegerDigits: 6,
                        //roundingMode: "TOWARDS_ZERO"
                    });
                    var valClifCrtAf = json_datos[obj_valId].replace(/,/g, "");

                    var calc = (Number(valClifCrtAf) * 1.9835).toString();
                    var PdIntDec = "";
                    if (calc.includes(".")) {
                        PdIntDec = calc.split('.');
                        json_datos.val_CliftCourt_af = oNumberFormat1.format(PdIntDec[0]);
                    }
                    else {
                        json_datos.val_CliftCourt_af = oNumberFormat1.format(calc);
                    }
                    //json_datos.val_CliftCourt_af = oNumberFormat1.format(calc);
                    //json_datos.val_CliftCourt_af = Math.round(calc);
                    //json_datos.val_CliftCourt_af = json_datos.val_CliftCourt_af.toString();

                    values = this.number_val(json_datos.val_CliftCourt_PrevDayDivAllot, flag);// [flag,int,dec]
                    this.dif_cal(json_datos, flag, prevday, prevDaySchAllaf, dif_val, values, netValInt, netValDec, oNumberFormat, dif)

                }
                if (obj_name === "ipt_DvppArrMtr" || obj_name === "ipt_DvppRelInAq") {
                    var oNumberFormatDvpp = sap.ui.core.format.NumberFormat.getFloatInstance({
                        //Número máximo de dígitos permitidos
                        maxIntegerDigits: 9,
                        //Número de decimales permitidos, en este caso solo queremos números enteros
                        maxFractionDigits: 0,
                        //Se agrupan los números, en este caso de 3 en 3
                        groupingEnabled: true,
                        //Separados de grupos
                        groupingSeparator: ",",
                        //Separador para decimales
                        decimalSeparator: "",

                    });
                    var ArrMtr = Number(json_datos.val_dvpp_arrMtr);
                    var Devria = Number(json_datos.val_dvpp_relIntoAqu);
                    if (ArrMtr === 0 && Devria === 0) {
                        json_datos.val_sbpp_aquedBlend = "";
                        json_datos.val_sbpp_dvRes = "";
                    }
                    else {
                        if (ArrMtr > 0) {
                            var total = ArrMtr + Devria;
                            json_datos.val_sbpp_aquedBlend = oNumberFormatDvpp.format((ArrMtr * 100) / (ArrMtr + Devria).toString());
                        }
                        else if (ArrMtr == "0" || ArrMtr === "") {
                            json_datos.val_sbpp_aquedBlend = "0";
                        }


                        var aqBlend = 100 - Number(json_datos.val_sbpp_aquedBlend);
                        json_datos.val_sbpp_dvRes = oNumberFormatDvpp.format(aqBlend.toString());
                    }
                }




                // }


                //oJSON.obj_valId = format_value;
                //oJSONModel.setProperty(obj_valId, format_value);
                Modelo_vista.setData(json_datos);//se envía el objeto json al modelo json creado previamente
                Modelo_vista.updateBindings(true);
                vistaOnChange.setModel(Modelo_vista);//Se modifican los datos de la vista por medio del modelo json.
            },

            InitialFormat: function (digAll, err, decall, name, val, psign, pValue) {

                //Para obtener los parámetros enviados en el eventhandler(evt), esto nos servirá para
                //Crear el objeto formateador
                var dig = digAll;     //Número de dígitos permitidos
                var id = err;              //Texto identificador del mensaje de error
                var decAllwd = decall;     //Número de decimales permitidos
                var obj_name = name;         //Nombre del objeto que dispara el evento
                var obj_valId = val;         //Nombre de la variable que contiene el valor
                var sign_allwd = psign;       //Indica que el campo acepta signos + o -
                var flag_dec = "";                                   //Flag para saber si contiene decimales
                var sign = "";                                       //Para considerar signos.
                //#region Variables para calculo de diferencia
                var prevDaySchAllaf = 0;
                var prevday = 0;
                var dif = 0;
                var dif_val = 0;
                var netValInt = 0;
                var netValDec = 0;
                var flag = "";
                var values;
                //#endregion
                //------------------------------------

                //Se crea un objeto de tipo formateador, el cual sirve para aplicar el formato requerido al objeto
                var oNumberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
                    //Número de decimales permitidos, en este caso solo queremos números enteros
                    maxFractionDigits: decAllwd,
                    //Se agrupan los números, en este caso de 3 en 3
                    groupingEnabled: true,
                    //Separados de grupos
                    groupingSeparator: ",",
                    //Separador para decimales
                    decimalSeparator: ".",
                    //Número máximo de dígitos permitidos
                    maxIntegerDigits: dig
                });

                //-------------------------------------------

                //Se crea el modelo json que nos servirá para recuperar y mandar valores a los objetos de la vista
                //Se obtiene la vista, lo cual nos da acceso a todos los componentes en ella.
                var vistaOnChange = this.getView("delta");
                //var oJSONModel = new sap.ui.model.json.JSONModel();
                var Modelo_vista = vistaOnChange.getModel();
                //var json_datos = Modelo_vista.getData();
                var oJSON = {};

                //Se obtiene la fuente (objeto) que disparó el evento y a continuación el valor de dicho objeto
                var value = pValue //vistaOnChange.byId([obj_name]).getValue();
                //Modelo_vista.setData(null);

                //if (typeof IntDec === "undefined") {
                //Esto sirve para saber si una variables ya esta definida
                //}

                //----------------------------
                if ((value.substring(0, 1).includes("+") || value.substring(0, 1).includes("-")) && sign_allwd === "X") {
                    switch (value.substring(0, 1)) {
                        case "+":
                            sign = "+";
                            break;
                        case "-":
                            sign = "-";
                            break;
                        default:
                            break;
                    }

                }
                //Verificamos si el valor contiene . decimal
                if (value.includes(".")) {
                    //Si se encontró el . decimal entonces separamos enteros de decimales en un array
                    var IntDec = value.split('.');

                    //Nos aseguramos de que solo existan dígitos tanto en los enteros como en los decimales
                    var netvalueint = IntDec[0].replace(/[^\d]/g, "");//Regex muy simple si encuentra "," en cualquier parte del valor, lo reemplaza o en este caso lo elimina.
                    var netvaluedec = IntDec[1].replace(/[^\d]/g, "");
                    flag_dec = "X";
                }
                //Si no se encuentra . decimale entonces tomamos el valor enviado por el usuario
                else {
                    //Nos aseguramos de que solo existan dígitos
                    var value = value.replace(/[^\d]/g, "");//Regex muy simple si encuentra "," en cualquier parte del valor, lo reemplaza o en este caso lo elimina.
                    flag_dec = "";
                }


                //---------------------------------

                //Verificamos que los enteros no excedan el valor indicado de digitos permitidos ()
                //Se verifica si la variante netvaluint esta definida(se encontró . decimal y se realizó el split)
                if (typeof netvalueint !== "undefined") {
                    // Si esta definida hay punto decimal y por l tanto usamos el valor recuperado de la vista
                    if (netvalueint.length > dig) {
                        //Si se sobrepaso el número de dígitos permitidos se lanza msg de error.
                        if (decAllwd > 0) {
                            var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                " digit number with " + decAllwd + " decimal places." + "\n\r Please enter a proper value.";
                            oJSON[obj_valId] = "0";

                            format_value = "0";
                            //values = this.number_val(json_datos.val_CliftCourt_PrevDayDivAllot, flag);// [flag,int,dec]
                            //this.dif_cal(json_datos, flag, prevday, prevDaySchAllaf, dif_val,values, netValInt, netValDec,oNumberFormat, dif)


                            //Modelo_vista.setData(json_datos);//se envía el objeto json al modelo json creado previamente
                            //Modelo_vista.updateBindings(true);
                            //vistaOnChange.setModel(Modelo_vista);//Se modifican los datos de la vista por medio del modelo json.
                        }
                        else {
                            var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                " digit number." + "\n\r Please enter a proper value.";
                            oJSON[obj_valId] = "0";
                            format_value = "0";
                            //values = this.number_val(json_datos.val_CliftCourt_PrevDayDivAllot, flag);// [flag,int,dec]
                            //this.dif_cal(json_datos, flag, prevday, prevDaySchAllaf, dif_val,values, netValInt, netValDec,oNumberFormat, dif)

                            //Modelo_vista.setData(json_datos);//se envía el objeto json al modelo json creado previamente
                            //Modelo_vista.updateBindings(true);
                            //vistaOnChange.setModel(Modelo_vista);//Se modifican los datos de la vista por medio del modelo json.
                        }
                        sap.m.MessageBox.error(msgerror);
                    }
                    else {
                        //Verificamos que la variable contenga valores, en este punto deberian ser dígitos o null o podría ser "" por q se ingresó
                        //un . decimal como primer caracter
                        if (netvalueint !== null & netvalueint !== "") {

                            //Verificamos si existen valores en la parte decimal
                            if (netvaluedec !== null & netvaluedec !== "") {
                                //Si hay decimales se concatenan a los enteros y se formatea
                                value = netvalueint + '.' + netvaluedec;
                                var format_value = sign + oNumberFormat.format(value);
                            }
                            else {
                                //Si no hay decimales se formatean solo los enteros

                                var format_value = oNumberFormat.format(netvalueint);
                                //Se agrega el punto decimal 
                                format_value = sign + format_value + '.';
                            }
                        }
                        else {
                            //No se encontraron valores enteros
                            //Se verifica si hay valores decimales
                            if (netvaluedec !== null & netvaluedec !== "") {
                                value = '.' + netvaluedec;
                                var format_value = sign + oNumberFormat.format(value);
                            }
                            else {
                                // no hay decimales, se devuelve el punto decimal.
                                var format_value = sign + '.';
                            }
                        }
                    }
                }
                //Si no se realizó el split se usa el valor recuperado de la vista (value)
                else {
                    if (value.length > dig) {
                        //Si se sobrepaso el número de dígitos permitidos se lanza msg de error.
                        if (decAllwd > 0) {
                            var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                " digit number with " + decAllwd + " decimal places." + "\n\r Please enter a proper value.";
                            oJSON[obj_valId] = "0";
                            format_value = "0";
                            //values = this.number_val(json_datos.val_CliftCourt_PrevDayDivAllot, flag);// [flag,int,dec]
                            //this.dif_cal(json_datos, flag, prevday, prevDaySchAllaf, dif_val,values, netValInt, netValDec,oNumberFormat, dif)


                            //Modelo_vista.setData(json_datos);//se envía el objeto json al modelo json creado previamente
                            //Modelo_vista.updateBindings(true);
                            //vistaOnChange.setModel(Modelo_vista);//Se modifican los datos de la vista por medio del modelo json.
                        }
                        else {
                            var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                " digit number. " + "\n\r Please enter a proper value.";
                            oJSON[obj_valId] = "0";
                            format_value = "0";
                            // values = this.number_val(json_datos.val_CliftCourt_PrevDayDivAllot, flag);// [flag,int,dec]
                            //this.dif_cal(json_datos, flag, prevday, prevDaySchAllaf, dif_val,values, netValInt, netValDec,oNumberFormat, dif)

                            //Modelo_vista.setData(json_datos);//se envía el objeto json al modelo json creado previamente
                            //Modelo_vista.updateBindings(true);
                            //vistaOnChange.setModel(Modelo_vista);//Se modifican los datos de la vista por medio del modelo json.
                        }
                        sap.m.MessageBox.error(msgerror);
                    }
                    else {
                        if (value !== "") {
                            var format_value = sign + oNumberFormat.format(value);
                        }
                        else {
                            var format_value = sign + "";
                        }

                    }
                }

                //Se crea el objeto json que contiene los objetos que necesitamos modificar 

                //oJSONModel.getProperty("/cbx_secThr_Lvl_class");
                //oJSONModel.setProperty("/cbx_secThr_Lvl_class","cbx_green");
                //oModel.setData(modelData);

                // oJSONModel.setData(oJSON);//se envía el objeto json al modelo json creado previamente
                //oView.setModel(oJSONModel);//Se modifican los datos de la vista por medio del modelo json. 

                oJSON[(obj_valId)] = format_value;

                if (obj_name === "ipt_CliftCourt2_PrevDay_DA" || obj_name === "ipt_CliftCourt_PrevDay_SAAf") {


                    //values = this.number_val(oJSON.val_CliftCourt_PrevDayDivAllot, flag);// [flag,int,dec]
                    //this.dif_cal(oJSON, flag, prevday, prevDaySchAllaf, dif_val, values, netValInt, netValDec, oNumberFormat, dif)
                }
                //Cuando se modifique el valor del campo Prev. Day Scheduled Allotment, se calcula el valor del campo
                //Prev. Day Scheduled AllotmentAF
                if (obj_name === "ipt_CliftCourt4_PrevDay_SA") {
                    //Se crea un objeto de tipo formateador, el cual sirve para aplicar el formato requerido al objeto
                    var oNumberFormat1 = sap.ui.core.format.NumberFormat.getFloatInstance({
                        //Número de decimales permitidos, en este caso solo queremos números enteros
                        maxFractionDigits: 0,
                        //Se agrupan los números, en este caso de 3 en 3
                        groupingEnabled: true,
                        //Separados de grupos
                        groupingSeparator: ",",
                        //Separador para decimales
                        decimalSeparator: "",
                        //Número máximo de dígitos permitidos
                        maxIntegerDigits: 6,
                        //roundingMode: "TOWARDS_ZERO"
                    });
                    //var calc = value * 1.9835;
                    //oJSON.val_CliftCourt_af = oNumberFormat1.format(calc);
                    //json_datos.val_CliftCourt_af = Math.round(calc);
                    //json_datos.val_CliftCourt_af = json_datos.val_CliftCourt_af.toString();

                    //values = this.number_val(oJSON.val_CliftCourt_PrevDayDivAllot, flag);// [flag,int,dec]
                    //this.dif_cal(oJSON, flag, prevday, prevDaySchAllaf, dif_val, values, netValInt, netValDec, oNumberFormat, dif)

                }
                if (obj_name === "ipt_DvppArrMtr" || obj_name === "ipt_DvppRelInAq") {
                    var oNumberFormatDvpp = sap.ui.core.format.NumberFormat.getFloatInstance({
                        //Número máximo de dígitos permitidos
                        maxIntegerDigits: 9,
                        //Número de decimales permitidos, en este caso solo queremos números enteros
                        maxFractionDigits: 0,
                        //Se agrupan los números, en este caso de 3 en 3
                        groupingEnabled: true,
                        //Separados de grupos
                        groupingSeparator: ",",
                        //Separador para decimales
                        decimalSeparator: "",

                    });
                    //var ArrMtr = Number(oJSON.val_dvpp_arrMtr);
                    //var Devria = Number(oJSON.val_dvpp_relIntoAqu);

                    //if (ArrMtr > 0) {
                    //  var total = ArrMtr + Devria;
                    // oJSON.val_sbpp_aquedBlend = oNumberFormatDvpp.format((ArrMtr * 100) / (ArrMtr + Devria).toString());
                    // }
                    //var aqBlend = 100 - Number(oJSON.val_sbpp_aquedBlend);
                    //oJSON.val_sbpp_dvRes = oNumberFormatDvpp.format(aqBlend.toString());

                }




                // }


                //oJSON.obj_valId = format_value;
                //oJSONModel.setProperty(obj_valId, format_value);
                //Modelo_vista.setData(json_datos);//se envía el objeto json al modelo json creado previamente
                //Modelo_vista.updateBindings(true);
                //vistaOnChange.setModel(Modelo_vista);//Se modifican los datos de la vista por medio del modelo json.
                return format_value;
            },



            dif_cal: function (json_datos, flag, prevday, prevDaySchAllaf, dif_val, values, netValInt, netValDec, oNumberFormat, dif) {
                values = this.number_val(json_datos.val_CliftCourt_PrevDayDivAllot, flag);// [flag,int,dec]
                if (values[0] == "X") {
                    prevday = values[1] + "." + values[2];
                }
                else {
                    prevday = values[1];
                }
                values = this.number_val(json_datos.val_CliftCourt_af, flag, netValInt, netValDec)
                if (values[0] == "X") {
                    prevDaySchAllaf = values[1] + "." + values[2];
                }
                else {
                    prevDaySchAllaf = values[1];
                }
                dif_val = oNumberFormat.format(this.Clifton_dif(Number(prevday), Number(prevDaySchAllaf), dif));
                json_datos.val_CliftCourt_Dif = dif_val;
            },

            Clifton_dif: function (prevday, prevsch, dif) {
                dif = prevday - prevsch;
                return dif;
            },
            number_val: function (val, flag, int, dec) {
                //Verificamos si el valor contiene . decimal
                if (val.includes(".")) {
                    //Si se encontró el . decimal entonces separamos enteros de decimales en un array
                    var IntDec = val.split('.');

                    //Nos aseguramos de que solo existan dígitos tanto en los enteros como en los decimales
                    int = IntDec[0].replace(/[^\d]/g, "");//Regex muy simple si encuentra "," en cualquier parte del valor, lo reemplaza o en este caso lo elimina.
                    dec = IntDec[1].replace(/[^\d]/g, "");
                    flag = "X";
                }
                //Si no se encuentra . decimale entonces tomamos el valor enviado por el usuario
                else {
                    //Nos aseguramos de que solo existan dígitos
                    int = val.replace(/[^\d]/g, "");//Regex muy simple si encuentra "," en cualquier parte del valor, lo reemplaza o en este caso lo elimina.
                    dec = "";
                    flag = "";
                }
                return [flag, int, dec];

            },
            /**Los objetos de tipo boton, tienen un evento llamado press, este evento se dispara al pulsar el botón */
            onClear: function (evt) {
                /**var fid = evt.getSource().getId();
                var id = fid.split(/--/)
                var idt = id[2];
                idt = "ipt"+idt.substring(3,idt.length); TODO ESTO SE REEMPLAZA POR PARAMETRO*/
                var objid = evt.getSource().data("id");//Se obtiene el valor del parámetro enviado desde la vista "id"
                this.getView("delta").byId(objid).setValue("");
            },
            OnChange_decimal: function (evt) {
                //Para obtener los parámetros enviados en el eventhandler(evt)
                var dig = evt.getSource().data("digitsallowed");
                var id = evt.getSource().data("id");
                var dec = evt.getSource().data("dec");
                //Se crea el modelo json que nos servirá para recuperar y mandar valores a los objetos de la vista
                var oJSONModel = new sap.ui.model.json.JSONModel();
                //Se obtiene la vista, lo cual nos da acceso a todos los componentes en ella.
                var oView = this.getView("delta");
                //Se obtiene la fuente (objeto) que disparó el evento en este caso el disparador es el input ipt_CliftCourt6_1Storage
                var ipt_CliftCourt6_1Storage = evt.getSource();
                //Se recupera el valor del objeto
                var value = ipt_CliftCourt6_1Storage.getValue();
                //value = value.replace(/[^\d]/g, "");
                //Se valida que solo contenga 6 caracteres ##,### solo se permiten 5 dígitos, mas el separados de miles
                if (value.length > dig) {
                    var msgerror = "The maximum allowed limit for " + id + " is a " + dig + " digit number. Please enter a proper value.";
                    sap.m.MessageBox.error(msgerror);
                }
                //Si son menos de 6 caracteres hay que validar y en caso de ser necesario agregar el separados de miles
                else {
                    //Se crea un objeto de tipo formato, el cual sirve para aplicar el formato requerido al objeto
                    var oNumberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
                        //Número de decimales permitidos, en este caso solo queremos números enteros
                        maxFractionDigits: 0,
                        //Se agrupan los números, en este caso de 3 en 3
                        groupingEnabled: true,
                        //Separados de grupos
                        groupingSeparator: ",",
                        //Separador para decimales
                        decimalSeparator: ".",
                        //Número máximo de dígitos permitidos
                        maxIntegerDigits: 5
                    });
                    //En caso de que se llegue a un valor de miles, hay que aplicar el formato para agregar el separador 
                    if (value.length > 3) {
                        /**  value = value.substring(0,1)+ ","+value.substring(1,4);*/
                        //Este formateador solo acepta números, por lo que si el valor ya contiene el separador ",", hay que eliminarlo
                        //antes de aplicar el formato, de otra manera da error.
                        value = value.replace(/,/g, "");//Regex muy simple si encuentra "," en cualquier parte del valor, lo reemplaza o en este caso lo elimina.
                        //Se aplica el formato utilizando el formateador antes definido.
                        var format_value = oNumberFormat.format(value);
                    }
                    else {
                        //En caso de que no haya miles, devolvemos el mismo valor obtenido
                        format_value = value;
                    }

                }
                //Se crea el objeto json que contiene los objetos que necesitamos modificar 
                var oJSON = {
                    valueSet: format_value
                }
                oJSONModel.setData(oJSON);//se envía el objeto json al modelo json creado previamente
                oView.setModel(oJSONModel);//Se modifican los datos de la vista por medio del modelo json.
            },
            OnChange: function (evt) {
                //Se obtiene la vista, lo cual nos da acceso a todos los componentes en ella.
                var oView = this.getView("delta");
                var model = oView.getModel();
                var json = model.getData();
                var cbx = oView.byId(evt.getSource().data("obj_name"));
                var val = cbx._getSelectedItemText();
                var secIcon = oView.byId(evt.getSource().data("icon"));
                //lbl.removeStyleClass("cbx_green");
                //lbl.removeStyleClass("cbx_orange");
                //lbl.removeStyleClass("cbx_red");

                switch (val) {
                    case "NORMAL":
                        // lbl.addStyleClass("cbx_green");
                        secIcon.setBackgroundColor("green");
                        secIcon.setColor("green");
                        break;
                    case "ELEVATED":
                        // lbl.addStyleClass("cbx_orange");
                        secIcon.setBackgroundColor("orange");
                        secIcon.setColor("orange");
                        break;
                    case "IMMINENT":
                        //lbl.addStyleClass("cbx_red");
                        secIcon.setBackgroundColor("red");
                        secIcon.setColor("red");
                        break;
                    default:
                        model.setProperty("/val_SecThreatLvls_nat", "");
                        secIcon.setBackgroundColor("");
                        secIcon.setColor("");

                        break;
                }

                // oJSONModel.setData(oJSON);//se envía el objeto json al modelo json creado previamente
                oView.setModel(model);//Se modifican los datos de la vista por medio del modelo json. 

            },

            onSubmit: function (evt) {
                var submitdata = this.getView("delta").getModel().getData();
                var oview = this.getView("delta");
                var oThat = this;
                MessageBox.confirm("Are you ready to submit?", {
                    submitJson: submitdata,
                    oView: oview,
                    that: oThat,
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: async function (sAction) {
                        if (sAction === "OK") {
                            var sserviceurl = "/sap/opu/odata/sap/ZODATA_MC_WRDT_C_SRV";
                            var oModel = new sap.ui.model.odata.ODataModel(sserviceurl, true);
                            //var submitJson = this.getView("delta").getModel().getData();
                            var submitJson = this.submitJson;
                            //var oViewRmrk = this.getView("delta");
                            var oViewRmrk = this.oView;
                            var submitJsonRmrk = submitJson;

                            var now = new Date();
                            var oEntry = {};
                            oEntry.Mandt = submitJson.val_mandt;;
                            oEntry.Mcdate = submitJson.val_dateRmrk;
                            oEntry.Mctime = "PT" + now.getHours() + "H" + now.getMinutes() + "M" + now.getSeconds() + "S";
                            oEntry.Uname = submitJson.val_DbOpname;
                            oEntry.Natsec = this.oView.byId("cbx_SecThreatLvls_nat").getValue();
                            oEntry.Dwrsec = this.oView.byId("cbx_SecThreatLvls_dwr").getValue();
                            oEntry.Cacin = this.oView.byId("cbx_AquedCtrl").getValue();
                            oEntry.Ccgcin = this.oView.byId("cbx_CliGteCtr").getValue();
                            oEntry.Scada = this.oView.byId("cbx_scaHost").getValue();
                            oEntry.Ccip = this.oView.byId("cbx_CliftCourt1_intake").getValue();
                            oEntry.Cca = this.that.delcomma(this.oView.byId("ipt_CliftCourt2_PrevDay_DA").getValue().valueOf("text"));
                            oEntry.Ccmcfs = "";


                            oEntry.Ccaw = this.that.delcomma(this.oView.byId("ipt_CliftCourt_PrevDay_SAAf").getValue());
                            oEntry.Ccmcfsw = this.that.delcomma(this.oView.byId("ipt_CliftCourt4_PrevDay_SA").getValue());
                            oEntry.Ccdif = this.that.delcomma(this.oView.byId("ipt_CliftCourt3_dif").getValue());
                            oEntry.Gsamn = this.oView.byId("cbx_CliftCourt5_gate").getValue();
                            oEntry.Ccf = this.that.delcomma(this.oView.byId("ipt_CliftCourt6_1Storage").getValue());
                            oEntry.Ccffe = this.that.delcomma(this.oView.byId("ipt_CliftCourt6_elevation").getValue());
                            oEntry.Bappd = this.that.delcomma(this.oView.byId("ipt_Bapp_pumpd").getValue());
                            oEntry.Bpon = submitJson.val_OnDateSub;
                            oEntry.Ffon = this.oView.byId("cbx_PwrSource_FishFac").getValue();
                            oEntry.Remarkffo = submitJson.val_dateRmrk + "WRDTREMARKFFO";
                            oEntry.Wdrfpc = this.that.delcomma(this.oView.byId("ipt_FishFac_PrimCh").getValue());
                            oEntry.Wdrfsc = this.that.delcomma(this.oView.byId("ipt_FishFac_SecCh").getValue());
                            oEntry.Wdrfpht = this.that.delcomma(this.oView.byId("ipt_FishFac_holdtnks").getValue());
                            oEntry.Wdrfbh = this.that.delcomma(this.oView.byId("ipt_FishFac_ByHvstr").getValue());
                            oEntry.Bci = this.oView.byId("cbx_Bapp_CtrlIn").getValue();
                            oEntry.Remarkpscne = submitJson.val_dateRmrk + "WRDTREMARKPSCNE";
                            oEntry.Remarksbpp = submitJson.val_dateRmrk + "WRDTREMARKSBPP";
                            oEntry.Pscne = submitJson.val_dateRmrk + "WRDTREMARKPSCNE";
                            oEntry.Sbab = this.that.delcomma(this.oView.byId("ipt_sbpp_aqbld").getValue());
                            oEntry.Sbabd = this.that.delcomma(this.oView.byId("ipt_sbpp_DVRes").getValue());
                            oEntry.Betres = this.that.delcomma(this.oView.byId("ipt_sbpp_strge").getValue());
                            oEntry.Bfte = this.that.delcomma(this.oView.byId("ipt_sbpp_BethRes").getValue());
                            oEntry.Acttf = this.that.delcomma(this.oView.byId("ipt_ContTurn_AlCount").getValue());
                            oEntry.Sccttf = this.that.delcomma(this.oView.byId("ipt_ContTurn_StaClara").getValue());
                            oEntry.Zsttf = this.that.delcomma(this.oView.byId("ipt_ContTurn_Zone7").getValue());
                            oEntry.Remarkz7 = submitJson.val_dateRmrk + "WRDTREMARKZ7";
                            oEntry.Ldveft = this.that.delcomma(this.oView.byId("ipt_DvppLake").getValue());
                            oEntry.Ldveftf = this.that.delcomma(this.oView.byId("ipt_DvppStorg").getValue());
                            oEntry.Dvppir = this.that.delcomma(this.oView.byId("ipt_DvppInRes").getValue());
                            oEntry.Accm = this.that.delcomma(this.oView.byId("ipt_DvppArrMtr").getValue());
                            oEntry.Devria = this.that.delcomma(this.oView.byId("ipt_DvppRelInAq").getValue());
                            oEntry.Flre = this.that.delcomma(this.oView.byId("ipt_DvppFloorRel").getValue());
                            var vt1 = this.oView.byId("chk_DvppTier1").getSelected();
                            if (vt1 === true) {
                                oEntry.Tvop1 = "1";
                            }
                            else { oEntry.Tvop1 = ""; }

                            var vt2 = this.oView.byId("chk_DvppTier2").getSelected();
                            if (vt2 === true) {
                                oEntry.Tvop2 = "1";
                            }
                            else { oEntry.Tvop2 = ""; }

                            var vt3 = this.oView.byId("chk_DvppTier3").getSelected();
                            if (vt3 === true) {
                                oEntry.Tvop3 = "1";
                            }
                            else { oEntry.Tvop3 = ""; }

                            var vt4 = this.oView.byId("chk_DvppTier4").getSelected();
                            if (vt4 === true) {
                                oEntry.Tvop4 = "1";
                            }
                            else { oEntry.Tvop4 = ""; }

                            var vt5 = this.oView.byId("chk_DvppTier5").getSelected();
                            if (vt5 === true) {
                                oEntry.Tvop5 = "1";
                            }
                            else { oEntry.Tvop5 = ""; }

                            oEntry.Emgates = this.oView.byId("cbx_Dvpp_EmerGts").getValue();
                            oEntry.Rgates = this.oView.byId("cbx_Dvpp_RegGts").getValue();
                            oEntry.Remarkd = submitJson.val_dateRmrk + "WRDTREMARKD";
                            oEntry.Bsremark = submitJson.val_dateRmrk + "WRDTBSREMARK";
                            oEntry.Crremark = submitJson.val_dateRmrk + "WRDTCRREMARK";
                            oEntry.Favaf = this.that.delcomma(this.oView.byId("ipt_NthBayFairfld").getValue());
                            oEntry.Trato = this.that.delcomma(this.oView.byId("ipt_NthBayTrav").getValue());
                            oEntry.Msgates = this.oView.byId("cbx_NthBayMontez").getValue();
                            oEntry.Msgateso = this.oView.byId("ipt_NthBayOper").getValue();
                            oEntry.Boop = this.oView.byId("cbx_NthBayBoat").getValue();
                            oEntry.Dinser = this.oView.byId("dp_NthBayDtSer").getValue();
                            oEntry.Flain = this.oView.byId("cbx_NthBayFlash").getValue();
                            oEntry.Flindate = this.oView.byId("dp_NthBayFlashDt").getValue();
                            oEntry.Remarkfin = submitJson.val_dateRmrk + "WRDTREMARKFIN";
                            oEntry.Zcwm = "";
                            oEntry.Midriv = submitJson.val_dateRmrk + "WRDTMIDRIV";
                            oEntry.Headoldriver = submitJson.val_dateRmrk + "WRDTHEADOLDRIVER";

                            var vr1 = this.oView.byId("chk_NthBayCtRoar1").getSelected();
                            if (vr1 === true) {
                                oEntry.Rrgis1 = "1";
                            }
                            else { oEntry.Rrgis1 = ""; }

                            var vr2 = this.oView.byId("chk_NthBayCtRoar2").getSelected();
                            if (vr2 === true) {
                                oEntry.Rrgis2 = "1";
                            }
                            else { oEntry.Rrgis2 = ""; }

                            var vr3 = this.oView.byId("chk_NthBayCtRoar3").getSelected();
                            if (vr3 === true) {
                                oEntry.Rrgis3 = "1";
                            }
                            else { oEntry.Rrgis3 = ""; }

                            var vr4 = this.oView.byId("chk_NthBayCtRoar4").getSelected();
                            if (vr4 === true) {
                                oEntry.Rrgis4 = "1";
                            }
                            else { oEntry.Rrgis4 = ""; }

                            var vr5 = this.oView.byId("chk_NthBayCtRoar5").getSelected();
                            if (vr5 === true) {
                                oEntry.Rrgis5 = "1";
                            }
                            else { oEntry.Rrgis5 = ""; }

                            var vr6 = this.oView.byId("chk_NthBayCtRoar6").getSelected();
                            if (vr6 === true) {
                                oEntry.Rrgis6 = "1";
                            }
                            else { oEntry.Rrgis6 = ""; }

                            var vr7 = this.oView.byId("chk_NthBayCtRoar7").getSelected();
                            if (vr7 === true) {
                                oEntry.Rrgis7 = "1";
                            }
                            else { oEntry.Rrgis7 = ""; }

                            var vr8 = this.oView.byId("chk_NthBayCtRoar8").getSelected();
                            if (vr8 === true) {
                                oEntry.Rrgis8 = "1";
                            }
                            else { oEntry.Rrgis8 = ""; }

                            oEntry.Remarkrr = submitJson.val_dateRmrk + "WRDTREMARKRR";
                            oEntry.Remarkrbs = submitJson.val_dateRmrk + "WRDTREMARKRBS";
                            oEntry.Oldrivern = submitJson.val_dateRmrk + "WRDTOLDRIVERN";
                            oEntry.Grantlc = submitJson.val_dateRmrk + "WRDTGRANTLC";
                            oEntry.Mon = this.oView.byId("cbx_PwrSource_OM").getValue();
                            //var thiscrt = this.that;
                            oModel.create("/ZWCM_MC_WRDTSet", oEntry, {
                                //thatmid: this.that,
                                method: "POST",
                                success: function (oData, oResponse) {
                                    //var thatmidcond = thiscrt;

                                    //if (oData.Zcwm === "X") {

                                    var sserviceurlRmrks = "/sap/opu/odata/sap/ZODATA_MC_WRDTREM_DT_SRV";
                                    var oModelRmrks = new sap.ui.model.odata.ODataModel(sserviceurlRmrks, true);
                                    //var submitJsonRmrk = oView.getModel().getData();
                                    var oEntryRmrks = {};


                                    var oEntryRmrks = {};
                                    oEntryRmrks.Zcwmremkey = submitJsonRmrk.val_dateRmrk + "WRDT";
                                    oEntryRmrks.Remarkffo = oViewRmrk.byId("pwrSource_rmkTxt").getValue();
                                    //oEntry.Remarkffo = "TESTTTTTT";
                                    oEntryRmrks.Remarkpscne = oViewRmrk.byId("Bapp_on_pltSwyd_rmkTxt").getValue();
                                    oEntryRmrks.Remarksbpp = oViewRmrk.byId("rmkTxt_sbpp_on_pltSwyd").getValue();
                                    oEntryRmrks.Remarkz7 = oViewRmrk.byId("rmkTxt_SbppAqCont").getValue();
                                    oEntryRmrks.Remarkd = oViewRmrk.byId("rmkTxt_Dvpp").getValue();
                                    oEntryRmrks.Bsremark = oViewRmrk.byId("rmkTxt_NthBayBspp").getValue();
                                    oEntryRmrks.Crremark = oViewRmrk.byId("rmkTxt_NthBayCrpp").getValue();
                                    oEntryRmrks.Remarkfin = oViewRmrk.byId("rmkTxt_NthBayRmrks").getValue();
                                    oEntryRmrks.Remarkrr = oViewRmrk.byId("rmkTxt_NthBayCtRoar").getValue();
                                    oEntryRmrks.Remarkrbs = oViewRmrk.byId("rmkTxt_DWWays_RkcBarr").getValue();
                                    oEntryRmrks.Midriv = oViewRmrk.byId("rmkTxt_DWWays_MidRivr").getValue();
                                    oEntryRmrks.Headoldriver = oViewRmrk.byId("rmkTxt_DWWaysCtHeadORBarr").getValue();
                                    oEntryRmrks.Oldrivern = oViewRmrk.byId("rmkTxt_DWWaysCtOldRvr").getValue();
                                    oEntryRmrks.Grantlc = oViewRmrk.byId("rmkTxt_DWWaysCtGtLine").getValue();

                                    oModelRmrks.create("/ZWCM_MC_WRDT_REMARKSSet", oEntryRmrks, {

                                        method: "POST",
                                        success: function (oData, oResponse) {

                                            sap.m.MessageBox.success("Data submited Succesfully", {

                                                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                                                emphasizedAction: MessageBox.Action.OK,
                                                onClose: async function (sAction, model) {
                                                    var model = oThat.getView().getModel(); // this gives you the view
                                                    if (sAction === "OK") {
                                                        model.setProperty("/valSubmitted", "This form has been submitted");
                                                        var btnSb = oThat.getView().byId("btn_Submit");
                                                        btnSb.setEnabled(false);
                                                    }
                                                }
                                            }

                                            );


                                        },
                                        error: function (oData, oREsponse) {
                                            sap.m.MessageBox.error("Data submit failed");
                                        }
                                    });

                                    //alert("Data submited succesfully");

                                    //}
                                    //else { alert("Today format was already submited."); }

                                },
                                error: function (e) {
                                    alert("Error on Submit");
                                }
                            });
                        }
                    }
                });


            },
            delcomma: function (val) {
                var value = val;
                value = value.replace(/[^\d \+ \- \.]/g, "");

                return value
            },
            OnCbxChng: function (evt) {
                var view = this.getView("delta");
                var model = view.getModel();
                var secIcon = view.byId(evt.getSource().data("icon"));
                var cbxId = evt.getSource().data("cbxName");
                var dataSrc = evt.getSource().data("dataSource");
                var selKey = evt.getSource().data("selkey");
                var cbx = view.byId([cbxId]);
                var cbxJson = view.getModel().getData();
                var list = cbxJson[dataSrc];
                var flag = "";

                for (let index = 0; index < list.length; index++) {
                    if (list[index].text === cbx.getValue()) {
                        flag = "X";
                        break;
                    }

                }
                if (flag === "") {

                    sap.m.MessageBox.error("Select a valid value.");
                    cbxJson[selKey] = list[0].key.toString();
                    model.setData("");
                    model.setData(cbxJson);
                    view.setModel(model);
                }


                if (cbxId === "cbx_SecThreatLvls_nat" || cbxId === "cbx_SecThreatLvls_dwr") {
                    //Se obtiene la vista, lo cual nos da acceso a todos los componentes en ella.
                    //var oView = this.getView("delta");
                    //var model = oView.getModel();
                    //var json = model.getData();
                    //var cbx = oView.byId(evt.getSource().data("obj_name"));
                    var val = cbx._getSelectedItemText();

                    //lbl.removeStyleClass("cbx_green");
                    //lbl.removeStyleClass("cbx_orange");
                    //lbl.removeStyleClass("cbx_red");

                    switch (val) {
                        case "NORMAL":
                            // lbl.addStyleClass("cbx_green");
                            secIcon.setBackgroundColor("green");
                            secIcon.setColor("green");
                            break;
                        case "ELEVATED":
                            // lbl.addStyleClass("cbx_orange");
                            secIcon.setBackgroundColor("orange");
                            secIcon.setColor("orange");
                            break;
                        case "IMMINENT":
                            //lbl.addStyleClass("cbx_red");
                            secIcon.setBackgroundColor("red");
                            secIcon.setColor("red");
                            break;
                        default:
                            model.setProperty("/val_SecThreatLvls_nat", "");
                            secIcon.setBackgroundColor("");
                            secIcon.setColor("");

                            break;
                    }
                }
                //if (cbx.value() && cbx.selectedIndex == -1) {
                //var dt = this.dataSource._data[0];
                //  cbx.text("");


            },
            onAfterRendering: function (obj) {
                var yourComboBox = obj.srcControl;
                var oView = this.getView("delta");
                var cbx = oView.byId("cbx_SecThreatLvls_nat");
                cbx.removeStyleClass("sapMFocus");
                cbx.removeStyleClass("sapMInputBaseIconPressed");
                cbx.addStyleClass("cbx_green");

                oView.byId("lbl_NthBayOpermod").focus();
                // here you need to determine the id from the html dom element 
                // you can use yourComboBox.getId() to achieve this

                // change the css by using jQuery:
                //$(yourId).css(....);
            },
            addEvent: function (ObName, ObId, Oval, dec) {
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oView = this.getView("delta");
                var oModel = oView.getModel();
                var oData = oModel.getData();
                oModel.setData(null);

                ObName.addEventDelegate({
                    onfocusout: $.proxy(function (oEvent) {
                        if (dec !== "0") {
                            var idx = 0;
                            var val;
                            var obj = this.byId(ObId);
                            var value = obj.getValue();
                            var last_ch = value.substring((value.length - 1));
                            if (last_ch === '.') {
                                //obj.setValue(value.substring((value.length - 1), 0));
                                while (idx < dec) {
                                    oData[Oval] = value + "0";
                                    value = oData[Oval];
                                    idx++;
                                }
                                //var error = "The maximum allowed limit for 'Alameda Country' is a 4 digit number with a single decimal place. \n\r Please enter a proper value. ";
                                //sap.m.MessageBox.error(error);
                            }
                            else {
                                if (value.includes(".")) {
                                    var values = value.split(".")
                                    val = (values[1].length);
                                    idx = val;
                                }

                                while (idx < dec) {
                                    if (idx === 0) {
                                        oData[Oval] = value + ".0";
                                    }
                                    else {
                                        oData[Oval] = value + "0";
                                    }

                                    value = oData[Oval];
                                    idx++;

                                }
                            }

                        }
                        oModel.setData(oData);
                        oView.setModel(oModel);

                    }, this)
                });
                oModel.setData(oData);
                oView.setModel(oModel);
            },
            getDecAll: function (Object) {
                var param = Object.getCustomData();
                var decAll = 0;
                for (let index = 0; index < param.length; index++) {
                    const element = param[index];
                    if (element.getProperty("key") === "decAllwd") {
                        decAll = Number(element.getProperty("value"));
                        break;
                    }
                }
                return decAll;
            },
            onAfterRendering: function () {
                jQuery.sap.delayedCall(500, this, function () { this.byId("cbx_AquedCtrl").focus(); });
            },




            applyInitialFocusTo: function (target) {
                Element.getFocusDomRef();
                const onAfterShow = () => target.focus();
                this._afterShowDelegate = { onAfterShow };
                this.getView().addEventDelegate(this._afterShowDelegate);
            },
            _onRouteMatched: function (oEvent) {
                var oArgs, oView;
                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();

                var dataModelDt = this.getOwnerComponent().getModel("dataDt");//Will contain data mapped from the ODATA services
                dataModelDt.oData.init = "X";
                if (dataModelDt.oData.initidx !== "") {
                    dataModelDt.oData.initidx = "X"
                    this.onInit();
                    this.onAfterRendering();
                }
                else {
                    dataModelDt.oData.initidx = "X"
                }


            },
            onMain: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.initialize();

                //this.getOwnerComponent().getRouter().navTo("RouteMain");
                //var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
                oRouter.navTo("Routemain");
            },
            onOr: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.initialize();

                //this.getOwnerComponent().getRouter().navTo("RouteMain");
                //var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
                oRouter.navTo("RouteOr");
            },
            onSj: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.initialize();

                //this.getOwnerComponent().getRouter().navTo("RouteMain");
                //var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
                oRouter.navTo("RouteSj");
            },
            onSl: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.initialize();

                //this.getOwnerComponent().getRouter().navTo("RouteMain");
                //var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
                oRouter.navTo("RouteSl");
            },
            onSt: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.initialize();

                //this.getOwnerComponent().getRouter().navTo("RouteMain");
                //var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
                oRouter.navTo("RouteSt");
            },
            onPoc: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.initialize();

                //this.getOwnerComponent().getRouter().navTo("RouteMain");
                //var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
                oRouter.navTo("RoutePoc");
            },
            setBtn: function (dataModelOr, dataModelMain, oView) {
                oView.byId("btnGoToDt").setEnabled(false);
                var btnOr = dataModelMain.oData.valBtnOr['stat'];
                if (btnOr !== "X") {
                    oView.byId("btnGoToOr").setEnabled(false);
                }
                else {
                    oView.byId("btnGoToOr").setEnabled(true);
                }
                var btnSj = dataModelMain.oData.valBtnSj['stat'];
                if (btnSj !== "X") {
                    oView.byId("btnGoToSj").setEnabled(false);
                }
                else {
                    oView.byId("btnGoToSj").setEnabled(true);
                }
                var btnSl = dataModelMain.oData.valBtnSl['stat'];
                if (btnSl !== "X") {
                    oView.byId("btnGoToSl").setEnabled(false);
                }
                else {
                    oView.byId("btnGoToSl").setEnabled(true);
                }
                var btnSt = dataModelMain.oData.valBtnSt['stat'];
                if (btnSt !== "X") {
                    oView.byId("btnGoToSt").setEnabled(false);
                }
                else {
                    oView.byId("btnGoToSt").setEnabled(true);
                }
                var btnPoc = dataModelMain.oData.valBtnPoc['stat'];
                if (btnPoc !== "X") {
                    oView.byId("btnGoToPoc").setEnabled(false);
                }
                else {
                    oView.byId("btnGoToPoc").setEnabled(true);
                }
            }

        });
    });
