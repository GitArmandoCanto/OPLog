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

        return Controller.extend("nmspoplog.oplog.controller.ctrSanL", {
            onInit: function () {

                sap.ui.core.BusyIndicator.show();

                //#region MODEL
                var oJSON = {
                    cbx_tooltip: "To change: Click the \n\r drop-down arrow \n\r and make selection.",
                    rmk_tooltip: "Enter exceptions and remarks.  \n\rThis field will expand  \n\rto accommodate your text.",

                    val_mandt: "",          //Client
                    val_date: "",           //Today's Date M/D/YY
                    val_dateRmrk: "",       //Today's Date YYYYMMDD
                    val_opname: "",         //Operator Name
                    val_DbOpname: "",       //user name

                    val_RSRY: "",           //Reservoir Status: Rain Year to Date
                    val_DMP: "",            //DAPP: Pumped Month
                    val_GIPPM: "",          //GIPP: Pumped Month
                    val_GIPPRM: "",         //GIPP: Released Month
                    val_USBRM: "",          //USBR Plant Status: O'Neill Pumped Month
                    val_USBRRM: "",         //USBR Plant Status: O'Neill Released Month
                    val_USBRPM: "",         //USBR Plant Status: San Felipe Pumped Month

                    //Jurisdiction and Control - California Aqueduct Control In
                    lst_AquedCtrl: [
                        {
                            key: "itm_AquedCtrl_1",
                            text: "SLFD"
                        },
                        {
                            key: "itm_AquedCtrl_2",
                            text: "POC"
                        }
                    ],
                    itm_selAquedCtrl: "",

                    //Jurisdiction and Control - Plant Control In
                    lst_PlntCtrl: [
                        {
                            key: "itm_PlntCtrl_1",
                            text: "SLFD"
                        },
                        {
                            key: "itm_PlntCtrl_2",
                            text: "POC"
                        }
                    ],
                    itm_selPlntCtrl: "",

                    //Security Threat Levels - National
                    val_secColor: "",
                    val_SecThreatLvls_nat: "",
                    lst_SecThreatLvls_nat: [
                        {
                            key: "itm_SecThreatLvls_nat_1",
                            text: "NORMAL"
                        },
                        {
                            key: "itm_SecThreatLvls_nat_2",
                            text: "ELEVATED"
                        },
                        {
                            key: "itm_SecThreatLvls_nat_3",
                            text: "IMMINENT"
                        },
                        
                        {
                            key: "itm_SecThreatLvls_nat_4",
                            text: "GREEN"
                        },
                        
                        {
                            key: "itm_SecThreatLvls_nat_5",
                            text: "BLUE"
                        },
                        
                        {
                            key: "itm_SecThreatLvls_nat_6",
                            text: "YELLOW"
                        },
                        
                        {
                            key: "itm_SecThreatLvls_nat_7",
                            text: "ORANGE"
                        },
                        
                        {
                            key: "itm_SecThreatLvls_nat_8",
                            text: "RED"
                        },
                    ],

                    //Security Threat Levels - DWR
                    val_SecThreatLvls_dwr: "",
                    lst_SecThreatLvls_dwr: [
                        {
                            key: "itm_SecThreatLvls_dwr_1",
                            text: "NORMAL"
                        },
                        {
                            key: "itm_SecThreatLvls_dwr_2",
                            text: "ELEVATED"
                        },
                        {
                            key: "itm_SecThreatLvls_dwr_3",
                            text: "IMMINENT"
                        },
                        {
                            key: "itm_SecThreatLvls_dwr_4",
                            text: "1"
                        },
                        {
                            key: "itm_SecThreatLvls_dwr_5",
                            text: "2"
                        },
                        {
                            key: "itm_SecThreatLvls_dwr_6",
                            text: "3"
                        },
                        {
                            key: "itm_SecThreatLvls_dwr_7",
                            text: "4"
                        }
                    ],

                    val_RS_SL_Res_Elev: "",         //SL Reservoir - Elevation
                    val_RS_SL_Res_Stor: "",         //SL Reservoir - Storage

                    val_RS_OFb_Elev: "",            //O'Neill Forebay - Elevation
                    val_RS_OFb_Stor: "",            //O'Neill Forebay - Storage

                    val_RS_Rain_L24h: "",           //Rain - Last 24 hours
                    val_RS_Rain_YTD: "",            //Rain - YTD

                    val_RS_LBDD_Elev: "",           //LBDD -  Elevation
                    val_RS_LBDD_Stor: "",           //LBDD - Storage
                    val_RS_LBDD_Rel: "",            //LBDD - Releasing

                    val_RS_LPDD_Elev: "",           //LPDD - Elevation
                    val_RS_LPDD_Stor: "",           //LPDD - Storage
                    val_RS_LPDD_Spill: "",          //Spilling

                    val_DAPP_P_L24h: "",            //DAPP Pumped - Last 24 hours
                    val_DAPP_P_Month: "",           //DAPP Pumped - Month

                    val_GPGP_P_L24h: "",            //GPGP Pumped - Last 24 hours
                    val_GPGP_P_Month: "",           //GPGP Pumped - Month

                    val_GPGP_R_L24h: "",            //GPGP Released - Last 24 hours
                    val_GPGP_R_Month: "",           //GPGP Released - Month

                    val_GPGP_GI_Unit: "",           //GI Units at Head of

                    val_Gen_Rated_1a: "",           //Generate (Rated) - 1 & 5 (cfs)
                    val_Gen_Rated_1b: "",           //Generate (Rated) - 1 & 5 (mw)

                    val_Gen_Rated_2a: "",           //Generate (Rated) - 2, 3, 4, 6, 7, and 8 (cfs)
                    val_Gen_Rated_2b: "",           //Generate (Rated) - 2, 3, 4, 6, 7, and 8 (mw)

                    val_Pump_Rated_1a: "",          //Pumped (Rated) - 1 & 5 (cfs)
                    val_Pump_Rated_1b: "",          //Pumped (Rated) - 1 & 5 (mw)

                    val_Pump_Rated_2a: "",          //Pumped (Rated) - 2, 3, 4, 6, 7, and 8 (cfs)
                    val_Pump_Rated_2b: "",          //Pumped (Rated) - 2, 3, 4, 6, 7, and 8 (mw)

                    val_AS_Check12a: "",            //Aqueduct Status - Check #12 (cfs)
                    val_AS_Check12b: "",            //Aqueduct Status - Check #12 (af 24 hrs)

                    val_AS_Check21a: "",            //Aqueduct Status - Check #21 (cfs)
                    val_AS_Check21b: "",            //Aqueduct Status - Check #21 (af 24 hrs)

                    val_AS_DTP_14_21: "",           //Delivered Through Pools 14–21

                    //Flood Water Inflow for Past 24 Hours
                    val_FI_Little_Pan_Mile: "",     //Little Panoche - Mile 96.57
                    val_FI_Cantua_Mile: "",         //Cantua - Mile 133.67
                    val_FI_New_Cantua_Mile: "",     //New Cantua - Mile 134.81
                    val_FI_Cantua_Salt_Mile: "",    //Cantua/Salt - Mile 134.95
                    val_FI_Salt_Mile: "",           //Salt - Mile 136.00
                    val_FI_GaleAve_Gate_Mile: "",   //Gale Ave. Gates - Mile 158.30
                    val_FI_Total_Drain_Inlet: "",   //Total Drain Inlets
                    val_FI_Total_Fld_Pump_In: "",   //Total Flood Water Pump-In

                    //USBR Plant Status
                    val_USBR_PS_ONeill_Pump_L24h: "",   //O'Neill Pumped - Last 24 Hours
                    val_USBR_PS_ONeill_Pump_Month: "",  //O'Neill Pumped - Month
                    val_USBR_PS_ONeill_Rel_L24h: "",    //O'Neill Released - Last 24 Hours
                    val_USBR_PS_ONeill_Rel_Month: "",   //O'Neill Released - Month
                    val_San_Fel_Pump_L24h: "",          //San Felipe Pumped - Last 24 Hours
                    val_San_Fel_Pump_Month: "",         //San Felipe Pumped - Month               

                }
                //#endregion MODEL

                var oJSONModel = new sap.ui.model.json.JSONModel();
                //oJSONModel.setData(null);
                oJSONModel.setData(oJSON);
                var oView = this.getView("sanL");
                oView.setModel(oJSONModel);

                var view = this.getView("sanL");
                var model = oJSONModel;

                var dataModelSl = this.getOwnerComponent().getModel("dataSl");//Will contain data mapped from the ODATA services
                var dataModelMain = this.getOwnerComponent().getModel("dataMain");//Will contain data mapped from the ODATA services
                //var i18Bundle = oView.getModel("i18n").getResourceBundle();
                //var servOk = "";
                //var models = oView.getModel("models").getResourceBundle();
                if (dataModelSl.oData.init !== "X") {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.getRoute("RouteSl").attachMatched(this._onRouteMatched, this);
                }

                this.setBtn(dataModelSl, dataModelMain, view);

                //var i18Bundle = oView.getModel("i18n").getResourceBundle();
                var servOk = "";

                //----------------------------------------------------------------------
                //Today's Date for the header M/D/YY
                var oDateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "M/d/yy"
                });
                var today = oDateFormat1.format(new Date());
                //this.getView("sanL").byId("lbl_hddate").setText(today);

                //Today's Date YYYYMMDD
                var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "yyyyMMdd"
                });
                var todayRmrk = oDateFormat.format(new Date());

                //Format the number - max 8 digits with no decimal value 
                var oNumberFormat_int = sap.ui.core.format.NumberFormat.getFloatInstance({
                    maxIntegerDigits: 8,
                    maxFractionDigits: 0,
                    groupingEnabled: true,
                    groupingSeparator: ",",
                    decimalSeparator: ".",
                });

                //Format the number - max 6 digits with two decimal values
                var oNumberFormat_dec = sap.ui.core.format.NumberFormat.getFloatInstance({
                    maxIntegerDigits: 6,
                    maxFractionDigits: 2,
                    minFractionDigits: 2,
                    groupingEnabled: true,
                    groupingSeparator: ",",
                    decimalSeparator: ".",
                });

                //----------------------------------------------------------------------  
                //Add the decimal values automatically           
                var object;
                object = this.getView("sanL").byId("ipt_RS_SL_Res_Elev");
                var decAll = 0;
                decAll = this.getDecAll(object)
                this.addEvent(object, "ipt_RS_SL_Res_Elev", "val_RS_SL_Res_Elev", decAll);

                var object;
                object = this.getView("sanL").byId("ipt_RS_OFb_Elev");
                var decAll = 0;
                decAll = this.getDecAll(object)
                this.addEvent(object, "ipt_RS_OFb_Elev", "val_RS_OFb_Elev", decAll);

                var object;
                object = this.getView("sanL").byId("ipt_RS_Rain_L24h");
                var decAll = 0;
                decAll = this.getDecAll(object)
                this.addEvent(object, "ipt_RS_Rain_L24h", "val_RS_Rain_L24h", decAll);

                var object;
                object = this.getView("sanL").byId("ipt_RS_LBDD_Elev");
                var decAll = 0;
                decAll = this.getDecAll(object)
                this.addEvent(object, "ipt_RS_LBDD_Elev", "val_RS_LBDD_Elev", decAll);

                var object;
                object = this.getView("sanL").byId("ipt_RS_LPDD_Elev");
                var decAll = 0;
                decAll = this.getDecAll(object)
                this.addEvent(object, "ipt_RS_LPDD_Elev", "val_RS_LPDD_Elev", decAll);

                var object;
                object = this.getView("sanL").byId("ipt_GPGP_GI_Unit");
                var decAll = 0;
                decAll = this.getDecAll(object)
                this.addEvent(object, "ipt_GPGP_GI_Unit", "val_GPGP_GI_Unit", decAll);

                //----------------------------------------------------------------------
                //Catalogue Service
                var serviceUsrUrl = "/sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/";
                var UsrModel = new sap.ui.model.odata.ODataModel(serviceUsrUrl, true);
                if (!(typeof UsrModel === "undefined") || !(typeof UsrModel === "null")) {

                    UsrModel.read("/USER_ADDRSet", {

                        success: function (oData, oResponse) {
                            //User Name
                            var UsrData = oData;
                            var UsrResp = oResponse;

                            //Catalogue Service
                            var servicetbl1Url = "/sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/";
                            var Tbl1Model = new sap.ui.model.odata.ODataModel(servicetbl1Url, true);
                            var Tbl1Data = "";
                            if (!(typeof Tbl1Model === "undefined") || !(typeof Tbl1Model === "null")) {

                                Tbl1Model.read("/WcdByDivision", {
                                    urlParameters: {
                                        "Div": "'WRSL'"
                                    },
                                    success: function (oData, oResponse) {
                                        //WCD Data
                                        Tbl1Data = oData;
                                        var Tbl1Resp = oResponse;

                                        //Catalogue Service
                                        var servicetbl2Url = "/sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/";
                                        var Tbl2Model = new sap.ui.model.odata.ODataModel(servicetbl2Url, true);
                                        if (!(typeof Tbl2Model === "undefined") || !(typeof Tbl2Model === "null")) {

                                            Tbl2Model.read("/UnitStatDivision", {
                                                urlParameters: {
                                                    "Divis": "'WRSL'"
                                                },
                                                success: function (oData, oResponse) {
                                                    //Unit Status Data
                                                    var Tbl2Data = oData;
                                                    var Tbl2Resp = oResponse;

                                                    //Remark Service
                                                    var serviceRmrksUrl = "/sap/opu/odata/sap/ZODATA_MC_MULTDIV_REMARK_OPLOG_SRV/";
                                                    var RmrksModel = new sap.ui.model.odata.ODataModel(serviceRmrksUrl, true);
                                                    var RmrksData = "";
                                                    if (!(typeof RmrksModel === "undefined") || !(typeof RmrksModel === "null")) {

                                                        //RmrksModel.read("/ZWCM_MC_WRSL_REMARKSSet", {
                                                        RmrksModel.read("/Sanluis", {
                                                            urlParameters: {
                                                                "SanLuisdate": dataModelMain.oData.valParamDate
                                                            },

                                                            success: function (oData, oResponse) {
                                                                //Remarks Data
                                                                RmrksData = oData;
                                                                var RmrksResp = oResponse;

                                                                //WRSL Main Table
                                                                var sserviceurl = "/sap/opu/odata/sap/ZODATA_MC_MULTDIV_OPLOG_SRV/";
                                                                var oModel = new sap.ui.model.odata.ODataModel(sserviceurl, true);
                                                                if (!(typeof oModel === "undefined") || !(typeof oModel === "null")) {

                                                                    var OjsonModel = new sap.ui.model.json.JSONModel();

                                                                    //oModel.read("/ZSWCM_MC_WRSLSet", {
                                                                    oModel.read("/SanLuis", {
                                                                        urlParameters: {
                                                                            "Sanluisdate": dataModelMain.oData.valParamDate
                                                                        },

                                                                        success: function (oData, oResponse) {

                                                                            var data = oData;
                                                                            var resp = oResponse;
                                                                            servOk = "X";
                                                                            var ctrllr = oView.getController();
                                                                            var obj = "";
                                                                            var date = dataModelMain.oData.valNoLogDate;

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
                                                                                        "Division": "'WRSL'",
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


                                                                                        //var Ctrller = sap.ui.getCore().byId("delta").getController();
                                                                                        // create JSON model
                                                                                        if (data.results.length === 0) {
                                                                                            sap.ui.core.BusyIndicator.hide();
                                                                                            MessageBox.warning("No Log found.\n\r" +
                                                                                                "Please check the date " + date);
                                                                                            //oView.byId("chk_DvppTier1").setSelected(false);


                                                                                        }
                                                                                        else {

                                                                                            //if (data.results[0].Mcdate === oDateFormat.format(new Date())) {
                                                                                            //    var btnSb = oView.byId("btn_Submit");
                                                                                            //    btnSb.setEnabled(false);
                                                                                            //    MessageBox.warning("This form has been successfully submitted.\n\r" +
                                                                                            //        "No other midnight condition report for this date may be created or submitted");
                                                                                            //    model.setProperty("/valSubmitted", "This form has been submitted")
                                                                                            //}

                                                                                            var oODataJSONModel = new sap.ui.model.json.JSONModel();
                                                                                            var logDate = oData.results[0].Mcdate.substring(4, 6) + "/" + oData.results[0].Mcdate.substring(6, 8) + "/" + oData.results[0].Mcdate.substring(0, 4);
                                                                                            model.setProperty("/val_mandt", oData.results[0].Mandt);
                                                                                            model.setProperty("/val_opname", oData.results[0].Uname);
                                                                                            model.setProperty("/val_DbOpname", UsrData.results[0].Bname);
                                                                                            model.setProperty("/val_date", today);
                                                                                            model.setProperty("/val_dateRmrk", todayRmrk);
                                                                                            model.setProperty("/val_log_table", opLogData);//OPLOG
                                                                                            oView.byId("lbl_hddate").setText(logDate);

                                                                                            //California Aqueduct Control In
                                                                                            switch (oData.results[0].Cacin) {
                                                                                                case "SLFD":
                                                                                                    model.setProperty("/itm_selAquedCtrl", "itm_AquedCtrl_1");
                                                                                                    break;
                                                                                                case "POC":
                                                                                                    model.setProperty("/itm_selAquedCtrl", "itm_AquedCtrl_2");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/itm_selAquedCtrl", "");
                                                                                                    break;
                                                                                            }

                                                                                            //Plant Control In
                                                                                            switch (oData.results[0].Pci) {
                                                                                                case "SLFD":
                                                                                                    model.setProperty("/itm_selPlntCtrl", "itm_PlntCtrl_1");
                                                                                                    break;
                                                                                                case "POC":
                                                                                                    model.setProperty("/itm_selPlntCtrl", "itm_PlntCtrl_2");
                                                                                                    break;
                                                                                                default:
                                                                                                    model.setProperty("/itm_selPlntCtrl", "");
                                                                                                    break;
                                                                                            }

                                                                                            //Security Threat Levels
                                                                                            var iconSec = oView.byId("SecThr_color");
                                                                                            var iconDWR = oView.byId("SecDwr_color");
                                                                                            switch (oData.results[0].Natsec) {
                                                                                                case "NORMAL":
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "itm_SecThreatLvls_nat_1");
                                                                                                    iconSec.setBackgroundColor("green");
                                                                                                    iconSec.setColor("green");
                                                                                                    break;
                                                                                                case "ELEVATED":
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "itm_SecThreatLvls_nat_2");
                                                                                                    iconSec.setBackgroundColor("orange");
                                                                                                    iconSec.setColor("orange");
                                                                                                    break;
                                                                                                case "IMMINENT":
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "itm_SecThreatLvls_nat_3");
                                                                                                    iconSec.setBackgroundColor("red");
                                                                                                    iconSec.setColor("red");
                                                                                                    break;
                                                                                                case "GREEN":
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "itm_SecThreatLvls_nat_4");
                                                                                                    iconSec.setBackgroundColor("");
                                                                                                    iconSec.setColor("");
                                                                                                    //var lbl = view.byId("lbl_SecThreatLvls_color");
                                                                                                    //lbl.addStyleClass("cbx_red");
                                                                                                    break;
                                                                                                case "BLUE":
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "itm_SecThreatLvls_nat_5");
                                                                                                    iconSec.setBackgroundColor("");
                                                                                                    iconSec.setColor("");
                                                                                                    break;
                                                                                                case "YELLOW":
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "itm_SecThreatLvls_nat_6");
                                                                                                    iconSec.setBackgroundColor("");
                                                                                                    iconSec.setColor("");
                                                                                                    break;
                                                                                                case "ORANGE":
                                                                                                    model.setProperty("/val_SecThreatLvls_nat", "itm_SecThreatLvls_nat_7");
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
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "itm_SecThreatLvls_dwr_1");
                                                                                                    iconDWR.setBackgroundColor("green");
                                                                                                    iconDWR.setColor("green");

                                                                                                    break;
                                                                                                case "ELEVATED":
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "itm_SecThreatLvls_dwr_2");
                                                                                                    iconDWR.setBackgroundColor("orange");
                                                                                                    iconDWR.setColor("orange");

                                                                                                    break;
                                                                                                case "IMMINENT":
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "itm_SecThreatLvls_dwr_3");
                                                                                                    iconDWR.setBackgroundColor("red");
                                                                                                    iconDWR.setColor("red");
                                                                                                    break;
                                                                                                case "1":
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "itm_SecThreatLvls_dwr_4");
                                                                                                    iconDWR.setBackgroundColor("");
                                                                                                    iconDWR.setColor("");
                                                                                                    break;
                                                                                                case "2":
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "itm_SecThreatLvls_dwr_5");
                                                                                                    iconDWR.setBackgroundColor("");
                                                                                                    iconDWR.setColor("");
                                                                                                    break;
                                                                                                case "3":
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "itm_SecThreatLvls_dwr_6");
                                                                                                    iconDWR.setBackgroundColor("");
                                                                                                    iconDWR.setColor("");
                                                                                                    break;
                                                                                                case "4":
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "itm_SecThreatLvls_dwr_7");
                                                                                                    iconDWR.setBackgroundColor("");
                                                                                                    iconDWR.setColor("");
                                                                                                    break;

                                                                                                default:
                                                                                                    model.setProperty("/val_SecThreatLvls_dwr", "");
                                                                                                    iconDWR.setBackgroundColor("");
                                                                                                    iconDWR.setColor("");
                                                                                                    break;
                                                                                            }

                                                                                            //Hidden fields
                                                                                            obj = oView.byId("ipt_RSRY");
                                                                                            model.setProperty("/val_RSRY", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Rsry));

                                                                                            obj = oView.byId("ipt_DMP");
                                                                                            model.setProperty("/val_DMP", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Dmp));

                                                                                            obj = oView.byId("ipt_GIPPM");
                                                                                            model.setProperty("/val_GIPPM", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Gippm));

                                                                                            obj = oView.byId("ipt_GIPPRM");
                                                                                            model.setProperty("/val_GIPPRM", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Gipprm));

                                                                                            obj = oView.byId("ipt_USBRM");
                                                                                            model.setProperty("/val_USBRM", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Usbrm));

                                                                                            obj = oView.byId("ipt_USBRRM");
                                                                                            model.setProperty("/val_USBRRM", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Usbrrm));

                                                                                            obj = oView.byId("ipt_USBRPM");
                                                                                            model.setProperty("/val_USBRPM", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Usbrpm));

                                                                                            //----------------------------------------------------------
                                                                                            obj = oView.byId("ipt_RS_SL_Res_Elev");
                                                                                            model.setProperty("/val_RS_SL_Res_Elev", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Rssre));

                                                                                            obj = oView.byId("ipt_RS_SL_Res_Stor");
                                                                                            model.setProperty("/val_RS_SL_Res_Stor", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Rssrs));

                                                                                            obj = oView.byId("ipt_RS_OFb_Elev");
                                                                                            model.setProperty("/val_RS_OFb_Elev", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Rosfe));

                                                                                            obj = oView.byId("ipt_RS_OFb_Stor");
                                                                                            model.setProperty("/val_RS_OFb_Stor", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Rsofs));

                                                                                            obj = oView.byId("ipt_RS_Rain_L24h");
                                                                                            model.setProperty("/val_RS_Rain_L24h", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Rsrl));

                                                                                            //Rain YTD
                                                                                            var temp_Rsry = Number(oData.results[0].Rsry);
                                                                                            var temp_Rsrl = Number(oData.results[0].Rsrl);
                                                                                            var val_Rsryub = temp_Rsry + temp_Rsrl;
                                                                                            model.setProperty("/val_RS_Rain_YTD", oNumberFormat_dec.format(val_Rsryub));

                                                                                            obj = oView.byId("ipt_RS_LBDD_Elev");
                                                                                            model.setProperty("/val_RS_LBDD_Elev", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Rslbe));

                                                                                            obj = oView.byId("ipt_RS_LBDD_Stor");
                                                                                            model.setProperty("/val_RS_LBDD_Stor", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Rsls));

                                                                                            obj = oView.byId("ipt_RS_LBDD_Rel");
                                                                                            model.setProperty("/val_RS_LBDD_Rel", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Rslr));

                                                                                            obj = oView.byId("ipt_RS_LPDD_Elev");
                                                                                            model.setProperty("/val_RS_LPDD_Elev", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Rslpe));

                                                                                            obj = oView.byId("ipt_RS_LPDD_Stor");
                                                                                            model.setProperty("/val_RS_LPDD_Stor", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Rslps));

                                                                                            obj = oView.byId("ipt_RS_LPDD_Spill");
                                                                                            model.setProperty("/val_RS_LPDD_Spill", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Rslpsp));

                                                                                            obj = oView.byId("ipt_DAPP_P_L24h");
                                                                                            model.setProperty("/val_DAPP_P_L24h", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Dpl));

                                                                                            //DAPP Pumped Month
                                                                                            var temp_Dmp = Number(oData.results[0].Dmp);
                                                                                            var temp_Dpl = Number(oData.results[0].Dpl);
                                                                                            var val_Dmpub = temp_Dmp + temp_Dpl;
                                                                                            model.setProperty("/val_DAPP_P_Month", oNumberFormat_int.format(val_Dmpub));

                                                                                            //DAPP Remarks
                                                                                            model.setProperty("/val_DAPP_pltswyd_remarks", RmrksData.results[0].Dappp);
                                                                                            model.setProperty("/val_DAPP_RestrtLimit_remarks", RmrksData.results[0].Dappu);
                                                                                            model.setProperty("/val_DAPP_T_DA_Sched_remarks", RmrksData.results[0].Dappt);

                                                                                            obj = oView.byId("ipt_GPGP_P_L24h");
                                                                                            model.setProperty("/val_GPGP_P_L24h", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Gippl));

                                                                                            //GPGP Pumped Month
                                                                                            var temp_Gippm = Number(oData.results[0].Gippm);
                                                                                            var temp_Gippl = Number(oData.results[0].Gippl);
                                                                                            var val_Gippmub = temp_Gippm + temp_Gippl;
                                                                                            model.setProperty("/val_GPGP_P_Month", oNumberFormat_int.format(val_Gippmub));

                                                                                            obj = oView.byId("ipt_GPGP_R_L24h");
                                                                                            model.setProperty("/val_GPGP_R_L24h", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Gipprl));

                                                                                            //GPGP Released Month 
                                                                                            var temp_Gipprm = Number(oData.results[0].Gipprm);
                                                                                            var temp_Gipprl = Number(oData.results[0].Gipprl);
                                                                                            var val_Gipprmub = temp_Gipprm + temp_Gipprl;
                                                                                            model.setProperty("/val_GPGP_R_Month", oNumberFormat_int.format(val_Gipprmub));

                                                                                            //GPGP Remarks
                                                                                            model.setProperty("/val_GPGP_pltSwyd_remarks", RmrksData.results[0].Gippu);
                                                                                            model.setProperty("/val_GPGP_RestrtLimit_remarks", RmrksData.results[0].Gippp);
                                                                                            model.setProperty("/val_GPGP_T_GI_SchedNumb_remarks", RmrksData.results[0].Gippt);

                                                                                            obj = oView.byId("ipt_GPGP_GI_Unit");
                                                                                            model.setProperty("/val_GPGP_GI_Unit", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Gippg));

                                                                                            obj = oView.byId("ipt_Gen_Rated_1a");
                                                                                            model.setProperty("/val_Gen_Rated_1a", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Gippg1cfs));

                                                                                            obj = oView.byId("ipt_Gen_Rated_1b");
                                                                                            model.setProperty("/val_Gen_Rated_1b", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Gippg1mw));

                                                                                            obj = oView.byId("ipt_Gen_Rated_2a");
                                                                                            model.setProperty("/val_Gen_Rated_2a", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Gippg2cfs));

                                                                                            obj = oView.byId("ipt_Gen_Rated_2b");
                                                                                            model.setProperty("/val_Gen_Rated_2b", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Gippg2mw));

                                                                                            obj = oView.byId("ipt_Pump_Rated_1a");
                                                                                            model.setProperty("/val_Pump_Rated_1a", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Gippp1cfs));

                                                                                            obj = oView.byId("ipt_Pump_Rated_1b");
                                                                                            model.setProperty("/val_Pump_Rated_1b", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Gippp1mw));

                                                                                            obj = oView.byId("ipt_Pump_Rated_2a");
                                                                                            model.setProperty("/val_Pump_Rated_2a", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Gippp2cfs));

                                                                                            obj = oView.byId("ipt_Pump_Rated_2b");
                                                                                            model.setProperty("/val_Pump_Rated_2b", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Gippp2mw));

                                                                                            obj = oView.byId("ipt_AS_Check12a");
                                                                                            model.setProperty("/val_AS_Check12a", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Asccfs));

                                                                                            obj = oView.byId("ipt_AS_Check12b");
                                                                                            model.setProperty("/val_AS_Check12b", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Aschrs));

                                                                                            obj = oView.byId("ipt_AS_Check21a");
                                                                                            model.setProperty("/val_AS_Check21a", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Asc21cfs));

                                                                                            obj = oView.byId("ipt_AS_Check21b");
                                                                                            model.setProperty("/val_AS_Check21b", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Asc21hrs));

                                                                                            obj = oView.byId("ipt_AS_DTP_14_21");
                                                                                            model.setProperty("/val_AS_DTP_14_21", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Asd));

                                                                                            //Aqueduct Status Remarks
                                                                                            model.setProperty("/val_AS_RestrtLimit_remarks", RmrksData.results[0].Asrl);

                                                                                            obj = oView.byId("ipt_FI_Little_Pan_Mile");
                                                                                            model.setProperty("/val_FI_Little_Pan_Mile", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Fwlp));

                                                                                            obj = oView.byId("ipt_FI_Cantua_Mile");
                                                                                            model.setProperty("/val_FI_Cantua_Mile", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Fwc));

                                                                                            obj = oView.byId("ipt_FI_New_Cantua_Mile");
                                                                                            model.setProperty("/val_FI_New_Cantua_Mile", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Fwnc));

                                                                                            obj = oView.byId("ipt_FI_Cantua_Salt_Mile");
                                                                                            model.setProperty("/val_FI_Cantua_Salt_Mile", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Fwcs));

                                                                                            obj = oView.byId("ipt_FI_Salt_Mile");
                                                                                            model.setProperty("/val_FI_Salt_Mile", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Fwgg));

                                                                                            obj = oView.byId("ipt_FI_GaleAve_Gate_Mile");
                                                                                            model.setProperty("/val_FI_GaleAve_Gate_Mile", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Fwtd));

                                                                                            obj = oView.byId("ipt_FI_Total_Drain_Inlet");
                                                                                            model.setProperty("/val_FI_Total_Drain_Inlet", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Fwtf));

                                                                                            obj = oView.byId("ipt_FI_Total_Fld_Pump_In");
                                                                                            model.setProperty("/val_FI_Total_Fld_Pump_In", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Tfwtf));

                                                                                            obj = oView.byId("ipt_USBR_PS_ONeill_Pump_L24h");
                                                                                            model.setProperty("/val_USBR_PS_ONeill_Pump_L24h", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Usbrl));

                                                                                            //USBR Plant Status (O'Neill Pumped) Month
                                                                                            var temp_Usbrm = Number(oData.results[0].Usbrm);
                                                                                            var temp_Usbrl = Number(oData.results[0].Usbrl);
                                                                                            var val_Usbrmub = temp_Usbrm + temp_Usbrl;
                                                                                            model.setProperty("/val_USBR_PS_ONeill_Pump_Month", oNumberFormat_int.format(val_Usbrmub));

                                                                                            obj = oView.byId("ipt_USBR_PS_ONeill_Rel_L24h");
                                                                                            model.setProperty("/val_USBR_PS_ONeill_Rel_L24h", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Usbrrl));

                                                                                            //USBR Plant Status (O'Neill Released) Month 
                                                                                            var temp_Usbrrm = Number(oData.results[0].Usbrrm);
                                                                                            var temp_Usbrrl = Number(oData.results[0].Usbrrl);
                                                                                            var val_Usbrrmub = temp_Usbrrm + temp_Usbrrl;
                                                                                            model.setProperty("/val_USBR_PS_ONeill_Rel_Month", oNumberFormat_int.format(val_Usbrrmub));

                                                                                            obj = oView.byId("ipt_San_Fel_Pump_L24h");
                                                                                            model.setProperty("/val_San_Fel_Pump_L24h", ctrllr.InitialFormat(obj.data().digitsallowed,
                                                                                                obj.data().error, obj.data().decAllwd, obj.data().name, obj.data().val, "", oData.results[0].Usbrpl));

                                                                                            //USBR Plant Status (San Felipe Pumped) Month 
                                                                                            var temp_Usbrpm = Number(oData.results[0].Usbrpm);
                                                                                            var temp_Usbrpl = Number(oData.results[0].Usbrpl);
                                                                                            var val_Usbrpmub = temp_Usbrpm + temp_Usbrpl;
                                                                                            model.setProperty("/val_San_Fel_Pump_Month", oNumberFormat_int.format(val_Usbrpmub));

                                                                                            //--------------------------------------------------
                                                                                            //WCD and Plant/Unit Status Reportings
                                                                                            model.setProperty("/val_wcd_table", Tbl1Data.results);
                                                                                            model.setProperty("/val_plntt", Tbl2Data.results);

                                                                                            var tb1 = view.byId("wcd_table");
                                                                                            tb1.addStyleClass("table");

                                                                                            var itms = view.byId("colfunloc1");

                                                                                            var tab2 = view.byId("plnt_unit");

                                                                                            view.setModel(model);

                                                                                            sap.ui.core.BusyIndicator.hide();    //Hide the busy indicator
                                                                                        }

                                                                                    }, //End of success: function (oData, oResponse) for WRSL Main table

                                                                                    //******************//OPLOG LOGIC******************



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

                                                                        error: function () {
                                                                            sap.ui.core.BusyIndicator.hide();  //Hide the busy indicator

                                                                            sap.m.MessageBox.error("Conection Error:" + oResponse);
                                                                        }

                                                                    }, //End of oModel.read
                                                                        { async: false })
                                                                }
                                                                else {
                                                                    sap.ui.core.BusyIndicator.hide();  //Hide the busy indicator

                                                                    sap.m.MessageBox.error("Error with service: , /sap/opu/odata/sap/ZODATA_MC_WRSL_SRV/")
                                                                } //End of (!(typeof oModel === "undefined") || !(typeof oModel === "null"))

                                                            }, //End of success: function (oData, oResponse) for Remarks
                                                            error: function () {
                                                                sap.ui.core.BusyIndicator.hide();  //Hide the busy indicator

                                                                sap.m.MessageBox.error("Conection Error:" + oResponse);
                                                            }

                                                        }, //End of RmrksModel.read
                                                            { async: false })
                                                    }
                                                    else {
                                                        sap.ui.core.BusyIndicator.hide();  //Hide the busy indicator

                                                        sap.m.MessageBox.error("Error with service: , /sap/opu/odata/sap/ZODATA_MC_WRDTREM_SL_SRV/")
                                                    } //End of (!(typeof RmrksModel === "undefined") || !(typeof RmrksModel === "null"))

                                                }, //End of success: function (oData, oResponse) for Tbl2Model
                                                error: function () {
                                                    sap.ui.core.BusyIndicator.hide();  //Hide the busy indicator

                                                    sap.m.MessageBox.error("Conection Error:" + oResponse);
                                                }

                                            }, //End of Tbl2Model.read
                                                { async: false })
                                        }
                                        else {
                                            sap.ui.core.BusyIndicator.hide();  //Hide the busy indicator

                                            sap.m.MessageBox.error("Error with service: , /sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/")
                                        } //End of (!(typeof Tbl2Model === "undefined") || !(typeof Tbl2Model === "null"))

                                    }, //End of success: function (oData, oResponse) for Tbl1Model
                                    error: function () {
                                        sap.ui.core.BusyIndicator.hide();  //Hide the busy indicator

                                        sap.m.MessageBox.error("Conection Error:" + oResponse);
                                    }

                                }, //End of Tbl1Model.read 
                                    { async: false })
                            }
                            else {
                                sap.ui.core.BusyIndicator.hide();  //Hide the busy indicator

                                sap.m.MessageBox.error("Error with service: , /sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/")
                            } //End of (!(typeof Tbl1Model === "undefined") || !(typeof Tbl1Model === "null"))

                        }, //End of success: function (oData, oResponse) for UsrModel
                        error: function (oData, oResponse) {
                            sap.ui.core.BusyIndicator.hide();  //Hide the busy indicator

                            sap.m.MessageBox.error("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                        }

                    }, //End of UsrModel.read
                        { async: false })

                }
                else {
                    sap.ui.core.BusyIndicator.hide();  //Hide the busy indicator

                    sap.m.MessageBox.error("Error with service: /sap/opu/odata/sap/ZODATA_MC_CATALOGUES_C_SRV/")
                } //End of (!(typeof UsrModel === "undefined") || !(typeof UsrModel === "null"))

            },  //End of onInit: Function

            //----------------------------------------------------------------------
            InitialFormat: function (digAll, err, decall, name, val, psign, pValue) {

                var dig = digAll;
                var id = err;
                var decAllwd = decall;
                var obj_name = name;
                var obj_valId = val;
                var sign_allwd = psign;
                var value = pValue;

                var flag_dec = "";
                var sign = "";

                var oNumberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
                    maxFractionDigits: decAllwd,
                    groupingEnabled: true,
                    groupingSeparator: ",",
                    decimalSeparator: ".",
                    maxIntegerDigits: dig
                });

                var oJSON = {};

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

                if (value.includes(".")) {

                    var IntDec = value.split('.');

                    var netvalueint = IntDec[0].replace(/[^\d]/g, "");
                    var netvaluedec = IntDec[1].replace(/[^\d]/g, "");
                    flag_dec = "X";
                }
                else {

                    var value = value.replace(/[^\d]/g, "");
                    flag_dec = "";
                }

                if (typeof netvalueint !== "undefined") {

                    if (netvalueint.length > dig) {

                        if (decAllwd > 0) {
                            var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                " digit number with " + decAllwd + " decimal places." + "\n\r Please enter a proper value.";
                            oJSON[obj_valId] = "0";

                            format_value = "0";

                        }
                        else {
                            var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                " digit number." + "\n\r Please enter a proper value.";
                            oJSON[obj_valId] = "0";
                            format_value = "0";

                        }
                        sap.m.MessageBox.error(msgerror);
                    }
                    else {

                        if (netvalueint !== null & netvalueint !== "") {

                            if (netvaluedec !== null & netvaluedec !== "") {

                                value = netvalueint + '.' + netvaluedec;
                                var format_value = sign + oNumberFormat.format(value);
                            }
                            else {

                                var format_value = oNumberFormat.format(netvalueint);
                                format_value = sign + format_value + '.';
                            }
                        }
                        else {

                            if (netvaluedec !== null & netvaluedec !== "") {
                                value = '.' + netvaluedec;
                                var format_value = sign + oNumberFormat.format(value);
                            }
                            else {

                                var format_value = sign + '.';
                            }
                        }
                    }
                }

                else {
                    if (value.length > dig) {

                        if (decAllwd > 0) {
                            var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                " digit number with " + decAllwd + " decimal places." + "\n\r Please enter a proper value.";
                            oJSON[obj_valId] = "0";
                            format_value = "0";

                        }
                        else {
                            var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                " digit number. " + "\n\r Please enter a proper value.";
                            oJSON[obj_valId] = "0";
                            format_value = "0";

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

                oJSON[(obj_valId)] = format_value;

                return format_value;

            },  //End of InitialFormat: function (digAll, err, decall, name, val, psign, pValue)

            //----------------------------------------------------------------------
            OnCbxChng: function (evt) {

                var view = this.getView("sanL");
                var model = view.getModel();
                var secIcon = view.byId(evt.getSource().data("icon"));
                var cbxId = evt.getSource().data("cbxName");
                var dataSrc = evt.getSource().data("dataSource");
                var selKey = evt.getSource().data("selkey");
                var cbx = view.byId([cbxId]);
                var cbxJson = view.getModel().getData();
                var list = cbxJson[dataSrc];
                var flag = "";

                //Validate input value - any input value entered by user must match the value from the dropdown list
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

                //Security Threat Levels
                if (cbxId === "cbx_SecThreatLvls_nat" || cbxId === "cbx_SecThreatLvls_dwr") {
                    var val = cbx._getSelectedItemText();
                    switch (val) {
                        case "NORMAL":
                            secIcon.setBackgroundColor("green");
                            secIcon.setColor("green");
                            break;
                        case "ELEVATED":
                            secIcon.setBackgroundColor("orange");
                            secIcon.setColor("orange");
                            break;
                        case "IMMINENT":
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

            }, //End of OnCbxChng: function (evt)

            //----------------------------------------------------------------------
            OnChange_storage: function (evt) {

                var dig = evt.getSource().data("digitsallowed");
                var id = evt.getSource().data("error");
                var decAllwd = evt.getSource().data("decAllwd");
                var obj_name = evt.getSource().data("name");
                var obj_valId = evt.getSource().data("val");
                var sign_allwd = evt.getSource().data("sign");

                var flag_dec = "";
                var sign = "";

                var oNumberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
                    maxFractionDigits: decAllwd,
                    groupingEnabled: true,
                    groupingSeparator: ",",
                    decimalSeparator: ".",
                    maxIntegerDigits: dig
                });

                var viewOnChange = this.getView("sanL");
                var Model_view = viewOnChange.getModel();
                var json_data = Model_view.getData();

                var value = evt.getSource().getValue();
                Model_view.setData(null);

                if ((value.substring(0, 1).includes("+") || value.substring(0, 1).includes("-")) && sign_allwd === "X") {
                    switch (value.substring(0, 1)) {
                        case "-":
                            sign = "-";
                            break;
                        default:
                            break;
                    }
                }

                if (value.includes(".")) {
                    var IntDec = value.split('.');
                    var netvalueint = IntDec[0].replace(/[^\d]/g, "");
                    var netvaluedec = IntDec[1].replace(/[^\d]/g, "");
                    flag_dec = "X";
                }
                else {
                    var value = value.replace(/[^\d]/g, "");
                    flag_dec = "";
                }

                if ((flag_dec === "X" && decAllwd != "") || flag_dec === "") {

                    if (typeof netvalueint !== "undefined") {
                        if (netvalueint.length > dig) {
                            if (decAllwd > 0) {
                                if (decAllwd === "1") {
                                    var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                        " digit number with " + decAllwd + " decimal place." + "\n\r Please enter a proper value.";
                                    json_data[obj_valId] = "";

                                    format_value = "";
                                }
                                else {
                                    var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                        " digit number with " + decAllwd + " decimal places." + "\n\r Please enter a proper value.";
                                    json_data[obj_valId] = "";

                                    format_value = "";
                                }
                            }
                            else {
                                var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                    " digit number." + "\n\r Please enter a proper value.";
                                json_data[obj_valId] = "";
                                format_value = "";
                            }
                            sap.m.MessageBox.error(msgerror);
                        }
                        else {
                            if (netvalueint !== null & netvalueint !== "") {
                                if ((netvaluedec !== null && netvaluedec !== "" && netvaluedec !== undefined)) {
                                    value = netvalueint + '.' + netvaluedec;
                                    var format_value = sign + oNumberFormat.format(value);
                                }
                                else {
                                    var format_value = oNumberFormat.format(netvalueint);
                                    if (decAllwd != "") {
                                        format_value = sign + format_value + ".";
                                    }
                                    else {
                                        format_value = sign + format_value;
                                    }
                                }
                            }
                            else {
                                if (netvaluedec !== null & netvaluedec !== "") {
                                    value = '.' + netvaluedec;
                                    var format_value = sign + oNumberFormat.format(value);
                                }
                                else {
                                    var format_value = sign + '.';
                                }
                            }
                        }
                    }
                    else {
                        if (value.length > dig) {
                            if (decAllwd > 0) {
                                if (decAllwd === "1") {
                                    var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                        " digit number with " + decAllwd + " decimal place." + "\n\r Please enter a proper value.";
                                    json_data[obj_valId] = "";

                                    format_value = "";
                                }
                                else {
                                    var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                        " digit number with " + decAllwd + " decimal places." + "\n\r Please enter a proper value.";
                                    json_data[obj_valId] = "";

                                    format_value = "";
                                }
                            }
                            else {
                                var msgerror = "The maximum allowed limit for " + id + " is a " + dig +
                                    " digit number. " + "\n\r Please enter a proper value.";
                                json_data[obj_valId] = "";
                                format_value = "";
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
                    json_data[obj_valId] = "";
                    format_value = "";
                    sap.m.MessageBox.error(msgerror);
                }

                json_data[obj_valId] = format_value;

                //Format the number - max 6 digits with no decimal value 
                var oNumberFormat_int = sap.ui.core.format.NumberFormat.getFloatInstance({
                    maxIntegerDigits: 6,
                    maxFractionDigits: 0,
                    groupingEnabled: true,
                    groupingSeparator: ",",
                    decimalSeparator: ".",
                });

                //Format the number - max 6 digits with two decimal values
                var oNumberFormat_dec = sap.ui.core.format.NumberFormat.getFloatInstance({
                    maxIntegerDigits: 5,
                    maxFractionDigits: 2,
                    minFractionDigits: 2,
                    groupingEnabled: true,
                    groupingSeparator: ",",
                    decimalSeparator: ".",
                });

                //Rain Last 24 hours
                if (obj_name === 'ipt_RS_Rain_L24h') {

                    //Clear the formatted value
                    var value1 = this.clear_format(json_data.val_RSRY);
                    var value2 = this.clear_format(json_data.val_RS_Rain_L24h);

                    var temp_Rsry = Number(value1);
                    var temp_Rsrl = Number(value2);
                    var val_Rsryub = temp_Rsry + temp_Rsrl;

                    json_data.val_RS_Rain_YTD = oNumberFormat_dec.format(val_Rsryub);
                }
                //DAPP Pumped Last 24 Hours
                if (obj_name === 'ipt_DAPP_P_L24h') {

                    //Clear the formatted value
                    var value1 = this.clear_format(json_data.val_DMP);
                    var value2 = this.clear_format(json_data.val_DAPP_P_L24h);

                    var temp_Dmp = Number(value1);
                    var temp_Dpl = Number(value2);
                    var val_Dmpub = temp_Dmp + temp_Dpl;

                    json_data.val_DAPP_P_Month = oNumberFormat_int.format(val_Dmpub);

                }
                //GPGP Pumped Last 24 Hours
                if (obj_name === 'ipt_GPGP_P_L24h') {

                    //Clear the formatted value
                    var value1 = this.clear_format(json_data.val_GIPPM);
                    var value2 = this.clear_format(json_data.val_GPGP_P_L24h);

                    var temp_Gippm = Number(value1);
                    var temp_Gippl = Number(value2);
                    var val_Gippmub = temp_Gippm + temp_Gippl;

                    json_data.val_GPGP_P_Month = oNumberFormat_int.format(val_Gippmub);
                }
                //GPGP Released Last 24 Hours
                if (obj_name === 'ipt_GPGP_R_L24h') {

                    //Clear the formatted value
                    var value1 = this.clear_format(json_data.val_GIPPRM);
                    var value2 = this.clear_format(json_data.val_GPGP_R_L24h);

                    var temp_Gipprm = Number(value1);
                    var temp_Gipprl = Number(value2);
                    var val_Gipprmub = temp_Gipprm + temp_Gipprl;

                    json_data.val_GPGP_R_Month = oNumberFormat_int.format(val_Gipprmub);
                }
                //O'Neill Pumped Last 24 Hours
                if (obj_name === 'ipt_USBR_PS_ONeill_Pump_L24h') {

                    //Clear the formatted value
                    var value1 = this.clear_format(json_data.val_USBRM);
                    var value2 = this.clear_format(json_data.val_USBR_PS_ONeill_Pump_L24h);

                    var temp_Usbrm = Number(value1);
                    var temp_Usbrl = Number(value2);
                    var val_Usbrmub = temp_Usbrm + temp_Usbrl;

                    json_data.val_USBR_PS_ONeill_Pump_Month = oNumberFormat_int.format(val_Usbrmub);
                }
                //O'Neill Released Last 24 Hours
                if (obj_name === 'ipt_USBR_PS_ONeill_Rel_L24h') {

                    //Clear the formatted value
                    var value1 = this.clear_format(json_data.val_USBRRM);
                    var value2 = this.clear_format(json_data.val_USBR_PS_ONeill_Rel_L24h);

                    var temp_Usbrrm = Number(value1);
                    var temp_Usbrrl = Number(value2);
                    var val_Usbrrmub = temp_Usbrrm + temp_Usbrrl;

                    json_data.val_USBR_PS_ONeill_Rel_Month = oNumberFormat_int.format(val_Usbrrmub);
                }
                //San Felipe Pumped Last 24 Hours
                if (obj_name === 'ipt_San_Fel_Pump_L24h') {

                    //Clear the formatted value
                    var value1 = this.clear_format(json_data.val_USBRPM);
                    var value2 = this.clear_format(json_data.val_San_Fel_Pump_L24h);

                    var temp_Usbrpm = Number(value1);
                    var temp_Usbrpl = Number(value2);
                    var val_Usbrpmub = temp_Usbrpm + temp_Usbrpl;

                    json_data.val_San_Fel_Pump_Month = oNumberFormat_int.format(val_Usbrpmub);
                }

                Model_view.setData(json_data);
                Model_view.updateBindings(true);
                viewOnChange.setModel(Model_view);

            }, //End of OnChange_storage: function (evt)

            //----------------------------------------------------------------------
            onClear: function (evt) {
                var objid = evt.getSource().data("id");
                this.getView("sanL").byId(objid).setValue("");
            }, //End of onClear: function (evt)

            //----------------------------------------------------------------------
            addEvent: function (ObName, ObId, Oval, dec) {
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oView = this.getView("sanL");
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
                                while (idx < dec) {
                                    oData[Oval] = value + "0";
                                    value = oData[Oval];
                                    idx++;
                                }

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

            }, //End of addEvent: function (ObName, ObId, Oval, dec)

            //----------------------------------------------------------------------
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

            }, //End of getDecAll: function (Object)

            //----------------------------------------------------------------------
            delcomma: function (val) {
                var value = val;
                value = value.replace(/[^\d \+ \- \.]/g, "");

                return value;
            }, //End of delcomma: function (val)

            //----------------------------------------------------------------------
            clear_format: function (val) {
                var value = val;
                value = value.replace(/[^\d \+ \.]/g, "");

                return value;
            }, //End of clear_format: function (val)

            //----------------------------------------------------------------------
            onAfterRendering: function () {
                jQuery.sap.delayedCall(500, this, function () { this.byId("lbl_hdstate").focus(); });
            }, //End of onAfterRendering: function ()

            //----------------------------------------------------------------------
            onSubmit: function (evt) {
                var submitdata = this.getView("sanL").getModel().getData();
                var oview = this.getView("sanL");
                var oThat = this;
                MessageBox.confirm("Are you ready to submit?", {
                    submitJson: submitdata,
                    oView: oview,
                    that: oThat,
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: async function (sAction) {
                        if (sAction === "OK") {

                            var sserviceurl = "/sap/opu/odata/sap/ZODATA_MC_WRSL_SRV";
                            var oModel = new sap.ui.model.odata.ODataModel(sserviceurl, true);
                            var submitJson = this.submitJson;
                            var oViewRmrk = this.oView;
                            var submitJsonRmrk = submitJson;

                            var now = new Date();
                            var oEntry = {};

                            //----------------------------------------------------------------------
                            //Main table ZWCM_MC_WRSL
                            oEntry.Mandt = submitJson.val_mandt;
                            oEntry.Mcdate = submitJson.val_dateRmrk;

                            var val_hour = now.getHours();
                            var val_minute = now.getMinutes();
                            if ((val_hour == 0) && (val_minute < 45)) {  //Current time is between "000000" and "004500"
                                var val_time = "000000";
                                oEntry.Mctime = val_time.toString();
                            }
                            else {
                                //Time hhmmss
                                oEntry.Mctime = val_hour.toString().padStart(2, '0') +
                                    val_minute.toString().padStart(2, '0') +
                                    now.getSeconds().toString().padStart(2, '0');
                            };

                            oEntry.Uname = submitJson.val_DbOpname;
                            oEntry.Natsec = this.oView.byId("cbx_SecThreatLvls_nat").getValue();    //Sec Threat Levels - National
                            oEntry.Dwrsec = this.oView.byId("cbx_SecThreatLvls_dwr").getValue();    //Sec Threat Levels - DWR
                            oEntry.Cacin = this.oView.byId("cbx_AquedCtrl").getValue();             //California Aqueduct Control In
                            oEntry.Pci = this.oView.byId("cbx_PlntCtrl").getValue();                //Plant Control In
                            oEntry.Rssre = this.that.delcomma(this.oView.byId("ipt_RS_SL_Res_Elev").getValue());    //SL Reservoir Elevation
                            oEntry.Rssrs = this.that.delcomma(this.oView.byId("ipt_RS_SL_Res_Stor").getValue());    //SL Reservoir Storage
                            oEntry.Rsofs = this.that.delcomma(this.oView.byId("ipt_RS_OFb_Stor").getValue());   //O'Neill Forebay Storage
                            oEntry.Rosfe = this.that.delcomma(this.oView.byId("ipt_RS_OFb_Elev").getValue());   //O'Neill Forebay Elevation
                            oEntry.Rsrl = this.that.delcomma(this.oView.byId("ipt_RS_Rain_L24h").getValue());   //Rain Last 24 Hours
                            oEntry.Rsry = this.that.delcomma(this.oView.byId("ipt_RS_Rain_YTD").getValue());    //Rain Year to Date
                            oEntry.Rslbe = this.that.delcomma(this.oView.byId("ipt_RS_LBDD_Elev").getValue());  //LBDD Elevation
                            oEntry.Rsls = this.that.delcomma(this.oView.byId("ipt_RS_LBDD_Stor").getValue());   //LBDD Storage
                            oEntry.Rslr = this.that.delcomma(this.oView.byId("ipt_RS_LBDD_Rel").getValue());    //LBDD Releasing
                            oEntry.Rslpe = this.that.delcomma(this.oView.byId("ipt_RS_LPDD_Elev").getValue());  //LPDD Elevation
                            oEntry.Rslps = this.that.delcomma(this.oView.byId("ipt_RS_LPDD_Stor").getValue());  //LPDD Storage
                            oEntry.Rslpsp = this.that.delcomma(this.oView.byId("ipt_RS_LPDD_Spill").getValue());    //LPDD Spilling
                            oEntry.Dpl = this.that.delcomma(this.oView.byId("ipt_DAPP_P_L24h").getValue());     //DAPP Pumped Last 24 Hours
                            oEntry.Dmp = this.that.delcomma(this.oView.byId("ipt_DAPP_P_Month").getValue());    //DAPP Pumped Month

                            oEntry.Dappu = submitJson.val_dateRmrk + "WRSLDAPPU";       //DAPP Unit Restrictions and Limitations
                            oEntry.Dappt = submitJson.val_dateRmrk + "WRSLDAPPT";       //DAPP Today's DA Schedule

                            oEntry.Gippl = this.that.delcomma(this.oView.byId("ipt_GPGP_P_L24h").getValue());   //GPGP Pumped Last 24 Hours
                            oEntry.Gippm = this.that.delcomma(this.oView.byId("ipt_GPGP_P_Month").getValue());  //GPGP Pumped Month                            
                            oEntry.Gipprl = this.that.delcomma(this.oView.byId("ipt_GPGP_R_L24h").getValue());  //GPGP Released Last 24 Hours
                            oEntry.Gipprm = this.that.delcomma(this.oView.byId("ipt_GPGP_R_Month").getValue()); //GPGP Released Month

                            oEntry.Gippu = submitJson.val_dateRmrk + "WRSLGIPPU";     //GPGP Plant and SWYD Conditions Normal, Except
                            oEntry.Gippp = submitJson.val_dateRmrk + "WRSLGIPPP";     //GPGP Unit Restrictions  Limitations
                            oEntry.Gippt = submitJson.val_dateRmrk + "WRSLGIPPT";     //GPGP Today's GI Schedule/Number of Units

                            oEntry.Gippg = this.that.delcomma(this.oView.byId("ipt_GPGP_GI_Unit").getValue());  //GI Units at Head of (ft)
                            oEntry.Gippg1cfs = this.that.delcomma(this.oView.byId("ipt_Gen_Rated_1a").getValue());    //Generate #1 & 5 @ 156 rpm (cfs)
                            oEntry.Gippg1mw = this.that.delcomma(this.oView.byId("ipt_Gen_Rated_1b").getValue());   //Generate #1 & 5 @ 156 rpm (mw)
                            oEntry.Gippg2cfs = this.that.delcomma(this.oView.byId("ipt_Gen_Rated_2a").getValue());  //Generate #2, 3, 4, 6, 7 & 8 @ 150 rpm (cfs)
                            oEntry.Gippg2mw = this.that.delcomma(this.oView.byId("ipt_Gen_Rated_2b").getValue());   //Generate #2, 3, 4, 6, 7 & 8 @ 150 rpm (mw)
                            oEntry.Gippp2cfs = this.that.delcomma(this.oView.byId("ipt_Pump_Rated_2a").getValue());     //Pump #2, 3, 4, 6, 7 & 8 @ 150 rpm (cfs)
                            oEntry.Gippp2mw = this.that.delcomma(this.oView.byId("ipt_Pump_Rated_2b").getValue());      //Pump #2, 3, 4, 6, 7 & 8 @ 150 rpm (mw)
                            oEntry.Gippp1cfs = this.that.delcomma(this.oView.byId("ipt_Pump_Rated_1a").getValue());     //Pump #1 & 5 @ 156 rpm (cfs)
                            oEntry.Gippp1mw = this.that.delcomma(this.oView.byId("ipt_Pump_Rated_1b").getValue());      //Pump #1 & 5 @ 156 rpm (mw)
                            oEntry.Asccfs = this.that.delcomma(this.oView.byId("ipt_AS_Check12a").getValue());      //Aqueduct Status Check #12 (cfs)
                            oEntry.Aschrs = this.that.delcomma(this.oView.byId("ipt_AS_Check12b").getValue());      //Aqueduct Status Check #12 (at 24 hrs)
                            oEntry.Asc21cfs = this.that.delcomma(this.oView.byId("ipt_AS_Check21a").getValue());    //Aqueduct Status Check #21 (cfs)
                            oEntry.Asc21hrs = this.that.delcomma(this.oView.byId("ipt_AS_Check21b").getValue());    //Aqueduct Status Check #21 (at 24 hrs)
                            oEntry.Asd = this.that.delcomma(this.oView.byId("ipt_AS_DTP_14_21").getValue());    //Aqueduct Status Delivered Through Pools 14 - 21 (at 24 hrs)

                            oEntry.Asrl = submitJson.val_dateRmrk + "WRSLASRL";     //Aqueduct Status Restrictions and Limitations

                            oEntry.Fwlp = this.that.delcomma(this.oView.byId("ipt_FI_Little_Pan_Mile").getValue());     //Little Panoche (af)
                            oEntry.Fwc = this.that.delcomma(this.oView.byId("ipt_FI_Cantua_Mile").getValue());      //Cantua (af)
                            oEntry.Fwnc = this.that.delcomma(this.oView.byId("ipt_FI_New_Cantua_Mile").getValue());     //New Cantua (af)
                            oEntry.Fwcs = this.that.delcomma(this.oView.byId("ipt_FI_Cantua_Salt_Mile").getValue());    //Cantua/Salt (af)
                            oEntry.Fwgg = this.that.delcomma(this.oView.byId("ipt_FI_Salt_Mile").getValue());   //Salt (af)
                            oEntry.Fwtd = this.that.delcomma(this.oView.byId("ipt_FI_GaleAve_Gate_Mile").getValue());   //Gale Ave. Gates (af)
                            oEntry.Fwtf = this.that.delcomma(this.oView.byId("ipt_FI_Total_Drain_Inlet").getValue());     //Total Drain Inlets (af)
                            oEntry.Tfwtf = this.that.delcomma(this.oView.byId("ipt_FI_Total_Fld_Pump_In").getValue());    //Total Flood Water Pump-In (af)
                            oEntry.Usbrl = this.that.delcomma(this.oView.byId("ipt_USBR_PS_ONeill_Pump_L24h").getValue());      //USBR O'Neill Pumped Last 24 Hours (af)
                            oEntry.Usbrm = this.that.delcomma(this.oView.byId("ipt_USBR_PS_ONeill_Pump_Month").getValue());     //USBR O'Neill Pumped Month                            
                            oEntry.Usbrrl = this.that.delcomma(this.oView.byId("ipt_USBR_PS_ONeill_Rel_L24h").getValue());      //USBR O'Neill Released Last 24 Hours (af)
                            oEntry.Usbrrm = this.that.delcomma(this.oView.byId("ipt_USBR_PS_ONeill_Rel_Month").getValue());     //ONeill Released Month
                            oEntry.Usbrpl = this.that.delcomma(this.oView.byId("ipt_San_Fel_Pump_L24h").getValue());   //USBR San Felipe Pumped Last 24 Hours (af)
                            oEntry.Usbrpm = this.that.delcomma(this.oView.byId("ipt_San_Fel_Pump_Month").getValue());    //San Felipe Pumped Month

                            oEntry.Dappp = submitJson.val_dateRmrk + "WRSLDAPPP";  //DAPP Plant and SWYD Conditions Normal, Except

                            oModel.create("/ZSWCM_MC_WRSLSet", oEntry, {
                                method: "POST",
                                success: function (oData, oResponse) {
                                    //Remark table ZWCM_MC_WRDTREM
                                    var sserviceurlRmrks = "/sap/opu/odata/sap/ZODATA_MC_WRDTREM_SL_SRV";
                                    var oModelRmrks = new sap.ui.model.odata.ODataModel(sserviceurlRmrks, true);
                                    var oEntryRmrks = {};

                                    oEntryRmrks.Zcwmremkey = submitJsonRmrk.val_dateRmrk + "WRSL";
                                    oEntryRmrks.Dappp = oViewRmrk.byId("DAPP_pltswyd_rmkTxt").getValue();       //DAPPP: Plant & SWYD Conditions Normal, Except
                                    oEntryRmrks.Dappu = oViewRmrk.byId("DAPP_RestrtLimit_rmkTxt").getValue();   //DAPPU: Unit Restrictions and Limitations
                                    oEntryRmrks.Dappt = oViewRmrk.byId("DAPP_T_DA_Sched_rmkTxt").getValue();    //DAPPT: Today's DA Schedule
                                    oEntryRmrks.Gippu = oViewRmrk.byId("GPGP_pltSwyd_rmkTxt").getValue();       //GIPPU: Plant & SWYD Conditions Normal, Except
                                    oEntryRmrks.Gippp = oViewRmrk.byId("GPGP_RestrtLimit_rmkTxt").getValue();   //GIPPP: Unit Restrictions and Limitations
                                    oEntryRmrks.Gippt = oViewRmrk.byId("GPGP_T_GI_SchedNumb_rmkTxt").getValue();    //GIPPT: Today's GI Schedule/Number of Units
                                    oEntryRmrks.Asrl = oViewRmrk.byId("AS_RestrtLimit_rmkTxt").getValue();     //ASRL: Restrictions & Limitations

                                    oModelRmrks.create("/ZWCM_MC_WRSL_REMARKSSet", oEntryRmrks, {
                                        method: "POST",

                                        success: function (oData, oResponse) {
                                            //sap.m.MessageBox.success("Data submited Succesfully");

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
                                            });

                                        },
                                        error: function (oData, oREsponse) {
                                            sap.m.MessageBox.error("Data submit failed");
                                        }
                                    });

                                }, //End of success: function (oData, oResponse)                               
                                error: function (e) {
                                    sap.m.MessageBox.error("Error on Submit");
                                }

                            }); //End of oModel.create

                        } //End of (sAction === "OK")

                    } //End of onClose: async function (sAction)
                });

            }, //End of onSubmit: function (evt)

            onMain: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.initialize();

                //this.getOwnerComponent().getRouter().navTo("RouteMain");
                //var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
                oRouter.navTo("Routemain");
            },
            onDt: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.initialize();

                //this.getOwnerComponent().getRouter().navTo("RouteMain");
                //var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
                oRouter.navTo("RouteDt");
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
                oView.byId("btnGoToSl").setEnabled(false);

                var btnDt = dataModelMain.oData.valBtnDt['stat'];
                if (btnDt !== "X") {
                    oView.byId("btnGoToDt").setEnabled(false);
                }
                else {
                    oView.byId("btnGoToDt").setEnabled(true);
                }
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
            },

            _onRouteMatched: function (oEvent) {
                var oArgs, oView;
                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();

                var dataModelSl = this.getOwnerComponent().getModel("dataSl");//Will contain data mapped from the ODATA services
                dataModelSl.oData.init = "X";
                //dataModelInitial = this.getOwnerComponent().getModel("dataOr");
                if (dataModelSl.oData.initidx !== "") {
                    dataModelSl.oData.initidx = "X"
                    this.onInit();
                    this.onAfterRendering();
                }
                else {
                    dataModelSl.oData.initidx = "X"
                }


            },

        }); //End of return Controller.extend

    }); //End of function (Controller)
