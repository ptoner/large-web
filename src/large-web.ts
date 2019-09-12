import { QuillService } from "./services/quill-service";
import { RouteService } from "./services/route-service";
import { UiService, QueueService } from ".";
import { UploadService } from "./services/upload-service";
import { InitService } from "./services/init-service";

export namespace LargeWeb {

    export var quillService:QuillService
    export var routeService:RouteService
    export var uiService:UiService
    export var uploadService:UploadService
    export var queueService:QueueService

}