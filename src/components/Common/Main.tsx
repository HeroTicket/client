import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import main_img from '@/assets/images/main.png';


const Main = () => {

  return (
    <MainWrap>
      <MainLeft>
        <h1>Lorem ipsum dolor sit amet.</h1>
        <p>
          Aliquam erat volutpat. Sed nec diam lorem. 
          Proin malesuada facilisis dui, in aliquet tellus tristique nec. 
          Ut sed tortor id magna efficitur consectetur. 
          Integer viverra lobortis laoreet. Donec id condimentum est. 
          Vivamus in ornare ante. Suspendisse ac libero vel felis tempus rutrum non iaculis magna. 
          Donec venenatis fermentum vehicula. 
        </p>
        <MainBtnWrap>
          <button>Get Start</button>
          <p>
            Learn More
            <FontAwesomeIcon icon={faAngleDown} />
          </p>
        </MainBtnWrap>
      </MainLeft>
      <Image src={main_img} alt='main' width={800} height={720} />
    </MainWrap>
  )
}

export default Main;

const MainWrap = styled.div`
  width: 100%;
  height: calc(100vh - 15vh);
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 15rem;
`

const MainLeft = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 3.5rem;
  }

  p {
    font-size: 1.3rem;
    margin-bottom: 5rem;
  }
`

const MainBtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  button {
    background-color: red;
    color: white;
    padding: .7rem 3rem;
    border: none;
    border-radius: .6rem;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      background-color: #D71313;
    }
  }
  p {
    display: flex;
    align-items: center;
    margin: 0;
    font-weight: bold;
    cursor: pointer;

    svg {
      font-size: 1.5rem;
      margin-left: 0.5rem;
    }
    
    &:hover {
      text-decoration: underline;
    }
    
  }

`