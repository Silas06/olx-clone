import React, { useState, useEffect } from "react";
import { PageArea, Fake, OthersArea, BreadCrumb } from "./styled";
import { PageContainer } from "../../components/MainComponent";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import useApi from "../../helpers/OlxApi";
import { Link, useParams } from "react-router-dom";
import MyAds from '../../components/partials/MyAds'

const Page = () => {
  const api = useApi();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState({});

  useEffect(() => {
    
    const userInfo = async () => {
      const json = await api.getInfoUser();
      console.log(json)
      
      setAdInfo(json);
      setLoading(false);
    };

    userInfo();
  }, []);

  const formatDate = (date) => {
    let cDate = new Date(date);

    let months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    let cDay = cDate.getDate();
    let cMonth = cDate.getMonth();
    let cYear = cDate.getFullYear();

    return `${cDay} de ${months[cMonth]} de ${cYear}`;
  };

  return (
    <PageContainer>
      {adInfo.category && (
 <BreadCrumb>
        Você esta aqui
        <Link to='/' >Home</Link>
        /
        <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
        /
        <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
        / {adInfo.title}
      </BreadCrumb>
      )}

      <PageArea>
        
      </PageArea>

        <OthersArea>
          {adInfo.ads && (
            <>
              <h2> Meu anúncios</h2>
              <div className="list">
                {adInfo.ads?.map((i, k) => (
                  <MyAds key={String(k)} data={i}/>
                ))}
              </div>
            </>
          )}
        </OthersArea>
    </PageContainer>
  );
};

export default Page;
