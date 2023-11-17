import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Container, Title, ListContainer } from '@/styles/styled';
import { FaqList, FaqDesc } from '@/styles/Faq.styles';

const dummyData = [
  {'id': 1, 'title': 'title1', 'desc': `In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.
  In veniam libero alias animi dignissimos commodi quia.In veniam libero alias animi dignissimos commodi quia.`},
  {'id': 3, 'title': 'Quisquam odit pariatur cum officia perferendis vitae et.', 'desc': 'Quisquam ipsam dolorum sit ad.'},
  {'id': 4, 'title': 'Voluptatem vitae aut accusamus beatae quis dicta dolore.', 'desc': 'Sapiente qui ipsum tempore fugit dignissimos iure omnis et.'},
  {'id': 5, 'title': 'Odio cum sed minus.', 'desc': 'Sapiente qui ipsum tempore fugit dignissimos iure omnis et.'},
  {'id': 6, 'title': 'Odio cum sed minus.', 'desc': 'Sapiente qui ipsum tempore fugit dignissimos iure omnis et.'},
  {'id': 7, 'title': 'Odio cum sed minus.', 'desc': 'Sapiente qui ipsum tempore fugit dignissimos iure omnis et.'},
]

interface FaqData {
  id: number;
  title: string;
  desc: string;
}

const Faq = () => {
  const [dropDownStates, setDropDownStates] = useState<{[key: number]: boolean}>({});

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

