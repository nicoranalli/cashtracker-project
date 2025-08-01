'use client'

import { validateToken } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ValidateTokenFormProps {
    onTokenValidated: (isValid: boolean, token: string) => void;
  }

export default function ValidateTokenForm({ onTokenValidated }: ValidateTokenFormProps) {

    const [token, setToken] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const validateTokenWithT = validateToken.bind(null, token)
    const [state, formAction] = useActionState(validateTokenWithT, {
        errors: [],
        success: ''
    }
    )

    useEffect(() => {
        if (isComplete) {
            startTransition(() => {// Add your data
                formAction();
            });

        }
    }, [isComplete, formAction]);



    useEffect(() => {
        if (state.errors.length > 0) {
            state.errors.forEach((error) => {
                toast.error(error)
            })
        }
        if (state.success) {
            toast.success(state.success, {
                onClose: () => {
                    onTokenValidated(true, token);
                },
                onClick: () => {
                    onTokenValidated(true, token);
                  }
            })

        }

    }, [state, onTokenValidated, token])


    const handleChange = (token: string) => {
        setToken(token);
    }

    const handleComplete = () => {
        console.log('complete')
        setIsComplete(true);
    }

    return (
        <div className="flex justify-center gap-5 my-10">
            <PinInput
                value={token}
                onChange={handleChange}
                onComplete={handleComplete}
            >
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
            </PinInput>
        </div>
    )

}