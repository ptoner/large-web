import { QuillService } from "./services/quill-service";
import { UploadService } from "./services/upload-service";
import { ModelView } from "./model-view"
import { PromiseView } from "./promise-view"
import { ModelViewService } from "./services/model-view-service";
import { QueueService } from "./services/queue_service";
import Quill = require('quill/dist/quill.js')

import { Dom7, Template7 } from "framework7/js/framework7.bundle";
const Framework7: any = require('framework7/js/framework7.bundle')


import { Web } from "./web";
import { PostUIService } from "./services/post-ui-service";


export {
    QuillService,
    UploadService,
    QueueService,
    ModelViewService,
    ModelView,
    PromiseView,
    Dom7,
    Template7,
    Framework7,
    PostUIService,
    Quill
}

export default Web