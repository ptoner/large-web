import { ModelView } from "../model-view";
import { UiService } from "./ui-service";
import { Web } from "../web";
import { PostUIService } from "./post-ui-service";
import Core from "large-core";
import { QuillService } from "./quill-service";


class ModelViewService {

  isInitialized:boolean = false

  constructor(
    private initFunction:Function,
    private initControllers:Function,
    private uiService: UiService
  ) { }

  async initAndResolve(resolve, successFunction) {
    try {

      if (!this.isInitialized) {
        //Run the function we're given to initialize the Core
        await this.initFunction()

        Web.postUiService = new PostUIService(Core.postService, Core.profileService, Core.schemaService, Core.imageService)
        Web.quillService = new QuillService(Web.uploadService, Core.imageService)

        //Initialize the controllers
        this.initControllers()

        this.isInitialized = true
      }

      return this.resolve(resolve, successFunction())

    } catch (ex) {
      console.log(ex)
      return this.uiService.showExceptionPopup(ex)
      // Global.navigate("/settings")
    }
  }


  //Handles routing to a controller
  async resolve(resolve, controller_promise: Promise<ModelView>) {

    try {

      let modelView: ModelView = await controller_promise;

      if (!modelView) return

      resolve({
        componentUrl: modelView.view
      },
        {
          context: { fn: modelView.model }
        })

    } catch (ex) {
      this.uiService.showExceptionPopup(ex)
      console.log(ex)
    }

  }



}

export { ModelViewService }
