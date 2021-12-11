import styled from "styled-components";

export const HeaderArea = styled.div`
  height: 60px;
  background-color: #fff;
  border-bottom: solid 1px #ccc;

  a {
    text-decoration: none;
  }

  .container {
    max-width: 1000px;
    margin: auto;
    height: 100%;
    display: flex;
  }

  .logo {
    flex: 1;
    display: flex !important;
    align-items: center;

    .logo1,
    .logo2,
    .logo3 {
      font-size: 27px;
      font-weight: bold;
    }
    .logo1 {
      color: #ff0000;
    }
    .logo2 {
      color: #00ff00;
    }
    .logo3 {
      color: #0000ff;
    }
  }

  nav {
    padding-top: 10px;
    padding-bottom: 10px;

    ul,
    li {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    ul {
      display: flex;
      align-items: center;
      gap: 10px;
      height: 40px;
    }

    li {
      a,
      button {
        border: 0;
        cursor: pointer;
        background: 0;
        color: #000;
        font-size: 14px;
        text-decoration: none;
        transition: 0.2s;

        &:hover {
          color: #999;
        }

        &.button {
          background-color: #ff8100;
          border-radius: 4px;
          padding: 5px 10px;
          transition: 0.5s;
        }

        &.button:hover {
          background-color: #e57706;
          color: #fff;
        }
      }
    }
  }

  @media (max-width:600px) {
    height:auto;
    .container {
      flex-direction: column;
    }

    .logo{
      justify-content: center;
      margin: 20px 0;
    }

    nav ul {
      flex-direction: column;
      height: auto;
    } 

    nav li {
      margin: 5px 20px;
    }
  }
`;
