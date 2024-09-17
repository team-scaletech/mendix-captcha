import { useEffect, useRef, forwardRef, CSSProperties } from "react";
import "altcha"; // Importing the altcha package, which adds a <altcha-widget> element
import { generateRandomInt, generateRandomString, hmacSha256Hex, sha256Hex } from "../utils/utility";
import CryptoJS from "crypto-js";

interface AltchaProps {
    customClass?: string;
    style?: CSSProperties;
    onStateChange?: (ev: Event | CustomEvent) => void;
    Jsondata: MyData; // this interface use to altcha challengejson
    // localizationData?: Localization;
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
        Jsondata: { hostname, apiKey, secret, license, verification }
        // localizationData
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
            hostname: hostname,
            apiKey: apiKey,
            secret: secret,
            license: license,
            verification: verification
        };

        useEffect(() => {
            const { current } = widgetRef;
            if (current) {
                current.addEventListener("statechange", handleStateChange);
                return () => current.removeEventListener("statechange", handleStateChange);
            }
        }, []);
        const handleStateChange = (ev: Event | CustomEvent) => {
            if ("detail" in ev) {
                onStateChange?.(ev);
            }
        };
        return (
            <div className={`${customClass}`}>
                <altcha-widget
                    challengeurl={`https://us.altcha.org/api/v1/challenge?apiKey=${apiKey}`}
                    challengejson={JSON.stringify({
                        ...response
                    })}
                    // strings={JSON.stringify({
                    //     ...localizationData
                    // })}
                    style={style}
                    ref={widgetRef}
                />
            </div>
        );
    }
);

export default Altcha;
