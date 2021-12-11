import React, { useState, useEffect } from "react";
import { PageArea } from "./styled";
import useApi from "../../helpers/OlxApi";
import { useLocation, useHistory } from "react-router-dom";

import { PageContainer } from "../../components/MainComponent";
import AdItem from "../../components/partials/AdItem";

let timer;

const Page = () => {
  const api = useApi();
  const history = useHistory()


  const useQueryString = () => {
    return new URLSearchParams( useLocation().search )
  }

  const query = useQueryString()

  const [q, setQ] = useState( query.get('q') !== null ? query.get('q'): '' )
  const [cat, setCat] = useState( query.get('cat') !== null ? query.get('cat'): '' )
  const [state, setState] = useState( query.get('state') !== null ? query.get('state'): '' )

  const [stateList, setStateList] = useState([]);
  const [categoriesList, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

  const [warningMessage,setWarningMessage] =useState('Carregando...')
  const [loading,setLoading] =useState(true)

  const [resultOpacity, setResultOpacity] = useState(1)

  const getAdsList = async () => {
    setLoading(true)
    setWarningMessage('Carregando')
       const json = await api.getAds({
        sort: "desc",
         limit: 9,
         q,
         cat,
        state 
       });
    setAdList(json.ads);
    setResultOpacity(1)

    setLoading(false)
    if (json.ads.length === 0) {
      setWarningMessage('Nehum item encontrado')
    }
  }

  useEffect(() => {
    const queryString = []

    if (q) {
      queryString.push(`q=${q}`)
    }
    if (cat) {
      queryString.push(`cat=${cat}`)
    }
    if (state) {
      queryString.push(`cat=${state}`)
    }
    history.replace({
      search: `?${queryString.join('&')}`
    })

    if (timer) {
      clearTimeout(timer)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    timer = setTimeout(getAdsList, 2000)
    setResultOpacity(.3)
  },[q,cat,state])

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };
    getStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <PageContainer>
        <PageArea>
          <div className="leftSide">
            <form method="GET">
              <input
                type="text"
                name="q"
                placeholder="O que você procura?"
                value={q}
                onChange={e => setQ(e.target.value)}
              />

              <div className="filterName">
                Estado:
                 </div>

              <select name="state"
                value={state}
                onChange={e => setState(e.target.value)}
              >
                  <option></option>
                  {stateList && stateList.map((i,k) => (
                    <option key={String(k)}>{ i.name }</option>
                  ))}
                </select>
             
              <div className="filterName">
                Categoria:
              </div>
              <ul>
                {categoriesList && categoriesList.map((i,k) => (
                  <li key={String(k)} className={cat === i.slug ? 'categoryItem active' : 'categoryItem'}
                    onClick={() => setCat(i.slug)}
                  >
                    <img src={i.img} alt={i.name} />
                    <span>{i.name}</span>
                  </li>                  
                ))}
                </ul>
              
            </form>
          </div>
          <div className="rightSide">
            <h2> Resultados</h2>

            {loading && (
              <div className="listWarning">{warningMessage}</div>
            )}

            {!loading && adList.length === 0 && (
              <div className="listWarning">{warningMessage}</div>
            )}
     
              
          
            <div className="list" style={{opacity: resultOpacity}}>
              {adList.map((i,k) => (
                <AdItem  key={String(k)} data={i} />
              ))}
            </div>
                
          
          </div>
        </PageArea>
        </PageContainer>
      </>
  );
};

export default Page;
