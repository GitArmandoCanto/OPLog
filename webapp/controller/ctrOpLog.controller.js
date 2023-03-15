sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("nmspoplog.oplog.controller.main", {
            onInit: async function () {
                var oView = this.getView("OpLog");
                var oModel = new sap.ui.model.json.JSONModel();
                var dataModelInitial;
                var dataModel = this.getOwnerComponent().getModel("dataOpLog");


                var dataModelMain = this.getOwnerComponent().getModel("dataMain");//Will contain data mapped from the ODATA services
                sap.ui.core.BusyIndicator.show();
                var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "yyyyMMdd"
                });
                var oDateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "M/d/yy"
                });
                var oDateFormat2 = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "MM/dy/yyyy"
                });

                var McDate = oDateFormat.format(new Date());

                var todayRmrk = oDateFormat.format(new Date());
                var today = oDateFormat1.format(new Date());
                dataModel.setProperty("/valDateFormatted", today);

                this.setBtn(dataModel, dataModelMain, oView);

                if (dataModel.oData.init !== "X") {         //This will only execute the first time the view is displayed

                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.getRoute("RouteOpLog").attachMatched(this._onRouteMatched, this);
                }

                var srvOpLog = "/sap/opu/odata/sap/ZODATA_MC_MULTDIV_TABLE_OPLOG_SRV/";
                var OdataSrvData = new sap.ui.model.odata.ODataModel(srvOpLog, true);
                var MidNgthCon = "";
                var OpLogSrv = await this.getOpLog(OdataSrvData, dataModelMain);
                if (OpLogSrv[0].result === "ERROR") {
                    sap.ui.core.BusyIndicator.hide();
                    MessageBox.error((OpLogSrv[0].data));
                }
                else {

                    var formResult = OpLogSrv[0].data.results;
                    for (let index = 0; index < OpLogSrv[0].data.results.length; index++) {

                        var val = OpLogSrv[0].data.results[index].Text;
                        val = val.replace(/["¬"]/g, " ");
                        formResult[index].Text = val;
                        val = "";

                    }


                    //We need to initialize the dataModel in case there is data from another execution
                    //but we keep the data for flags init and initidx

                    for (let element in dataModel.oData) {
                        var property = "/";
                        if (element !== "init" && element !== "initidx" && element.substring(0, 3) !== "lst") {
                            //dataModel.oData[element]= "";
                            dataModel.setProperty((property + element), "");
                        }
                    }

                    if (OpLogSrv[0].data.results.length === 0) {
                        //dataModel.setData(dataModelInitial.oData);
                        var date = dataModelMain.oData.valNoLogDate;
                        sap.ui.core.BusyIndicator.hide();
                        MessageBox.warning("No Log found.\n\r" +
                            "Please check the date" + " " + date);
                            
                    }
                    else {

                        //dataModel = this.SetData(usrSrv, WcdSrv, PusRepSrv, rmrksSrv, MidNgthConSrv, McDate, dataModel, formResult)
                        //oModel.setData(null);
                        dataModel.setProperty("/val_log_table", formResult);
                        dataModel.setProperty("/valDateFormatted", today);
                        oModel = dataModel;
                        oView.setModel(oModel);
                        sap.ui.core.BusyIndicator.hide();
                    }
                    sap.ui.core.BusyIndicator.hide();






                    

                    

                    sap.ui.core.BusyIndicator.hide();


                }


            },
            getOpLog: async function (UsrModel, dataModelMain) {
                //Esto sirve para saber si una variables ya esta definida
                var resolve = "";
                var reject = "";
                //var dataModelMain = this.getOwnerComponent().getModel("dataMain");//Will contain data mapped from the ODATA services
                const oPromise = await new Promise(function (resolve, reject) {

                    //UsrModel.read("/ZSWCM_MC_WRORSet", {
                    // urlParameters: {
                    //"Divis": "'WRSJ'"
                    //"$top" : 1
                    //},
                    UsrModel.read("/TableZoplog", {
                        urlParameters: {
                            "Date": dataModelMain.oData.valParamDate,
                            "Division": "'" + dataModelMain.oData.valParamDiv + "'",
                            "Plant": "'" + dataModelMain.oData.valParamPlant + "'"
                        },
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            //var UsrResp = oResponse;

                            //#endregion
                        },

                        error: (oData) => {
                            var usrError = ("Conection Error\n\r" + "URL: " + oData.response.requestUri.valueOf(Text) + "\n\rStatus: " + oData.response.statusCode.valueOf(Text) + "\n\rBody:" + oData.response.body.valueOf(Text));
                            resolve({ result: "ERROR", data: usrError });
                            reject(oData);
                            //MessageBox.error(usrError);

                        },


                    });

                });
                //data = oPromise.results;
                return [oPromise];

            },
            onMain: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.initialize();

                //this.getOwnerComponent().getRouter().navTo("RouteMain");
                //var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
                oRouter.navTo("Routemain");
            },

            setBtn: function (dataModelOr, dataModelMain, oView) {
                oView.byId("btnGoToOr").setEnabled(false);

                var btnDt = dataModelMain.oData.valBtnDt['stat'];
                if (btnDt !== "X") {
                    oView.byId("btnGoToDt").setEnabled(false);
                }
                else {
                    oView.byId("btnGoToDt").setEnabled(true);
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
            },
            _onRouteMatched: function (oEvent) {
                var oArgs, oView;
                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();

                var dataModelOpLog = this.getOwnerComponent().getModel("dataOpLog");//Will contain data mapped from the ODATA services
                dataModelOpLog.oData.init = "X";
                //dataModelInitial = this.getOwnerComponent().getModel("dataOr");
                if (dataModelOpLog.oData.initidx !== "") {
                    dataModelOpLog.oData.initidx = "X"
                    this.onInit();
                    this.onAfterRendering();
                }
                else {
                    dataModelOpLog.oData.initidx = "X"
                }


            },
            onAfterRendering: function () {

                //jQuery.sap.delayedCall(500, this, function () {  this.byId("iptAqDlv2230").focus(); });
                jQuery.sap.delayedCall(500, this, function () { this.byId("lbl_hdstate").focus(); });
                //var dummy = "X";
            },



        });
    });
