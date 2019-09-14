import { QuillService } from "./services/quill-service";
import { QueueService, ModelView } from ".";
import { UploadService } from "./services/upload-service";
import { ModelViewService } from "./services/model-view-service";
import { PostUIService } from "./services/post-ui-service";
import Core from "large-core"

export namespace Web {

    export var quillService:QuillService
    export var modelViewService:ModelViewService = new ModelViewService()
    export var uploadService:UploadService = new UploadService()
    export var queueService:QueueService = new QueueService()
    export var postUiService:PostUIService

    export function initialize() {
        Web.postUiService = new PostUIService(Core.postService, Core.profileService, Core.schemaService, Core.imageService)
        Web.quillService = new QuillService(Web.uploadService, Core.imageService)
    }

}