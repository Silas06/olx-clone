import styled from "styled-components";

export const Container = styled.div`
background: red;
`;

export const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },

  areaImages: {
    display: 'flex',
  }
};
