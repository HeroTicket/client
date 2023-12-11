import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Container, Title, ListContainer } from '@/styles/styled';
import { FaqList, FaqDesc } from '@/styles/Faq.styles';

const dummyData = [
  {
    'id': 1, 'title': 'What is Hero Ticket?', 'desc': `Hero Ticket is a blockchain-based ticketing platform that provides a more fair and transparent ticketing experience.`,
  },

]

interface FaqData {
  id: number;
  title: string;
  desc: string;
}

const Faq = () => {
  const [dropDownStates, setDropDownStates] = useState<{ [key: number]: boolean }>({});

  const handleToggle = (id: number) => {
    const isCurrentlyExpanded = dropDownStates[id];

    if (isCurrentlyExpanded) {
      // 먼저 패딩을 제거한 후 max-height 변화를 적용
      setDropDownStates(prev => ({ ...prev, [id]: false }));
    } else {
      setDropDownStates(prev => ({ ...prev, [id]: true }));
    }
  };

  return (
    <Container>
      <Title>
        <h1>FAQ</h1>
      </Title>
      <ListContainer>
        {dummyData.map((data) => {
          const isExpanded = dropDownStates[data.id];
          return (
            <>
              <FaqList key={data.id} onClick={() => handleToggle(data.id)} isExpanded={isExpanded}>
                <div>
                  <h3>{data.title}</h3>
                </div>
                <FontAwesomeIcon className='icon' icon={faAngleDown} />
              </FaqList>
              <FaqDesc isOpen={isExpanded}>
                {data.desc}
              </FaqDesc>
            </>
          )
        })}
      </ListContainer>
    </Container>
  )
}

export default Faq;

