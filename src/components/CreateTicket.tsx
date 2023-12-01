import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import * as C from '@/styles/CreateTicket.styles';

const CreateTicket = () => {
  return (
    <C.FormContainer>
      <C.ImageInputContainer>
        <C.CreateImageContainer>
          <FontAwesomeIcon icon={faImage} />
          <input type='file' accept='image/*' hidden />
        </C.CreateImageContainer>
        <C.CreateImageContainer>
          <FontAwesomeIcon icon={faImage} />
          <input type='file' accept='image/*' hidden />
        </C.CreateImageContainer>
      </C.ImageInputContainer>
      <C.InputWrap>
        <C.InputContainer>
          <div>
            <label htmlFor='name'>Name <span>*</span></label>
            <input type='text' placeholder='Name' id='name' required />
          </div>
          <div>
            <label htmlFor='symbol'>Symbol <span>*</span></label>
            <input type='text' placeholder='symbol' id='symbol' required />
          </div>
        </C.InputContainer>
        <C.InputContainer>
          <div>
            <label htmlFor='organizer'>Organizer <span>*</span></label>
            <input type='text' placeholder='organizer' id='organizer' required />
          </div>
          <div>
            <label htmlFor='location'>Location <span>*</span></label>
            <input type='text' placeholder='location' id='location' required />
          </div>
        </C.InputContainer>
        <C.InputContainer>
          <div>
            <label htmlFor='date'>Date <span>*</span></label>
            <input type='date' placeholder='date' id='date' required />
          </div>
          <div>
            <label htmlFor='total'>Ticket Total Supply <span>*</span></label>
            <input type='number' placeholder='Ticket Total Supply' id='total' required />
          </div>
        </C.InputContainer>
        <C.InputContainer>
          <div>
            <label htmlFor='eth-price'>ETH Price <span>*</span></label>
            <input type='number' placeholder='ETH Price' id='eth-price' step={0.1} required />
          </div>
          <div>
            <label htmlFor='token-price'>Token Price <span>*</span></label>
            <input type='number' placeholder='Token Price' id='token-price' step={0.1} required />
          </div>
        </C.InputContainer>
        <C.TextContainer>
          <label htmlFor='desc'>Description <span>*</span></label>
          <textarea placeholder='Description' id='desc' required />
        </C.TextContainer>
      </C.InputWrap>
      <button type='submit'>Create</button>
    </C.FormContainer>
  )
}

export default CreateTicket;

