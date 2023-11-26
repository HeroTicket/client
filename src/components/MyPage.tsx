import * as React from 'react';
import Image from 'next/image';
import * as T from '@/styles/Ticket.styles';
import * as M from '@/styles/MyPage.styles';
import { MainImg } from './Common/Reference';

const dummyData = [
  { 'id': 1, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2310/231030015704_23014028.gif', 'owner': 'voluptatem', 'place': 'occaecati', 'title': 'quo optio et', 'desc': 'Fugiat enim a reprehenderit. Quis repellendus culpa non exercitationem. Illo est repudiandae. Qui ullam et molestiae aut. Commodi aliquid facilis perspiciatis minima illo itaque.Fugiat enim a reprehenderit. Quis repellendus culpa non exercitationem. Illo est repudiandae. Qui ullam et molestiae aut. Commodi aliquid facilis perspiciatis minima illo itaque.' },
  { 'id': 2, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231103111621_23016085.gif', 'owner': 'quisquam', 'place': 'totam', 'title': 'quo optio et', 'desc': 'Illo deleniti quo velit ipsum consequatur facilis est minima.' },
  { 'id': 3, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2310/231025103254_23014952.gif', 'owner': 'provident', 'place': 'voluptatem', 'title': 'quo optio et', 'desc': 'Placeat et repellendus voluptatum excepturi eos.' },
  { 'id': 4, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231115060435_23015862.gif', 'owner': 'error', 'place': 'et', 'title': 'quo optio et', 'desc': 'Aut dolorem voluptatibus asperiores optio voluptas vel consectetur.' },
  { 'id': 5, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231114025008_23016498.gif', 'owner': 'aut', 'place': 'adipisci', 'title': 'quo optio et', 'desc': 'Atque accusamus dicta sed sapiente dolorem repellat totam.' },
  { 'id': 6, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231107044048_23016041.gif', 'owner': 'distinctio', 'place': 'quo', 'title': 'quo optio et', 'desc': 'Ab enim omnis sed error eius rerum.' },
  { 'id': 7, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2310/231020110913_23012636.gif', 'owner': 'a', 'place': 'beatae', 'title': 'quo optio et', 'desc': 'Et natus id vitae sequi alias omnis.' },
  { 'id': 8, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231110105234_23016182.gif', 'owner': 'est', 'place': 'nulla', 'title': 'quo optio et', 'desc': 'Qui harum quo.' },
  { 'id': 9, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231113093904_23016243.gif', 'owner': 'dolor', 'place': 'labore', 'title': 'quo optio et', 'desc': 'Beatae est est dolores quia aliquam quae.' },
  { 'id': 10, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231113020527_23016322.gif', 'owner': 'voluptatum', 'place': 'perferendis', 'title': 'quo optio et', 'desc': 'Et et ut fugiat perferendis quasi.' },
  { 'id': 11, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231114024601_23016343.gif', 'owner': 'repudiandae', 'place': 'atque', 'title': 'quo optio et', 'desc': 'Impedit optio facilis aperiam quia asperiores.' },
  { 'id': 12, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231116113220_23016762.gif', 'owner': 'alias', 'place': 'doloribus', 'title': 'quo optio et', 'desc': 'Saepe tempora quibusdam asperiores velit neque pariatur ut perferendis.' },
  { 'id': 13, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2309/230920091152_23013281.gif', 'owner': 'nulla', 'place': 'nihil', 'title': 'quo optio et', 'desc': 'Dolor est totam dolor et maiores in.' },
  { 'id': 14, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2309/230921024652_23013309.gif', 'owner': 'sit', 'place': 'omnis', 'title': 'quo optio et', 'desc': 'Assumenda facere nobis quae laborum corporis nihil autem sed maiores.' },
  { 'id': 15, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2310/231031095904_23015513.gif', 'owner': 'harum', 'place': 'quae', 'title': 'quo optio et', 'desc': 'Dolorem ipsa recusandae consequuntur non eligendi eos eum saepe ea.' },
  { 'id': 16, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2310/231012031758_23014405.gif', 'owner': 'in', 'place': 'in', 'title': 'quo optio et', 'desc': 'Et qui consequatur.' },
]

const dummyData2 = [
  { 'id': 12, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2311/231116113220_23016762.gif', 'owner': 'alias', 'place': 'doloribus', 'title': 'quo optio et', 'desc': 'Saepe tempora quibusdam asperiores velit neque pariatur ut perferendis.' },
  { 'id': 13, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2309/230920091152_23013281.gif', 'owner': 'nulla', 'place': 'nihil', 'title': 'quo optio et', 'desc': 'Dolor est totam dolor et maiores in.' },
  { 'id': 14, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2309/230921024652_23013309.gif', 'owner': 'sit', 'place': 'omnis', 'title': 'quo optio et', 'desc': 'Assumenda facere nobis quae laborum corporis nihil autem sed maiores.' },
  { 'id': 15, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2310/231031095904_23015513.gif', 'owner': 'harum', 'place': 'quae', 'title': 'quo optio et', 'desc': 'Dolorem ipsa recusandae consequuntur non eligendi eos eum saepe ea.' },
  { 'id': 16, 'poster': 'http://ticketimage.interpark.com/TCMS3.0/CO/HOT/2310/231012031758_23014405.gif', 'owner': 'in', 'place': 'in', 'title': 'quo optio et', 'desc': 'Et qui consequatur.' },
]

const MyPage = () => {
  let address = '0x3557db220dbfdBbB8Cf5489495Bf02AAC9A889ED';
  let email = 'user@gmail.com';

  const [activeTab, setActiveTab] = React.useState('purchased');

  return (
    <M.MyPageContainer>
      <M.ProfileContainer>
        <M.MyPageImageContainer>
          <Image src={MainImg} layout='responsive' width={800} height={720} quality={100} alt='profile image' />
        </M.MyPageImageContainer>
        <M.InfoContainer>
          <p title='Click to copy the address'>{address.slice(0, 9) + '...' + address.slice(38, address.length)}</p>
          <div></div>
          <p>{email}</p>
        </M.InfoContainer>
      </M.ProfileContainer>
      <M.TabContainer>
        <M.TabButton
          className={activeTab === 'purchased' ? 'active' : ''}
          onClick={() => setActiveTab('purchased')}
        >
          Purchased Tickets
        </M.TabButton>
        <M.TabButton
          className={activeTab === 'unauthorized' ? 'active' : ''}
          onClick={() => setActiveTab('unauthorized')}
        >
          Unauthorized Payments
        </M.TabButton>
      </M.TabContainer>
      {activeTab === 'purchased' ? (
        <T.CardContainer>
          {dummyData.map(card => (
            <T.Card key={card.id}>
              <T.CardImgContainer>
                <Image src={card.poster} alt="poster" fill quality={100}  />
              </T.CardImgContainer>
              <T.CardContent>
                <h2>{card.owner}</h2>
                <p className="place">{card.place}</p>
                <p className='title'>{card.title}</p>
              </T.CardContent>
            </T.Card>
          ))}
        </T.CardContainer>
      ) : (
        <T.CardContainer>
          {dummyData2.map(card => (
            <T.Card key={card.id}>
              <T.CardImgContainer>
                <Image src={card.poster} alt="poster" fill quality={100}  />
              </T.CardImgContainer>
              <T.CardContent>
                <h2>{card.owner}</h2>
                <p className="place">{card.place}</p>
                <p className='title'>{card.title}</p>
              </T.CardContent>
            </T.Card>
          ))}
        </T.CardContainer>
      )}
    </M.MyPageContainer>
  )
}

export default MyPage;