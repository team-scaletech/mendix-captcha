import { FC } from "react";
import { ReCaptchaPreviewProps } from "../typings/ReCaptchaProps";
import Altcha from "./components/AltCha";

export const preview: FC<ReCaptchaPreviewProps> = ({
    hostname,
    apiKey,
    secret,
    license,
    verificationDnsName,
    verificationDnsType,
    verificationDnsValue,
    captchaAction
}) => {
    console.dir(captchaAction);
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

    return <Altcha Jsondata={json} />;
};

export function getPreviewCss(): string {
    return require("./ui/ReCaptcha.css");
}
