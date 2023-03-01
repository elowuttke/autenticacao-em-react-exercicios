import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../constants/baseURL";
import { goToFeed, goToLogin } from "../../routes/coordinator";
import { FormContainer, InputContainer } from "./styled";
import { useForm } from "../../hooks/useForm";

function SignUpPage() {
  const navigate = useNavigate();
  const { form, onChange, clear } = useForm({
    name: "",
    email: "",
    password: "",
  });

  //await
  const singUp = async (form, clear, navigate) => {
    try {
      const res = await axios.post(`${baseURL}/user/signup`, form);
      window.localStorage.setItem("token", res.data.token);
      alert("Usuário cadastrado com sucesso!");
      clear();
      goToFeed(navigate);
    } catch (err) {
      alert("Deu ruim");
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    singUp(form, clear, navigate);
  };

  return (
    <main>
      <h1>Cadastro</h1>
      <FormContainer onSubmit={onSubmitForm}>
        <InputContainer>
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={onChange}
            required
          />
        </InputContainer>
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
          // onClick={() => goToFeed(navigate)}
        >
          Cadastrar
        </button>
        <button type="button" onClick={() => goToLogin(navigate)}>
          Já sou cadastrado
        </button>
      </FormContainer>
    </main>
  );
}

export default SignUpPage;
