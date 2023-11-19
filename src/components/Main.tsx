import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { MainImg, NftImg, Security, Corruption, Decentralized, Did, Erc6551 } from './Common/Reference';
import { ButtonStyle } from '@/styles/styled';
import { MainWrap, ImageContainer, MainBtnWrap, MainLeft, ServiceWrap, ServiceCard, ServiceText, WhatIsWrap, WhatIsDesc } from '../styles/Main.styles';


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
            <ButtonStyle>Get Start</ButtonStyle>
            <div onClick={scrollToService}>
              <p>Learn More</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </MainBtnWrap>
        </MainLeft>
        <ImageContainer>
          <Image src={MainImg} alt='main' layout='responsive' width={800} height={720} quality={100} />
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
            <Image src={Security} alt='security' width={100} height={100} />
            <p> 
              <span>Suscipit error labore vero eaque at quia voluptatibus.</span>
              Totam optio ullam amet dolore iusto dolores accusamus numquam. Reiciendis impedit aliquam.
            </p>
          </div>
          <div>
            <Image src={NftImg} alt='nft' width={100} height={100} style={{ backgroundColor: 'rgba(228, 192, 93, 0.5)'}} />
            <p> 
              <span>Suscipit error labore vero eaque at quia voluptatibus.</span>
              Totam optio ullam amet dolore iusto dolores accusamus numquam. Reiciendis impedit aliquam.
            </p>
          </div>
          <div>
            <Image src={Decentralized} alt='decentralized' width={100} height={100} style={{ backgroundColor: 'rgba(78, 192, 78, 0.5)' }} />
            <p> 
              <span>Suscipit error labore vero eaque at quia voluptatibus.</span>
              Totam optio ullam amet dolore iusto dolores accusamus numquam. Reiciendis impedit aliquam.
            </p>
          </div>
          <div>
            <Image src={Corruption} alt='corruption' width={100} height={100} style={{ backgroundColor: 'rgba(146, 198, 233, 0.5)' }} />
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
            <Image src={Erc6551} alt='ERC-6551' width={500} height={300} quality={100} layout='responsive' />
            <h3>ERC-6551</h3>
            <p>
              Aliquam quis maximus lorem. Etiam lacinia leo elit, ut 
              pellentesque diam dictum eget. Nulla facilisi.
              Fusce justo quam, cursus accumsan elementum euismod, feugiat quis dolor. 
              Ut id auctor urna, in sagittis dui. Praesent eu luctus metus.
            </p>
          </div>
          <div>
            <Image src={Did} alt='ERC-6551' width={500} height={500} quality={100} layout='responsive' />
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