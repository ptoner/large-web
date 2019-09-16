"use strict";
exports.__esModule = true;
var quill_service_1 = require("./services/quill-service");
var _1 = require(".");
var upload_service_1 = require("./services/upload-service");
var model_view_service_1 = require("./services/model-view-service");
var post_ui_service_1 = require("./services/post-ui-service");
var large_core_1 = require("large-core");
var Web;
(function (Web) {
    Web.modelViewService = new model_view_service_1.ModelViewService();
    Web.uploadService = new upload_service_1.UploadService();
    Web.queueService = new _1.QueueService();
    function initialize() {
        Web.postUiService = new post_ui_service_1.PostUIService(large_core_1["default"].postService, large_core_1["default"].profileService, large_core_1["default"].schemaService, large_core_1["default"].imageService);
        Web.quillService = new quill_service_1.QuillService(Web.uploadService, large_core_1["default"].imageService);
    }
    Web.initialize = initialize;
})(Web = exports.Web || (exports.Web = {}));
