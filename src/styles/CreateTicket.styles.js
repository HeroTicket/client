import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 2rem;
  overflow: scroll;

  input {
    width: 100%;
    border: none;
    border-bottom: 2px solid #999;
    outline: none;
    margin-top: 1.5rem;
    font-size: 1rem;

    &:focus {
      border-bottom: 2px solid #000;
    }
  }

  label {
    font-size: 1.2rem;
    font-weight: bold;
    span {
      color: red;
    }
  }
`;

export const ImageInputContainer = styled.div`
  width: 80%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const CreateImageContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 40%;
  width: 100%;
  height: 100%;
  border: 4px dotted #999;
  border-radius: 2rem;
  padding: 1rem 2rem;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    > img {
      width: 100% !important;
      height: 100% !important;
    }

    > svg {
      font-size: 13rem;
      color: #999;
      transition: all 0.3s;

      &:hover {
        color: #666;
      }
    }
  }

  &:hover {
    background-color: #eee;
  }
`;

export const InputWrap = styled.div`
  width: 80%;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 4rem;
  margin: 2rem 0;

  > div {
    width: 100%;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  textarea {
    height: 300px;
  }
`;
