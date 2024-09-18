/**
 * This file was generated from Captcha.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export interface CaptchaContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    captchaAttribute: EditableValue<string>;
    apiKey: string;
    secret: string;
    hostname: string;
    license: string;
    verificationDnsName: string;
    verificationDnsType: string;
    verificationDnsValue: string;
    captchaAction?: ActionValue;
}

export interface CaptchaPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    captchaAttribute: string;
    apiKey: string;
    secret: string;
    hostname: string;
    license: string;
    verificationDnsName: string;
    verificationDnsType: string;
    verificationDnsValue: string;
    captchaAction: {} | null;
}
