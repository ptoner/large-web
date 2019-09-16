import { ModelView } from "../model-view";
import { UiService } from "./ui-service";
import { InitService } from "./init-service";
declare class RouteService {
    private initService;
    private uiService;
    constructor(initService: InitService, uiService: UiService);
    initAndResolve(resolve: any, successFunction: any): Promise<void>;
    resolveController(resolve: any, controller_promise: Promise<ModelView>): Promise<void>;
}
export { RouteService };
