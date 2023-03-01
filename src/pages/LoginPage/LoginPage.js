import React from "react";
import { useNavigate } from "react-router-dom";
import { goToFeed, goToSignUp } from "../../routes/coordinator.js";
import { FormContainer, InputContainer } from "./styled.js";
import { useForm } from "../../hooks/useForm.js";
import axios from "axios";
import { baseURL } from "../../constants/baseURL";

function LoginPage() {
  const navigate = useNavigate();

  const { form, onChange, clear } = useForm({
    email: "",
    password: "",
  });

  const login = (form, clear, navigate) => {
    axios
      .post(`${baseURL}/user/login`, form)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        console.log(res.data.token);
        clear();
        goToFeed(navigate);
      })
      .catch((err) => {
        console.log(err);
        alert("Erro no login");
      });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    login(form, clear, navigate);
  };

  return (
    <main>
      <h1>Login</h1>
      <FormContainer onSubmit={onSubmitForm}>
        <InputContainer>
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            name="password"
            value={form.password}
            onChange={onChange}
            required
          />
        </InputContainer>
        <button
          type="submit"
          //onClick={() => goToFeed(navigate)}
        >
          Entrar
        </button>
        <button type="button" onClick={() => goToSignUp(navigate)}>
          Não tenho cadastro
        </button>
      </FormContainer>
    </main>
  );
}

export default LoginPage;
