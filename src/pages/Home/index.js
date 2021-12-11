import React, { useState, useEffect } from "react";
import { PageArea, SearchArea } from "./styled";
import useApi from "../../helpers/OlxApi";
import { Link } from "react-router-dom";

import { PageContainer } from "../../components/MainComponent";
import AdItem from "../../components/partials/AdItem";

const Page = () => {
  const api = useApi();

  const [stateList, setStateList] = useState([]);
  const [categoriesList, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

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

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: "desc",
        limit: 8,
      });
      setAdList(json.ads);
    };

    getRecentAds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="GET" action="/ads">
              <input type="text" name="q" placeholder="O que você procura? " />
              <select name="state">
                {stateList.map((i, index) => (
                  <option key={index} value={i.name}>
                    {i.name}
                  </option>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
          <div className="categoryList">
            {categoriesList.map((categorie, index) => (
              <Link
                key={index}
                to={`/ads?cat=${categorie.slug}`}
                className="categorie-item"
              >
                <img src={categorie.img} alt={categorie.name} />
                <span>{categorie.name}</span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </SearchArea>

      <PageContainer>
        <PageArea>
          <h2>Anúncios Recentes</h2>
          <div className="list">
            {adList.map((ad, index) => (
              <AdItem key={index} data={ad} />
            ))}
          </div>
          <Link to="/ads" className="seeAllLink">
            Ver Todos
          </Link>
          <hr />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bestiarum
          vero nullum iudicium puto. Quis istud, quaeso, nesciebat? Atque hoc
          loco similitudines eas, quibus illi uti solent, dissimillimas
          proferebas. Quamquam ab iis philosophiam et omnes ingenuas disciplinas
          habemus;
        </PageArea>
      </PageContainer>
    </>
  );
};

export default Page;
