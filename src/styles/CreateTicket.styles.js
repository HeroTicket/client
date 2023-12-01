import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #999;
    outline: none;

    &:focus {
      border-bottom: 1px solid #000;
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

export const CreateImageContainer = styled.div`
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

  > svg {
    font-size: 13rem;
    color: #999;
    transition: all 0.3s;

    &:hover {
      color: #666;
    }
  }

  &:hover {
    background-color: #eee;
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
