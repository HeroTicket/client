import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { MainImg, NftImg, Security, Corruption, Decentralized, Did, Erc6551 } from './Common/Reference';
import { ButtonStyle } from '@/styles/styled';
import * as M from '@/styles/Main.styles';


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
      <M.MainWrap>
        <M.MainLeft>
          <h1>Hero Ticket</h1>
          <p>
             First, we used Polygon ID to enable ticket buyers to purchase and use tickets only after verifying their identity. This can prevent ticket scalping by preventing tickets from being used by anyone other than the ticket purchaser. It also prevents bots from purchasing tickets indiscriminately. And because transactions can be tracked due to the nature of blockchain, it is possible to check whether the ticket issuer is the correct ticket issuer.
             <br></br><br></br>Second, you can use Chainlink functions to load the OPEN AI image generator to create a ticket NFT image. By creating NFT images using Chainlink, it provides users with a fresher experience.
             <br></br><br></br>Finally, by being able to hold tickets in TBA accounts, users have their own ticket collection. And entertainment companies and sports teams can check the user's loyalty by checking the number of tickets they have through their TBA accounts. And this can provide additional benefits.
           </p>
          <M.MainBtnWrap>
            <ButtonStyle>Get Start</ButtonStyle>
            <div onClick={scrollToService}>
              <p>Learn More</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </M.MainBtnWrap>
        </M.MainLeft>
        <M.ImageContainer>
          <Image src={MainImg} alt='main' layout='responsive' width={800} height={720} quality={100} />
        </M.ImageContainer>
      </M.MainWrap>
      <M.ServiceWrap ref={serviceRef} className='hidden'>
        <M.ServiceText>
          <h1>Our Service</h1>
          <p>
            We are a web3-based ticket platform. Hero-ticket uses blockchain technology to prevent ticket plagiarism and fake tickets, and allows you to create and manage your own digital ticket collection.
          </p>
        </M.ServiceText>
        <M.ServiceCard>
          <div>
            <Image src={Security} alt='security' width={100} height={100} />
            <p> 
              <span>PolygonID</span>
              You can proudly purchase, issue, and use identity verification using PolygonID.
            </p>
          </div>
          <div>
            <Image src={NftImg} alt='nft' width={100} height={100} style={{ backgroundColor: 'rgba(228, 192, 93, 0.5)'}} />
            <p> 
              <span>TBA Account, ChainLink Functions</span>       
              Create an NFT ticket image using ChainFunctions and issue the ticket to the user's TBA Account.
            </p>
          </div>
          <div>
            <Image src={Decentralized} alt='decentralized' width={100} height={100} style={{ backgroundColor: 'rgba(78, 192, 78, 0.5)' }} />
            <p> 
              <span>Transaction Tracking</span>
              Track transactions to prevent scalping and distribution of fake tickets
            </p>
          </div>
          <div>
            <Image src={Corruption} alt='corruption' width={100} height={100} style={{ backgroundColor: 'rgba(146, 198, 233, 0.5)' }} />
            <p> 
              <span>Payment System</span>
              Users can pay for tickets with Eth or Token and receive Token rewards.
            </p>
          </div>
        </M.ServiceCard>
      </M.ServiceWrap>
      <M.WhatIsWrap ref={whatIsRef} className='hidden'>
        <M.ServiceText>
          <h1>What is ERC-6551, DID?</h1>
        </M.ServiceText>
        <M.WhatIsDesc>
          <div>
            <Image src={Erc6551} alt='ERC-6551' width={500} height={300} quality={100} layout='responsive' />
            <h3>ERC-6551</h3>
            <p>
             ERC-6551 is a standard that allows assets to be owned in ERC-721 tokens. It further increases the usability of NFT and overcomes the limitations of the existing ERC-721.
            </p>
          </div>
          <div>
            <Image src={Did} alt='ERC-6551' width={500} height={500} quality={100} layout='responsive' />
            <h3>DID</h3>
            <p>
              DID stands for Decentralized Identity, and is a technology that ensures that sovereignty over data lies with the individual and that data can be proven when needed without going through a centralized system.
            </p>
          </div>
        </M.WhatIsDesc>
      </M.WhatIsWrap>
    </>
  )
}

const easeLinear = (t: number, b: number, c: number, d: number) => {
  return c * t / d + b;
}

export default Main;