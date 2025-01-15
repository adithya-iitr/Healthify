import { useGoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import React from "react";
const OauthLogin = ({ onBack }: { onBack: () => void }) => {
    const googleLogin = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            console.log(credentialResponse);
        },
        onError: () => {
            console.log('Login Failed');
        }
    });

    useEffect(() => {
        googleLogin();
    }, [])
    return <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900"
    >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to options
    </button>

};

export default OauthLogin;
