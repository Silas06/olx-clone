import React, { useRef, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'

import MaskedInput from 'react-text-mask'
import Modal from 'react-modal';
import { customStyles, Container } from "./styled";
import { ModalContainer } from "../../../pages/AddAd/styled";

import { 
  ErrorMessage,
} from "../../MainComponent";

import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import useApi from "../../../helpers/OlxApi";

const baseUrlImage = 'http://alunos.b7web.com.br:501/media/'
const Footer = (props) => {
   const api = useApi();
  const fileField = useRef()
  const history = useHistory()

  const [categories, setCategories] = useState([])

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [priceNegotiable, setPriceNegotiable] = useState(false)
  const [desc, setDesc] = useState('')

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

   useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories()
      setCategories(cats)
     }
     
     getCategories()
  },[])

  async function handleSubmit(e) {
    console.log(props.data)
    
    e.preventDefault();
    setDisabled(true);
    setError("");
    let errors = []

    if (!props.data.title.trim()) {
      errors.push('Sem titulo')
    }

    if (!props.data.category) {
      errors.push('Sem categoria')
    }

    if (errors.length === 0) {
      const fData = new FormData()
      fData.append('title', props.data.title)
      fData.append('price', props.data.price)
      fData.append('priceneg', props.data.priceNegotiable)
      fData.append('desc', props.data.description)
      fData.append('categoria', props.data.category)
      fData.append('images', props.data.images)

      if (fileField.current.files.length > 0) {
        for (let i = 0; i < fileField.current.files.length; i++) {
          fData.append('img', fileField.current.files[i])
        }
      }

      const json = await api.editAd(props.data.id, fData)
      
      if (!json.error) {
        props.userInfo()
        props.closeModal()
        setDisabled(false)        
        return
      } else {
        setError(json.error)
      }
    } else {
      setError(errors.join("/n"))
    }

    setDisabled(false);
  }
  const priceMask = createNumberMask({
    prefix: 'R$ ',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ','
  })
  
  return (
    <Container>
      <Modal
        isOpen={props.modalsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <ModalContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Titulo</div>
            <div className="area--input">
              <input
                required
                disabled={disabled}
                type="text"
                value={props.data.title}
                  onChange={(e) => props.SetDataEdit({ ...props.data, title: e.target.value })}
                placeholder="Titulo"
              />
            </div>
          </label>
          <label className="area">
              <div className="area--title">Categoria</div>
            <div className="area--input">
                <select disabled={disabled}
                  value={props.data.category}
                  onChange={(e) => props.SetDataEdit({ ...props.data, category: e.target.value })}
                  required>
                <option></option>
                {categories && categories.map((i,k) => (
                  <option key={String(k)} value={i._id}>{i.name}</option>
                ))}
              </select>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Preço</div>
            <div className="area--input">
              <MaskedInput
                mask={priceMask}
                placeholder="R$ "
                disabled={disabled || priceNegotiable}
                value={props.data.price}                  
                onChange={(e) => props.SetDataEdit({ ...props.data, price: e.target.value })}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Preço negociável</div>
            <div className="area--input">
                <input type="checkbox"
                  disabled={disabled}
                  checked={props.data.priceNegotiable}                  
                  onChange={(e) => props.SetDataEdit({ ...props.data, priceNegotiable: !props.data.priceNegotiable })}
                  price
                />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Descrição</div>
            <div className="area--input">
                <textarea disabled={disabled}
                  value={props.data.description}                  
                  onChange={(e) => props.SetDataEdit({ ...props.data, description: e.target.value })}
                >
                  
                  </textarea>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Imagens</div>
          </label>
              
                <div className="area--images" style={{display: 'flex' }}>
              {props.data.images?.map((item, i) => (
                <>
                  <div >
                    <label> imagem padrao <input type="checkbox" checked={item.default}  onChange={() => props.data.images[i].default = item.default} /></label>
                  <div style={{marginTop:8}}>
                    <img
                      width={'25%'}
                      key={String(i)}
                      src={baseUrlImage + item.url} />
                  </div>
                  </div>
                  </>
                ))}
           
              </div>
           
          <label className="area">
            <div className="area--title">Adicionar imagem</div>
            <div className="area--input">
              <input
                type="file"
                disabled={disabled}
                ref={fileField}
                multiple
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button  type="submit" onClick={handleSubmit}>
                Salvar
              </button>{" "}
            </div>
          </label>
        </form>
      </ModalContainer>
      </Modal>
    </Container>
  );
};

export default Footer;
