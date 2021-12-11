import React from "react";
import { Link } from "react-router-dom";
import { Item } from "./styled";



const baseUrlImage = 'http://alunos.b7web.com.br:501/media/'
const Component = (props) => {
  let price = "";

  if (props.data.priceNegotiable) {
    price = "Preço Negociável";
  } else {
    price = `R$ ${props.data.price}`;
  }
  return (
    <Item className="aditem">
      <button onClick={props.onClick}>
        <div className="itemImage">
          {props.data.images.length > 0 && (
            <img src={baseUrlImage+props.data.images[0].url} alt="Anúncio" />
            
          )}
        </div>

        <div>

          <small>Categoria: {props.data.category}</small>
          
        </div>

        <div className="itemName">{props.data.title}</div>

        <div className="itemPrice">{props.data.price}</div>
      </button>
    </Item>
  );
};

export default Component;
