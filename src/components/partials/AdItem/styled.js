import styled from "styled-components";

export const Item = styled.div`
  padding: 10px;

  a {
    display: block;
    border: solid 1px #fff;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
    color: #000;
    background-color: #fff;

    &:hover {
      border: solid 1px #ccc;
    }

    .itemImage img {
      width: 100%;
      border-radius: 5px;
      height: auto;
    }

    .itemName{
      font-weight:bold;
    }
  }
`;
