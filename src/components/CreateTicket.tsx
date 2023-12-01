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
      <C.InputContainer>
        <div>
          <label htmlFor='name'>Name</label>
          <input type='text' placeholder='Name' id='name' />
        </div>
        <div>
          <label htmlFor='symbol'>Symbol</label>
          <input type='text' placeholder='symbol' id='symbol' />
        </div>
      </C.InputContainer>
      <input type='text' placeholder='organizer' />
      <input type='text' placeholder='location' />
      <input type='date' placeholder='date' />
      <input type='number' placeholder='ETH Price' step={0.1} />
      <input type='number' placeholder='Token Price' step={0.1} />
      <input type='number' placeholder='Ticket Total Supply' />
      <textarea placeholder='Description' />
      <button type='submit'>Create</button>
    </C.FormContainer>
  )
}

export default CreateTicket;

