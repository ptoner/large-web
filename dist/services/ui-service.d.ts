declare class UiService {
    private app;
    constructor(app: any);
    navigate(url: string): void;
    showExceptionPopup(ex: any): void;
    loadComponentState(component: any, showSpinner?: boolean): Promise<void>;
    showSpinner(): void;
    hideSpinner(): void;
}
export { UiService };
