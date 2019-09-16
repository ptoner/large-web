import { PromiseView } from "../promise-view";
declare class QueueService {
    constructor();
    queuePromiseView(promiseView: PromiseView): Promise<any>;
    beforeSaveAction(queueItem: QueueItem): void;
    afterSaveAction(queueItem: QueueItem): void;
}
declare class QueueItem {
    id: string;
    icon: string;
    titleTemplate: string;
    linkTemplate: string;
    context: any;
    title: string;
    link: string;
    toast: any;
    constructor(id: string, icon: string, titleTemplate: string, linkTemplate: string, context: any);
}
export { QueueService, QueueItem };
