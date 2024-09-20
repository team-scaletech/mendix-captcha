import { useEffect, useRef, forwardRef, CSSProperties } from "react";
import "altcha"; // Importing the altcha package, which adds a <altcha-widget> element
import { generateRandomInt, generateRandomString, hmacSha256Hex, sha256Hex } from "../utils/utility";
import CryptoJS from "crypto-js";
import { AutoVerifyEnum, FloatingUiEnum, HidefooterEnum, HidelogoEnum } from "../../typings/CaptchaProps";

interface AltchaProps {
    customClass?: string;
    style?: CSSProperties;
    onStateChange?: (ev: Event | CustomEvent) => void;
    Jsondata: MyData; // this interface use to altcha challengejson
    localizationData?: Localization;
    autoVerify?: AutoVerifyEnum;
    delayTime?: number;
    floatingUi?: FloatingUiEnum;
    floatinganchor?: string;
    offSet?: number;
    hidefooter?: HidefooterEnum;
    hidelogo?: HidelogoEnum;
}
export interface MyData {
    hostname: string;
    apiKey: string;
    secret: string;
    license: string;
    verification: Verification;
}
export interface Verification {
    DNS: Dns;
}

export interface Dns {
    name: string;
    type: string;
    value: string;
}
export interface Localization {
    label: string;
    verified: string;
    verifying: string;
    waitAlert: string;
    error: string;
    expired: string;
}
const Altcha = forwardRef<{ value: string | null }, AltchaProps>(
    ({
        onStateChange,
        customClass,
        style,
        Jsondata: { hostname, apiKey, secret, license, verification },
        localizationData,
        autoVerify,
        delayTime,
        floatingUi,
        floatinganchor,
        offSet,
        hidefooter,
        hidelogo
    }) => {
        const widgetRef = useRef<HTMLElement>(null);
        const maxNumber = 100_000;
        const salt = generateRandomString();
        const secretNumber = generateRandomInt(maxNumber);
        const challenge = sha256Hex(salt + secretNumber);
        const hmacKey = CryptoJS.HmacSHA256("sha256", secret);
        const signature = hmacSha256Hex(challenge, hmacKey);

        const response = {
            algorithm: "SHA-256",
            challenge,
            maxNumber,
            salt,
            signature,
            test: false,
            hostname: hostname,
            apiKey: apiKey,
            secret: secret,
            license: license,
            verification: verification
        };

        useEffect(() => {
            const { current } = widgetRef;
            if (current) {
                const handleStateChange = async (ev: Event | CustomEvent) => {
                    if ("detail" in ev) {
                        onStateChange?.(ev);
                    }
                };
                current.addEventListener("statechange", handleStateChange);
                return () => current.removeEventListener("statechange", handleStateChange);
            }
        }, [onStateChange]);

        return (
            <div className={`${customClass}`}>
                <altcha-widget
                    style={style}
                    ref={widgetRef}
                    challengeurl={`https://us.altcha.org/api/v1/challenge?apiKey=${apiKey}`}
                    challengejson={JSON.stringify({
                        ...response
                    })}
                    strings={JSON.stringify({
                        ...localizationData
                    })}
                    auto={autoVerify}
                    delay={delayTime}
                    floating={floatingUi === "none" ? "false" : floatingUi}
                    floatinganchor={`button[type=${floatinganchor != "" ? floatinganchor : "submit"}]`}
                    floatingoffset={offSet}
                    hidefooter={hidefooter === "Yes" ? true : false}
                    hidelogo={hidelogo === "Yes" ? true : false}
                />
            </div>
        );
    }
);

export default Altcha;
