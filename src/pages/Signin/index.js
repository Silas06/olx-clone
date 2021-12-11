import React, {  useState } from "react";
import { ModalContainer } from "./styled";
import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponent";
import useApi from "../../helpers/OlxApi";
import { doLogin } from "../../helpers/AuthHandle";
import { Link } from "react-router-dom";

const Page = () => {
  const api = useApi();

  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

 

  async function handlwSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    setError("");
    const json = await api.login(email, password);

    if (json.error) {
      setError(json.error);
    } else {
      doLogin(json.token, rememberPassword);

      window.location.href = "/";
    }

    setDisabled(false);
  }

  return (
    <PageContainer>
      <PageTitle>Login</PageTitle>
      <ModalContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handlwSubmit}>
          <label className="area">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input
                required
                disabled={disabled}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="silas@gmail.com"
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input
                required
                disabled={disabled}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*******"
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Lembrar Senha</div>
            <div className="area--input">
              <input
                disabled={disabled}
                type="checkbox"
                value={rememberPassword}
                onChange={(e) => setRememberPassword(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled} type="submit">
                Entrar
              </button>{" "}
            </div>
          </label>
        </form>
      </ModalContainer>
    </PageContainer>
  );
};

export default Page;
