import Quill = require('quill/dist/quill.js');
import { UploadService } from './upload-service';
import { ImageService } from "large-core";
/**
 * END UTIL
 */
declare class QuillService {
    private uploadService;
    private imageService;
    activeEditor: any;
    initialized: boolean;
    constructor(uploadService: UploadService, imageService: ImageService);
    buildQuillPostEditor(selector: string): Quill;
    initialize(): void;
    boldClick(): void;
    italicClick(): void;
    linkClick(): void;
    blockquoteClick(): void;
    imageClick(): void;
    imageSelected(fileElement: Element): Promise<void>;
}
export { QuillService };
