import { QuillService } from "./services/quill-service";
import { UploadService } from "./services/upload-service";
import { ModelView } from "./model-view"
import { PromiseView } from "./promise-view"
import { RouteService } from "./services/route-service";
import { QueueService } from "./services/queue_service";
import { UiService } from "./services/ui-service";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import Quill = require('quill/dist/quill.js')

import Framework7, { Dom7, Template7 } from "framework7";
import { LargeWeb } from "./large-web";



export {
    QuillService,
    UploadService,
    QueueService,
    RouteService,
    UiService,
    ModelView,
    PromiseView,
    Dom7,
    Template7,
    Framework7,
    QuillDeltaToHtmlConverter,
    Quill,
    LargeWeb 
}