import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToLogin } from "../routes/coordinator";

export const useProtectedPage = () => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Ei, precisa fazer login ou se cadastrar.");
      goToLogin(navigate);
    }
  }, [token, navigate]);
};
