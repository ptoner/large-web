import { ModelView } from "../model-view";
import { UiService } from "./ui-service";
import { InitService } from "./init-service";


class RouteService {

  constructor(
    private initService: InitService,
    private uiService: UiService
  ) { }


  async initAndResolve(resolve, successFunction) {
    try {
      await this.initService.initialize()
      this.resolveController(resolve, successFunction())
    } catch (ex) {
      console.log(ex)
      this.uiService.showExceptionPopup(ex)
      // Global.navigate("/settings")
    }
  }


  //Handles routing to a controller
  async resolveController(resolve, controller_promise: Promise<ModelView>) {

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

export { RouteService }
