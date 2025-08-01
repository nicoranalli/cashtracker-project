'use client'

import { useState } from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import ValidateTokenForm from "./ValidateTokenForm";

export default function PasswordResetHandler() {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [token, setToken] = useState('');


  const handleTokenValidation = (isValid: boolean, token: string) => {
    setIsTokenValid(isValid);
    setToken(token);
  };

  return (
    <>
      {!isTokenValid ? 
      <ValidateTokenForm onTokenValidated={handleTokenValidation} />
      :<ResetPasswordForm token ={token} />
      }
    </>
  );
}