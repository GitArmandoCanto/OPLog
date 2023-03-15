sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("nmspoplog.oplog.controller.ctrRoot", {
            onInit: async function () {
             var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.initialize();
                 
                //this.getOwnerComponent().getRouter().navTo("RouteMain");
                //var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
                oRouter.navTo("Routemain");                 }



        });
    });