'use client'
import { confirmAccount } from "@/actions/confirm-account-action"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { startTransition, useActionState, useEffect, useState } from "react"
import {toast} from 'react-toastify'
import { useRouter } from 'next/navigation'



export default function ConfirmAccountForm() {
    const [token, setToken] = useState('')
    const [isComplete, setIsComplete] = useState(false)

    const confirmAccountWithToken = confirmAccount.bind(null, token)
    const [state, formAction] = useActionState(confirmAccountWithToken, {
        errors: [],
        success: ''
    }
    )

    const router = useRouter()


    useEffect(() => {
        if (isComplete) {
            startTransition(() => {// Add your data
                formAction();
                
            });
         
        }
    }, [isComplete, formAction, router]);

    useEffect(() => {
        if (state.errors.length > 0) {
            state.errors.forEach((error) => {
                toast.error(error)
            })
        }
        if (state.success) {
            toast.success(state.success, {
                onClose: () => {
                    router.push('/auth/login')
                }
            })

        }

    }, [state, router])

    const handleChange = (token: string) => {
        setToken(token)
    }

    const handleComplete = () => {
        setIsComplete(true)
    }


    return (
        <>

            <div className="flex justify-center items-center gap-2 m-5">
                <PinInput
                    value={token}
                    onChange={handleChange}
                    onComplete={handleComplete}
                >
                    <PinInputField className="h-10 w-10 border border-gray-300 text-center shadow rounded-xl placeholder-white" />
                    <PinInputField className="h-10 w-10 border border-gray-300 text-center shadow rounded-xl placeholder-white" />
                    <PinInputField className="h-10 w-10 border border-gray-300 text-center shadow rounded-xl placeholder-white" />
                    <PinInputField className="h-10 w-10 border border-gray-300 text-center shadow rounded-xl placeholder-white" />
                    <PinInputField className="h-10 w-10 border border-gray-300 text-center shadow rounded-xl placeholder-white" />
                    <PinInputField className="h-10 w-10 border border-gray-300 text-center shadow rounded-xl placeholder-white" />
                </PinInput>

            </div>


        </>
    )
}