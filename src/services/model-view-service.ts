import { ModelView } from "../model-view";
import { Web } from "../web";
import { PostUIService } from "./post-ui-service";
import Core from "large-core";
import { QuillService } from "./quill-service";


class ModelViewService {

  //Handles routing to a controller
  async resolve(resolve, controller_promise: Promise<ModelView>) {

    let modelView: ModelView = await controller_promise;

    if (!modelView) return

    resolve({
      componentUrl: modelView.view
    },
      {
        context: { fn: modelView.model }
      })

  }


}

export { ModelViewService }
