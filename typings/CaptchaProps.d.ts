/**
 * This file was generated from Captcha.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export type AutoVerifyEnum = "off" | "onfocus" | "onload" | "onsubmit";

export type FloatingUiEnum = "none" | "auto" | "top" | "bottom";

export type HidefooterEnum = "Yes" | "No";

export type HidelogoEnum = "Yes" | "No";

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
    autoVerify: AutoVerifyEnum;
    delayTime: number;
    floatingUi: FloatingUiEnum;
    floatinganchor: string;
    offSet: number;
    hidefooter: HidefooterEnum;
    hidelogo: HidelogoEnum;
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
    autoVerify: AutoVerifyEnum;
    delayTime: number | null;
    floatingUi: FloatingUiEnum;
    floatinganchor: string;
    offSet: number | null;
    hidefooter: HidefooterEnum;
    hidelogo: HidelogoEnum;
}
