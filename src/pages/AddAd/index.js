import React, { useState, useRef, useEffect } from "react";
import {useHistory } from 'react-router-dom'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { ModalContainer } from "./styled";
import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponent";
import useApi from "../../helpers/OlxApi";
import { Link } from "react-router-dom";

const Page = () => {
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
    e.preventDefault();
    setDisabled(true);
    setError("");
    let errors = []

    if (!title.trim()) {
      errors.push('Sem titulo')
    }

    if (!category) {
      errors.push('Sem categoria')
    }

    if (errors.length === 0) {
      const fData = new FormData()
      fData.append('title', title)
      fData.append('price', price)
      fData.append('priceneg', priceNegotiable)
      fData.append('desc', desc)
      fData.append('cat', category)

      if (fileField.current.files.length > 0) {
        for (let i = 0; i < fileField.current.files.length; i++) {
          fData.append('img', fileField.current.files[i])
        }
      }

      const json = await api.addAd(fData)
      
      if (!json.error) {
        history.push(`/ad/${json.id}`)
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
    <PageContainer>
      <PageTitle>Postar um anuncio</PageTitle>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titulo"
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Categoria</div>
            <div className="area--input">
              <select disabled={disabled} onChange={(e) => setCategory(e.target.value)} required>
                <option></option>
                {categories && categories.map((i,k) => (
                  <option key={String(k)} value={i._id}>{i.name}</option>
                ))}
              </select>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Pre??o</div>
            <div className="area--input">
              <MaskedInput
                mask={priceMask}
                placeholder="R$ "
                disabled={disabled || priceNegotiable}
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Pre??o negoci??vel</div>
            <div className="area--input">
              <input type="checkbox" disabled={disabled} checked={priceNegotiable} onChange={ ()=> setPriceNegotiable(!priceNegotiable)}/>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Descri????o</div>
            <div className="area--input">
              <textarea disabled={disabled} value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Imagens (1 ou mais)</div>
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
              <button disabled={disabled} type="submit">
                Adicionar anuncio
              </button>{" "}
            </div>
          </label>
        </form>
      </ModalContainer>
    </PageContainer>
  );
};

export default Page;
