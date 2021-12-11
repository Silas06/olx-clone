import React, { useState, useEffect } from "react";
import { ModalContainer } from "./styled";
import Modal from 'react-modal';
import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponent";
import useApi from "../../helpers/OlxApi";
import { doLogin } from "../../helpers/AuthHandle";

import {OthersArea} from '../../components/MainComponent'
import MyAds from '../../components/partials/MyAds'
import ModalAds from '../../components/partials/ModalAds'

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

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState({});

  const [modalsOpen, setIsOpen] = useState(false);

  const [dataEdit, SetDataEdit] = useState('')

  function openModal(item) {
    console.log(item)
    SetDataEdit(item)
    setIsOpen(true);
  }
  function closeModal() {
    SetDataEdit('')
    setIsOpen(false);
  }

  useEffect(() => {
    const getStates = async () => {
      const sList = await api.getStates();
      setStateList(sList);
    };

    getStates();
  }, [
    api,
  ]); /*quando o array esta vazio indica que essa function ira executar apenas uma vez quando abrir a tela */

  const userInfo = async () => {
    const json = await api.getInfoUser();
    
    setName(json.name)
    setState(json.state)
    setEmail(json.email)
    
    setAdInfo(json);
    setLoading(false);
  };
  useEffect(() => {
    userInfo();
  },[])

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

    const json = await api.editUser(name, email, password, state);

    if (json.error) {
      setError(json.error);
    } else {
      alert('Dados atualizados!')
    }

    setDisabled(false);
  }

  return (
    <PageContainer>
      <PageTitle>Minha Conta</PageTitle>
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
                  <option key={i._id} value={i.state}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
         
          </label>
          <label className="area">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input
                
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
                Salvar
              </button>{" "}
            </div>
          </label>
        </form>
      </ModalContainer>

      <OthersArea>
          {adInfo.ads && (
            <> 
              <h2> Meu anúncios</h2>
              <div className="list">
                {adInfo.ads?.map((i, k) => (
                  <MyAds key={String(k)} data={i} onClick={() => openModal(i)}/>
                ))}
              </div>
            </>
          )}
      </OthersArea>

   
      <ModalAds
        modalsOpen={modalsOpen}
        closeModal={closeModal}
        data={dataEdit}
        SetDataEdit={SetDataEdit}
        userInfo={userInfo}
      />
      
    </PageContainer>
  );
};

export default Page;
