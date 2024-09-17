// src/typings/custom-jsx.d.ts
declare namespace JSX {
    interface IntrinsicElements {
        "altcha-widget": AltchaWidgetReact;
    }
}

declare const mx: {
    data: {
        action(params: {
            actionname: string;
            params?: any;
            callback?: (result: any) => void;
            error?: (error: any) => void;
        }): void;
    };
};

declare module "mxui" {
    export const data: {
        action(params: {
            actionname: string;
            params?: any;
            callback?: (result: any) => void;
            error?: (error: any) => void;
        }): void;
    };
}
