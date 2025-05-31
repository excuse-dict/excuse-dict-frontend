import ReCAPTCHA from "react-google-recaptcha";
import {RefObject} from "react";

export default function ReCAPTCHAComponent({ recaptchaRef }:{
    recaptchaRef: RefObject<ReCAPTCHA | null>
}){

    return (
        <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            size="invisible"
        />
    );
}