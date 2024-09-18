import { FC } from "react";
import { CaptchaPreviewProps } from "../typings/CaptchaProps";
import Altcha from "./components/AltCha";

export const preview: FC<CaptchaPreviewProps> = ({
    hostname,
    apiKey,
    secret,
    license,
    verificationDnsName,
    verificationDnsType,
    verificationDnsValue
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

    return <Altcha Jsondata={json} />;
};

export function getPreviewCss(): string {
    return require("./ui/Captcha.css");
}
