import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import main_img from '@/assets/images/main.png';
import security from '@/assets/images/security.png';
import corruption from '@/assets/images/corruption.png';
import decentralized from '@/assets/images/decentralized.png';
import nft from '@/assets/images/nft.png';
import did from '@/assets/images/did.png';
import erc_6551 from '@/assets/images/erc_6551.png';


const Main = () => {

  const serviceRef = useRef<HTMLDivElement>(null);
  const whatIsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    const elements = document.querySelectorAll('.hidden');
    elements.forEach(el => observer.observe(el));
  
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  const scrollToService = () => {
    const serviceRefCurrent = serviceRef.current;
    if (!serviceRefCurrent) return;
  
    const targetPosition = serviceRefCurrent.getBoundingClientRect().top + window.pageYOffset;
    const offsetToCenter = window.innerHeight / 2;
    const elementHeight = serviceRefCurrent.clientHeight / 2;
    const scrollTo = targetPosition - offsetToCenter + elementHeight;

    const startPosition = window.pageYOffset;
    const distance = scrollTo - startPosition;
    const duration = 500; // 애니메이션 지속 시간 (밀리초)
    let start: number | null = null;
  
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const scroll = easeLinear(progress, startPosition, distance, duration);
      window.scrollTo(0, scroll);
      
      if (progress < duration) window.requestAnimationFrame(step);
    }
  
    window.requestAnimationFrame(step);
  };

  const handleScroll = () => {
    [serviceRef, whatIsRef].forEach(ref => {
      const top = ref.current?.getBoundingClientRect().top ?? 0;
      const windowHeight = window.innerHeight;
      if (top >= 0 && top <= windowHeight / 2) {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    })
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
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
            <div onClick={scrollToService}>
              <p>Learn More</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </MainBtnWrap>
        </MainLeft>
        <ImageContainer>
          <Image src={main_img} alt='main' layout='responsive' width={800} height={720} quality={100} />
        </ImageContainer>
      </MainWrap>
      <ServiceWrap ref={serviceRef} className='hidden'>
        <ServiceText>
          <h1>Our Service</h1>
          <p>
            Aliquam quis maximus lorem. Etiam lacinia leo elit, ut pellentesque diam dictum eget. Nulla facilisi.
            Fusce justo quam, cursus accumsan elementum euismod, feugiat quis dolor. 
            Ut id auctor urna, in sagittis dui. Praesent eu luctus metus. 
            Curabitur non sem pulvinar, malesuada lorem quis, elementum mi. 
            Ut lorem enim, fermentum id malesuada eget, euismod nec nulla. Etiam a turpis orci. 
            Fusce quis felis mollis, aliquam nulla eu, fermentum metus.
          </p>
          <p>
            Integer sed aliquam odio, at consectetur tortor. 
            Aenean mollis nisl et nibh facilisis, ut condimentum nulla pharetra. 
            Pellentesque venenatis ultricies congue.
          </p>
        </ServiceText>
        <ServiceCard>
          <div>
            <Image src={security} alt='security' width={100} height={100} />
            <p> 
              <span>Suscipit error labore vero eaque at quia voluptatibus.</span>
              Totam optio ullam amet dolore iusto dolores accusamus numquam. Reiciendis impedit aliquam.
            </p>
          </div>
          <div>
            <Image src={nft} alt='nft' width={100} height={100} style={{ backgroundColor: 'rgba(228, 192, 93, 0.5)'}} />
            <p> 
              <span>Suscipit error labore vero eaque at quia voluptatibus.</span>
              Totam optio ullam amet dolore iusto dolores accusamus numquam. Reiciendis impedit aliquam.
            </p>
          </div>
          <div>
            <Image src={decentralized} alt='decentralized' width={100} height={100} style={{ backgroundColor: 'rgba(78, 192, 78, 0.5)' }} />
            <p> 
              <span>Suscipit error labore vero eaque at quia voluptatibus.</span>
              Totam optio ullam amet dolore iusto dolores accusamus numquam. Reiciendis impedit aliquam.
            </p>
          </div>
          <div>
            <Image src={corruption} alt='corruption' width={100} height={100} style={{ backgroundColor: 'rgba(146, 198, 233, 0.5)' }} />
            <p> 
              <span>Suscipit error labore vero eaque at quia voluptatibus.</span>
              Totam optio ullam amet dolore iusto dolores accusamus numquam. Reiciendis impedit aliquam.
            </p>
          </div>
        </ServiceCard>
      </ServiceWrap>
      <WhatIsWrap ref={whatIsRef} className='hidden'>
        <ServiceText>
          <h1>What is ERC-6551, DID?</h1>
        </ServiceText>
        <WhatIsDesc>
          <div>
            <Image src={erc_6551} alt='ERC-6551' width={500} height={300} quality={100} layout='responsive' />
            <h3>ERC-6551</h3>
            <p>
              Aliquam quis maximus lorem. Etiam lacinia leo elit, ut 
              pellentesque diam dictum eget. Nulla facilisi.
              Fusce justo quam, cursus accumsan elementum euismod, feugiat quis dolor. 
              Ut id auctor urna, in sagittis dui. Praesent eu luctus metus.
            </p>
          </div>
          <div>
            <Image src={did} alt='ERC-6551' width={500} height={500} quality={100} layout='responsive' />
            <h3>DID</h3>
            <p>
              Integer sed aliquam odio, at consectetur tortor. 
              Aenean mollis nisl et nibh facilisis, ut condimentum nulla pharetra. 
              Pellentesque venenatis ultricies congue.
            </p>
          </div>
        </WhatIsDesc>
      </WhatIsWrap>
    </>
  )
}

const easeLinear = (t: number, b: number, c: number, d: number) => {
  return c * t / d + b;
}

export default Main;

const slideUp = keyframes`
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const MainWrap = styled.div`
  animation: ${slideUp} 1s ease forwards;
  width: 100%;
  height: calc(100vh - 15vh);
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: space-between;
  gap: 7rem;
  margin-bottom: 10rem;
`

const ImageContainer = styled.div`
  height: auto;
  
  img {
    max-width: 700px;
    max-height: 720px;
    border-radius: 2rem;
    box-shadow: 0 0 10px #999;
  }
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
  width: 100%;
  display: flex;
  align-items: center;
  gap: 3rem;

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
  div {
    width: 50%;
    display: flex;
    align-items: center;
    margin: 0;
    cursor: pointer;
    
    p {
      font-weight: bold;
      margin: 0;

      &:hover {
        text-decoration: underline;
      }
    }
    
    svg {
      width: 10%;
      margin-left: 0.5rem;
    }
  }
`

const ServiceWrap = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12rem;
`

const ServiceText = styled.div`
  width: 80%;
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    margin-bottom: 2rem;
  }
`

const ServiceCard = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 1rem;
  text-align: center;
  
  div {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 1rem 2rem;
    box-shadow: 0px 0px 10px #999;
    border-radius: 3rem;
    transition: all .3s;

    &:hover {
      transform: scale(1.1);
    }

    img {
      background-color: rgba(0, 100, 255, 0.2);
      border-radius: 50%;
      padding: 1rem;
    }

    p {
      display: flex;
      flex-direction: column;
      span {
        margin-bottom: 1rem;
        font-weight: bold;
      }
    }
  }
`

const WhatIsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10rem;
`

const WhatIsDesc = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 1rem;

  div {
    width: 80%;
    text-align: center;
    
    img {
      box-shadow: 0px 0px 10px #999;
      max-height: 397px;
      border-radius: 4rem;
    }
  }
`