import { styled } from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const CalendarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyleCalendar = styled(Calendar)`
  width: 100%;
  border: none;
  padding: 0 1rem;

  .react-calendar__navigation {
    display: flex;
    height: 24px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    min-width: 24px;
    background-color: none;
  }

  .react-calendar__navigation button:disabled {
    background-color: #e8e8e8;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e8e8e8;
  }

  .react-calendar__month-view__weekdays {
    font-size: 0.6em;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 1.2em 0.5em;
  }

  .react-calendar__tile {
    transition: background-color 0.3s;
    border-radius: 0.5rem;
    &:hover {
      background-color: red;
      color: white;
    }
  }

  .react-calendar__tile:disabled {
    pointer-events: none;
    color: #999;
  }

  .react-calendar__tile--now {
    border-radius: 0.5rem;
    background-color: rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s;

    &:hover {
      background-color: red;
      color: white;
    }
  }

  .react-calendar__tile--hasActive {
    color: #ffffff;
    background-color: red;
    border-radius: 0.5rem;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background-color: red;
    border-radius: 0.5rem;
  }

  .react-calendar__tile--active {
    color: white;
    background-color: red;
    border-radius: 7px;
  }

  .react-calendar__tile:disabled.react-calendar__tile--active {
    color: white;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: red;
  }
`;
