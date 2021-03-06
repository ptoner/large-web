import { QuillService } from "./services/quill-service";
import { QueueService } from ".";
import { UploadService } from "./services/upload-service";
import { ModelViewService } from "./services/model-view-service";
import { PostUIService } from "./services/post-ui-service";
export declare namespace Web {
    var quillService: QuillService;
    var modelViewService: ModelViewService;
    var uploadService: UploadService;
    var queueService: QueueService;
    var postUiService: PostUIService;
    function initialize(): void;
}
