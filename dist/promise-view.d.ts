declare class PromiseView {
    promise: Promise<any>;
    title: string;
    icon: string;
    context: any;
    view: string;
    constructor(promise: Promise<any>, title: string, icon: string, context: any, view: string);
}
export { PromiseView };
