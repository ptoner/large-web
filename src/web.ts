import { QuillService } from "./services/quill-service";
import { UiService, QueueService } from ".";
import { UploadService } from "./services/upload-service";
import { ModelViewService } from "./services/model-view-service";
import { PostUIService } from "./services/post-ui-service";
import Core from "large-core"

export namespace Web {

    export var quillService:QuillService
    export var modelViewService:ModelViewService
    export var uiService:UiService
    export var uploadService:UploadService
    export var queueService:QueueService
    export var postUiService:PostUIService

    export function initialize(initFunction:Function, initControllersFunction:Function, framework7App) {
        

        Web.queueService = new QueueService()
        Web.uploadService = new UploadService()
        Web.uiService = new UiService(framework7App)
        Web.modelViewService = new ModelViewService(initFunction, initControllersFunction, Web.uiService)


        //@ts-ignore
        Web.postUiService = {}
    }

}