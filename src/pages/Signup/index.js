import React, { useState, useEffect } from "react";
import { ModalContainer } from "./styled";
import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponent";
import useApi from "../../helpers/OlxApi";
import { doLogin } from "../../helpers/AuthHandle";

const Page = () => {
  const api = useApi();

  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("false");

  const [stateList, setStateList] = useState([]);

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStates = async () => {
      const sList = await api.getStates();
      setStateList(sList);
    };

    getStates();
  }, [
    api,
  ]); /*quando o array esta vazio indica que essa function ira executar apenas uma vez quando abrir a tela */

  async function handlwSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    setError("");

    if (password !== confirmPassword) {
      setError(
        "O campo senha não pode ser diferente do campo de confirmação de senha"
      );
      setDisabled(false);
      return;
    }

    const json = await api.register(name, email, password, state);

    if (json.error) {
      setError(json.error);
    } else {
      doLogin(json.token);
      window.location.href = "/";
    }

    setDisabled(false);
  }

  return (
    <PageContainer>
      <PageTitle>Cadastro</PageTitle>
      <ModalContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handlwSubmit}>
          <label className="area">
            <div className="area--title">Nome Completo</div>
            <div className="area--input">
              <input
                required
                disabled={disabled}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Estado </div>
            <div className="area--input">
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option> </option>
                {stateList.map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
            {state}
          </label>
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
            {password}
          </label>
          <label className="area">
            <div className="area--title">Confirmar Senha</div>
            <div className="area--input">
              <input
                required
                disabled={disabled}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="*******"
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled} type="submit">
                Cadastrar
              </button>{" "}
            </div>
          </label>
        </form>
      </ModalContainer>
    </PageContainer>
  );
};

export default Page;
