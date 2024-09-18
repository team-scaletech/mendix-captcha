import { FC } from "react";
import { CaptchaContainerProps } from "../typings/CaptchaProps";
import Altcha from "./components/AltCha";
import "./ui/Captcha.css";

export const Captcha: FC<CaptchaContainerProps> = ({
    hostname,
    apiKey,
    secret,
    license,
    verificationDnsName,
    verificationDnsType,
    verificationDnsValue,
    labelMessage,
    verifiedMessage,
    verifyingMessage,
    waitAlertMessage,
    errorMessage,
    expiredMessage,
    captchaAction,
    captchaAttribute,
    style,
    class: customClass
}) => {
    const json = {
        hostname: hostname,
        apiKey: apiKey,
        secret: secret,
        license: license,
        verification: {
            DNS: {
                name: verificationDnsName,
                type: verificationDnsType,
                value: verificationDnsValue
            }
        }
    };
    const localizationData = {
        label: labelMessage ? labelMessage : "I'm not a robot",
        verified: verifiedMessage ? verifiedMessage : "Verified",
        verifying: verifyingMessage ? verifyingMessage : "Verifying...",
        waitAlert: waitAlertMessage ? waitAlertMessage : "Verifying... please wait.",
        error: errorMessage ? errorMessage : "Verification failed. Try again later.",
        expired: expiredMessage ? expiredMessage : "Verification expired. Try again."
    };
    const onchange = (ev: Event | CustomEvent) => {
        if ("detail" in ev) {
            const captchaState = ev.detail.state || "";
            if (captchaState === "verified" && captchaAttribute) {
                try {
                    captchaAttribute.setValue(captchaState);
                } catch (error) {
                    console.error("Error setting attribute value:", error);
                }
            }

            if (captchaState === "verified" && captchaAction && captchaAction.canExecute) {
                captchaAction.execute();
            }
        }
    };
    return (
        <Altcha
            Jsondata={json}
            localizationData={localizationData}
            style={style}
            customClass={customClass}
            onStateChange={ev => onchange(ev)}
        />
    );
};
