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
                var oView = this.getView("main");              //Instance of view
                var oModel = new sap.ui.model.json.JSONModel(); //This model  will contain the data
                var dataModelOr = this.getOwnerComponent().getModel("dataOr");//Will contain data mapped from the ODATA services
                var dataModelDt = this.getOwnerComponent().getModel("dataDt");//Will contain data mapped from the ODATA services
                var dataModelMain = this.getOwnerComponent().getModel("dataMain");//Will contain data mapped from the ODATA services

                var urlFldDivSrv = "/sap/opu/odata/sap/ZODATA_MC_DIVISIONS_OPLOG_SRV/";
                //Instance of ODATA service 
                var OdataFldDiv = new sap.ui.model.odata.ODataModel(urlFldDivSrv, true);
                var fldDivSrv = await this.getFldDiv(OdataFldDiv);
                if (fldDivSrv[0].result === "ERROR") {
                    sap.ui.core.BusyIndicator.hide();
                    MessageBox.error((fldDivSrv[0].data));
                }
                else {
                    var urlPlantSrv = "/sap/opu/odata/sap/ZODATA_MC_ZWCM_FLPLANT_OPLOG_SRV/";
                    //Instance of ODATA service 
                    var OdataPlant = new sap.ui.model.odata.ODataModel(urlPlantSrv, true);
                    var plantSrv = await this.getPlant(OdataPlant);
                    if (plantSrv[0].result === "ERROR") {
                        sap.ui.core.BusyIndicator.hide();
                        MessageBox.error((plantSrv[0].data));
                    }
                    else {

                    }

                    //var fldDiv = [];
                    //fldDivSrv[0].data.results.forEach(element => {
                    //    fldDiv.push(element)
                    //});


                }
                this.SetData(dataModelMain, fldDivSrv[0].data.results, plantSrv[0].data.results)
                oModel.setData(null);
                oModel = dataModelMain;
                oView.setModel(dataModelMain);
            },
            onExe: function () {
                var exe = "";
                var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "yyyyMMdd"
                });
                var oDateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "yyyy/MM/dd"
                });
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var oView = this.getView("main");              //Instance of view
                var first = "";
                var route = "";
                var dataModelMain = this.getOwnerComponent().getModel("dataMain");//Will contain data mapped from the ODATA services
                var dataModelOr = this.getOwnerComponent().getModel("dataOr");//Will contain data mapped from the ODATA services
                var dataModelDt = this.getOwnerComponent().getModel("dataDt");//Will contain data mapped from the ODATA services

                if (this.getView().byId("chkbxOther").getSelected() === true) {
                    if (this.getView().byId("cbx_fldDiv")._getSelectedItemText() === "") {
                        var items = this.getView().byId("cbx_fldDiv").getItems();
                        var msg="Please select one of the below options:\n\r";
                        items.forEach(element => {
                            if(element.mProperties.key !== "E"){
                            msg = msg + element.mProperties.key + ".-" +  element.mProperties.text + "\n\r";
                            }
                            
                        });

                        MessageBox.error(msg, {
                            //view: oView,
                            that: this,
                            actions: [MessageBox.Action.OK],
                            emphasizedAction: MessageBox.Action.OK,
                            onClose: async function (sAction) {
                                if (sAction === "OK") {


                                }//Ok button pressed by user to continue.
                            }//Message Box on close
                        });//Message Box end
                    }//Field div value not provided

                    else {//Field Div provided, we need to check date filter
                        //#region validations for parameter selection 
                        //Nothing selected for planning plant or other
                        if (this.getView().byId("chkbxOr").getSelected() === false && this.getView().byId("chkbxDt").getSelected() === false
                            && this.getView().byId("chkbxSl").getSelected() === false && this.getView().byId("chkbxSj").getSelected() === false
                            && this.getView().byId("chkbxSt").getSelected() === false && this.getView().byId("chkbxPoc").getSelected() === false
                            && this.getView().byId("chkbxOther").getSelected() === false) {
                            //MessageBox.error("Please select an option:\n\r \n\rPlanning Plant\n\r \n\r OR \n\r \n\r Other Specific Fld Div and Plant.")
                            MessageBox.error("Please select one of the below options:\n\r 1.-Planning Plant\n\r 2.-Other Specific Fld Div and Plant.")
                            exe = "";

                        }
                        else {


                            //No date filter selected
                            if (this.getView().byId("chkbxToday").getSelected() === false && this.getView().byId("chkbxYesterday").getSelected() === false
                                && this.getView().byId("chkbxDate").getSelected() === false) {
                                //MessageBox.error("Please select an option:\n\r \n\r Today's Log \n\r\n\r OR \n\r \n\rYesterday´s Log\n\r \n\r OR \n\r \n\rDate");
                                MessageBox.error("Please select one of the below options:\n\r 1.-Today's Log \n\r 2.-Yesterday´s Log\n\r 3.-Date");
                                exe = "";
                            }
                            else {//if date filter is selected we need to check the value for date time picker
                                //Filter date selected, but no value for datepicker
                                if (this.getView().byId("chkbxDate").getSelected() === true) {
                                    if (this.getView().byId("dpLogDate").getValue() === "") {
                                        MessageBox.error("Please select a date");
                                        exe = "";
                                    }
                                    else {//date filter selected and date is provided for date time picker
                                        exe = "X";
                                    }
                                }//Date filter is not selected, but today or yesterday is selected
                                else {
                                    exe = "X";
                                }

                            }
                        }

                    }//Field Div provided end
                }//Check box other is selected

                else {//Check box other is not selected

                    //#region validations for parameter selection 
                    //Nothing selected for planning plant or other
                    if (this.getView().byId("chkbxOr").getSelected() === false && this.getView().byId("chkbxDt").getSelected() === false
                        && this.getView().byId("chkbxSl").getSelected() === false && this.getView().byId("chkbxSj").getSelected() === false
                        && this.getView().byId("chkbxSt").getSelected() === false && this.getView().byId("chkbxPoc").getSelected() === false
                        && this.getView().byId("chkbxOther").getSelected() === false) {
                        //MessageBox.error("Please select an option:\n\r \n\rPlanning Plant\n\r \n\r OR \n\r \n\r Other Specific Fld Div and Plant.")
                        MessageBox.error("Please select one of the below options:\n\r 1.-Planning Plant\n\r 2.-Other Specific Fld Div and Plant.")
                        exe = "";

                    }
                    else {


                        //No date filter selected
                        if (this.getView().byId("chkbxToday").getSelected() === false && this.getView().byId("chkbxYesterday").getSelected() === false
                            && this.getView().byId("chkbxDate").getSelected() === false) {
                            //MessageBox.error("Please select an option:\n\r \n\r Today's Log \n\r\n\r OR \n\r \n\rYesterday´s Log\n\r \n\r OR \n\r \n\rDate");
                            MessageBox.error("Please select one of the below options:\n\r 1.-Today's Log \n\r 2.-Yesterday´s Log\n\r 3.-Date");
                            exe = "";
                        }
                        else {//if date filter is selected we need to check the value for date time picker
                            //Filter date selected, but no value for datepicker
                            if (this.getView().byId("chkbxDate").getSelected() === true) {
                                if (this.getView().byId("dpLogDate").getValue() === "") {
                                    MessageBox.error("Please select a date");
                                    exe = "";
                                }
                                else {//date filter selected and date is provided for date time picker
                                    exe = "X";
                                }
                            }//Date filter is not selected, but today or yesterday is selected
                            else {
                                exe = "X";
                            }

                        }
                    }
                }






                //#endregion validations for parameter selection 

                if (exe === "X") {
                    //#region Logic to get date selected
                    if (oView.byId("chkbxToday").getSelected() === true) {
                        var date = "'" + oDateFormat.format(new Date()) + "'";
                        dataModelMain.oData.valNoLogDate = oDateFormat1.format(new Date());
                    }
                    if (oView.byId("chkbxYesterday").getSelected() === true) {
                        var date = new Date();
                        date.setDate(date.getDate() - 1);
                        dataModelMain.oData.valNoLogDate = oDateFormat1.format(date);
                        date = "'" + oDateFormat.format(date) + "'";

                    }
                    if (oView.byId("chkbxToday").getSelected() === false && oView.byId("chkbxYesterday").getSelected() === false) {
                        var date = "'" + oView.byId("dpLogDate").getValue().toString() + "'";
                        var year = oView.byId("dpLogDate").getValue().substring(0, 4);
                        var month = oView.byId("dpLogDate").getValue().substring(4, 6);
                        var day = oView.byId("dpLogDate").getValue().substring(6, 8);
                        var dateLog = new Date(year, month - 1, day);
                        //var dateLog = new Date(oView.byId("dpLogDate").getValue().substring(0,4) + oView.byId("dpLogDate").getValue().substring(4,6) + oView.byId("dpLogDate").getValue().substring(6,8));
                        dataModelMain.oData.valNoLogDate = oDateFormat1.format(dateLog);
                    }

                    dataModelMain.oData.valParamDate = date;
                    ////#endregion Logic for get date selected

                    //#region to enable buttons for navigation

                    if (oView.byId("chkbxOr").getSelected()) {
                        dataModelMain.oData.valBtnOr['stat'] = "X";
                        var first = "X";
                        route = dataModelMain.oData.valBtnOr['View'];
                    }
                    else {
                        dataModelMain.oData.valBtnOr['stat'] = "";
                    }

                    if (oView.byId("chkbxDt").getSelected()) {
                        dataModelMain.oData.valBtnDt['stat'] = "X";
                        if (first !== "X") {
                            var first = "X";
                            route = dataModelMain.oData.valBtnDt['View'];
                        }
                    }
                    else {
                        dataModelMain.oData.valBtnDt['stat'] = "";
                    }

                    if (oView.byId("chkbxSj").getSelected()) {
                        dataModelMain.oData.valBtnSj['stat'] = "X";
                        if (first !== "X") {
                            var first = "X";
                            route = dataModelMain.oData.valBtnSj['View'];
                        }
                    }
                    else {
                        dataModelMain.oData.valBtnSj['stat'] = "";
                    }

                    if (oView.byId("chkbxSl").getSelected()) {
                        dataModelMain.oData.valBtnSl['stat'] = "X";
                        if (first !== "X") {
                            var first = "X";
                            route = dataModelMain.oData.valBtnSl['View'];
                        }
                    }
                    else {
                        dataModelMain.oData.valBtnSl['stat'] = "";
                    }

                    if (oView.byId("chkbxSt").getSelected()) {
                        dataModelMain.oData.valBtnSt['stat'] = "X";
                        if (first !== "X") {
                            var first = "X";
                            route = dataModelMain.oData.valBtnSt['View'];
                        }
                    }
                    else {
                        dataModelMain.oData.valBtnSt['stat'] = "";
                    }

                    if (oView.byId("chkbxPoc").getSelected()) {
                        dataModelMain.oData.valBtnPoc['stat'] = "X";
                        if (first !== "X") {
                            var first = "X";
                            route = dataModelMain.oData.valBtnPoc['View'];
                        }
                    }
                    else {
                        dataModelMain.oData.valBtnPoc['stat'] = "";
                    }

                    if (oView.byId("chkbxOther").getSelected()) {
                        //dataModelMain.oData.valBtnPoc['stat'] = "X";
                        if (first !== "X") {
                            var first = "X";
                            route = dataModelMain.oData.valOpLogRoute;
                            dataModelMain.oData.valParamDiv = oView.byId("cbx_fldDiv")._getSelectedItemText();
                            dataModelMain.oData.valParamPlant = oView.byId("cbx_plant")._getSelectedItemText();
                            
                        }
                    }
                    

                    oRouter.navTo(route);
                }
                //#endregion to enable buttons for navigation                

            },
            chkSel: function (evt) {
                var dataModelMain = this.getOwnerComponent().getModel("dataMain");//Will contain data mapped from the ODATA services
                var chkId = evt.getSource().data("id");
                var chkbx = this.getView("main").byId(chkId).getSelected();
                var val = evt.getSource().data("btn");
                var oData = dataModelMain.oData;

                // if any check box for division(Planning Plant) is selected, we need to disable Other Specific Fld Div and Plant 
                if (chkId === "chkbxOr" || chkId === "chkbxDt" || chkId === "chkbxSl" || chkId === "chkbxSj" || chkId === "chkbxSt" || chkId === "chkbxPoc") {
                    this.getView().byId("chkbxOther").setEnabled(false);
                    this.getView().byId("cbx_fldDiv").setEnabled(false);
                    this.getView().byId("cbx_plant").setEnabled(false);
                    //Flag check box selected
                    if (chkbx === true) {
                        oData[val]['stat'] = "X";
                    }
                    else {
                        oData[val]['stat'] = "";
                    }
                }
                // if Other Specific Fld Div and Plant is selected we need to disable checkboxes for division(Planning Plant)
                if (chkId === "chkbxOther") {
                    this.getView().byId("chkbxOr").setEnabled(false);
                    this.getView().byId("chkbxDt").setEnabled(false);
                    this.getView().byId("chkbxSl").setEnabled(false);
                    this.getView().byId("chkbxSj").setEnabled(false);
                    this.getView().byId("chkbxSt").setEnabled(false);
                    this.getView().byId("chkbxPoc").setEnabled(false);
                    this.getView().byId("btnSelAll").setEnabled(false);
                    this.getView().byId("btnSelNone").setEnabled(false);
                    this.getView().byId("cbx_fldDiv").setEnabled(true);
                    this.getView().byId("cbx_plant").setEnabled(true);
                }
                // if Other Specific Fld Div and Plant is not selected we need to enable checkboxes for division(Planning Plant)
                if (this.getView().byId("chkbxOther").getSelected() === false) {
                    this.getView().byId("chkbxOr").setEnabled(true);
                    this.getView().byId("chkbxDt").setEnabled(true);
                    this.getView().byId("chkbxSl").setEnabled(true);
                    this.getView().byId("chkbxSj").setEnabled(true);
                    this.getView().byId("chkbxSt").setEnabled(true);
                    this.getView().byId("chkbxPoc").setEnabled(true);
                    this.getView().byId("cbx_fldDiv").setEnabled(false);
                    this.getView().byId("cbx_plant").setEnabled(false);
                    this.getView().byId("btnSelAll").setEnabled(true);
                    this.getView().byId("btnSelNone").setEnabled(true);

                }
                //if none checkboxes are selected for division we need to enable Other Specific Fld Div and Plant
                if (this.getView().byId("chkbxOr").getSelected() === false &&
                    this.getView().byId("chkbxDt").getSelected() === false &&
                    this.getView().byId("chkbxSl").getSelected() === false &&
                    this.getView().byId("chkbxSj").getSelected() === false &&
                    this.getView().byId("chkbxSt").getSelected() === false &&
                    this.getView().byId("chkbxPoc").getSelected() === false) {

                    this.getView().byId("chkbxOther").setEnabled(true);

                }
                //if Today filter is selected, we need to disable yesterday and date filters
                if (chkId === "chkbxToday") {
                    this.getView().byId("chkbxYesterday").setEnabled(false);
                    this.getView().byId("dpLogDate").setEnabled(false);
                    this.getView().byId("chkbxDate").setEnabled(false);
                }
                //if yesterday filter is selected, we need to disable Today and date filters
                if (chkId === "chkbxYesterday") {
                    this.getView().byId("chkbxToday").setEnabled(false);
                    this.getView().byId("dpLogDate").setEnabled(false);
                    this.getView().byId("chkbxDate").setEnabled(false);
                }
                //if date filter is selected, we need to disable Today and yesterday filters
                if (chkId === "chkbxDate") {
                    this.getView().byId("chkbxYesterday").setEnabled(false);
                    this.getView().byId("dpLogDate").setEnabled(true);
                    this.getView().byId("chkbxToday").setEnabled(false);
                }

                if (this.getView().byId("chkbxToday").getSelected() === false && this.getView().byId("chkbxYesterday").getSelected() === false) {
                    this.getView().byId("chkbxDate").setEnabled(true);
                    this.getView().byId("dpLogDate").setEnabled(true);
                }
                if (this.getView().byId("chkbxToday").getSelected() === false && this.getView().byId("chkbxDate").getSelected() === false) {
                    this.getView().byId("chkbxYesterday").setEnabled(true);
                    this.getView().byId("dpLogDate").setEnabled(false);
                }
                if (this.getView().byId("chkbxYesterday").getSelected() === false && this.getView().byId("chkbxDate").getSelected() === false) {
                    this.getView().byId("chkbxToday").setEnabled(true);
                    this.getView().byId("dpLogDate").setEnabled(false);
                }







            },
            getFldDiv: async function (OdataModel) {
                const oPromise = await new Promise(function (resolve, reject) {
                    OdataModel.read("/FIELD_DIVISIONS", {
                        //urlParameters: {
                        //  "$top" : 1
                        //},
                        success: (oData) => {
                            //alert(oData.results[0].Accm);
                            //alert(oResponse);
                            resolve({ result: "SUCCESS", data: oData });
                            var UsrData = oData;
                            //var UsrResp = oResponse;
                            oData.results.push({ Division: "", Key: "E" })

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
            getPlant: async function (OdataModel) {
                const oPromise = await new Promise(function (resolve, reject) {

                    OdataModel.read("/ZWCM_FLPLANTSet", {
                        //urlParameters: {
                        //  "$top" : 1
                        //},
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
            SetData: function (MainMdl, fldDivSrv, plantSrv) {
                
                MainMdl.oData.lstFldDiv = fldDivSrv;
                MainMdl.oData.lstPlant = plantSrv;

            },
            OnCbxChng: function (evt) {
                var view = this.getView("main");
                var model = view.getModel();
                var secIcon = view.byId(evt.getSource().data("icon"));
                var cbxId = evt.getSource().data("cbxName");
                var dataSrc = evt.getSource().data("dataSource");
                var selKey = evt.getSource().data("selkey");
                var cbx = view.byId([cbxId]);
                var cbxJson = view.getModel().getData();
                var list = cbxJson[dataSrc];
                var flag = "";

                if (cbxId === "cbx_fldDiv") {
                    var aryFldDiv = [];
                    cbxJson.lstPlantDiv = "";
                    switch (cbx._getSelectedItemText()) {
                        case "WRDT":
                            cbxJson.lstPlant.forEach(element => {
                                if (element.FldDiv === "WRDT") {
                                    aryFldDiv.push({ Key: element.Index, Plant: element.Flplant });
                                }

                            });
                            cbxJson.lstPlantDiv = aryFldDiv;
                            break;
                        case "WROR":
                            cbxJson.lstPlant.forEach(element => {
                                if (element.FldDiv === "WROR") {
                                    aryFldDiv.push({ Key: element.Index, Plant: element.Flplant });
                                }

                            });
                            cbxJson.lstPlantDiv = aryFldDiv;
                            break;
                        case "WRSL":
                            cbxJson.lstPlant.forEach(element => {
                                if (element.FldDiv === "WRSL") {
                                    aryFldDiv.push({ Key: element.Index, Plant: element.Flplant });
                                }

                            });
                            cbxJson.lstPlantDiv = aryFldDiv;
                            break;
                        case "WRSJ":
                            cbxJson.lstPlant.forEach(element => {
                                if (element.FldDiv === "WRSJ") {
                                    aryFldDiv.push({ Key: element.Index, Plant: element.Flplant });
                                }

                            });
                            cbxJson.lstPlantDiv = aryFldDiv;
                            break;
                        case "WRSC":
                            cbxJson.lstPlant.forEach(element => {
                                if (element.FldDiv === "WRSC") {
                                    aryFldDiv.push({ Key: element.Index, Plant: element.Flplant });
                                }

                            });
                            cbxJson.lstPlantDiv = aryFldDiv;
                            break;
                        case "WRPO":
                            cbxJson.lstPlant.forEach(element => {
                                if (element.FldDiv === "WRPO") {
                                    aryFldDiv.push({ Key: element.Index, Plant: element.Flplant });
                                }

                            });
                            cbxJson.lstPlantDiv = aryFldDiv;
                            break;

                        default:
                            break;
                    }
                    var idx = cbxJson.lstPlantDiv.length + 1;
                    cbxJson.lstPlantDiv.push({ Key: idx, Plant: "" });


                    model.setData("");
                    model.setData(cbxJson);
                    view.setModel(model);

                    for (let index = 0; index < list.length; index++) {
                        if (list[index].Division === cbx.getValue()) {
                            flag = "X";

                            break;
                        }

                    }

                }
                if (cbxId === "cbx_plant") {
                    for (let index = 0; index < list.length; index++) {
                        if (list[index].Plant === cbx.getValue()) {
                            flag = "X";

                            break;
                        }

                    }

                }
                if (flag === "") {
                    var idx = list.length - 1;
                    sap.m.MessageBox.error("Select a valid value.");
                    cbxJson[selKey] = list[idx].Key.toString();
                    model.setData("");
                    model.setData(cbxJson);
                    view.setModel(model);
                }
            },
            onSelAll: function () {
                this.getView().byId("chkbxOr").setSelected(true);
                this.getView().byId("chkbxDt").setSelected(true);
                this.getView().byId("chkbxSl").setSelected(true);
                this.getView().byId("chkbxSj").setSelected(true);
                this.getView().byId("chkbxSt").setSelected(true);
                this.getView().byId("chkbxPoc").setSelected(true);


                this.getView().byId("chkbxOther").setEnabled(false);
                this.getView().byId("cbx_fldDiv").setEnabled(false);
                this.getView().byId("cbx_plant").setEnabled(false);
            },
            onSelNone: function () {
                this.getView().byId("chkbxOr").setSelected(false);
                this.getView().byId("chkbxDt").setSelected(false);
                this.getView().byId("chkbxSl").setSelected(false);
                this.getView().byId("chkbxSj").setSelected(false);
                this.getView().byId("chkbxSt").setSelected(false);
                this.getView().byId("chkbxPoc").setSelected(false);
                this.getView().byId("chkbxOther").setEnabled(true);
                this.getView().byId("cbx_fldDiv").setEnabled(false);
                this.getView().byId("cbx_plant").setEnabled(false);
            }



        });
    });
