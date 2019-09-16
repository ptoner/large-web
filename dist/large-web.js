"use strict";
exports.__esModule = true;
var _1 = require(".");
var model_view_service_1 = require("./services/model-view-service");
var post_ui_service_1 = require("./services/post-ui-service");
var large_core_1 = require("large-core");
var Web;
(function (Web) {
    function initialize(initialize, framework7App) {
        Web.uiService = new _1.UiService(framework7App);
        Web.modelViewService = new model_view_service_1.ModelViewService(initialize, Web.uiService);
        Web.postUiService = new post_ui_service_1.PostUIService(large_core_1["default"].postService, large_core_1["default"].profileService, large_core_1["default"].schemaService, large_core_1["default"].imageService);
    }
    Web.initialize = initialize;
})(Web = exports.Web || (exports.Web = {}));
