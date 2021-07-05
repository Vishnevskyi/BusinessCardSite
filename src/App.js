import logo from './image/man.png';
import './App.css';
import configs from "./config/config.js" // для работы с датой, месяцы, дни недели, время.
import variables from "./config/variables.js" // для работы с датой, сегодняшний день, месяц, год...
import disable from './image/disable.png';
import calendar from './image/calendar.png';
import { useDispatch, useSelector } from 'react-redux'; 
import { onChangeDateActiveActionCreate, onChangeTimeActiveActionCreate, ChangeTimeActionCreate, ChangeDayActionCreate } from './redux/reducers/OnActiveReducer'; // редьюсеры
import { asyncAddMeeting, asyncGetMeeting } from './asyncQuery/async'; // асинхронные запросы в БД.
import { useEffect } from 'react';
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
     dispatch(asyncGetMeeting());
  },[])
  // значения из редакса, для дальнейшей работы
  const dateActive = useSelector(state => state.changeActive.activeDate); // для проверки, выбран ли конкретный день 
  const timeActive = useSelector(state => state.changeActive.activeTime); // для проверки выбрано ли время
  const meeting = useSelector(state => state.changeActive.meeting[0]); 
  const month = useSelector(state => state.changeActive.month); 
  const year = useSelector(state => state.changeActive.year); 
  const time = useSelector(state => state.changeActive.time);
  const date = useSelector(state => state.changeActive.date);
  //
  let data = [];
  let daysNum = new Date(variables.currYear, variables.currMonth + 1, 0).getDate(); // количество дней в месяце
  let week = variables.weekDay;
  // формирование массива дней в месяце
  for (let i = 1; i < daysNum + 1; i++) {
    if (i >= variables.currDay) {
      if (week > 6) { // если значение дня больше за 6, то есть воскресенье, то день недели принимает id: 1 и пушится в массив
        week = 1;
        data.push({ num: i, day: configs.days[0] });
      }
      else { 
        data.push({ num: i, day: configs.days[week] });
        week++;
      }
    }
  }
  //
  return (
    <div className="color">
      <div className="main">
        <div className="title">
          <h1>Алексей Карачинский</h1>
        </div>
        <div className="imageBlock">
          <div>
            <img src={logo} className="image" alt="logo" />
          </div>
          <div className="consultGroup">
            <p className="consult">Длительность консультации</p>
            <p className="time">50 минут</p>
          </div>
        </div>
        <div className="textGroup">
          <h1> Возможная дата </h1>
        </div>
        <div className="iconsGroup">
          <img className="calendar" src={calendar} alt="calendar" />
          <img className="disable" src={disable} alt="disable" />
        </div>
        {/* /выбор дня месяца/ */}
        <div className="dateBlock">
          {/* /если выбран какой то день (dateActive), то класс будет `dateActive` в ином случае, dateContainer/ */}
          {/* /один dispatch делает onChange в `onActiveReducer` другой dispatch (onChangeDateActiveActionCreate) добавляет в state какой день мы выбрали/ */}
          {data.map((res) => <div key={res.num} className={Object.values(dateActive)[0].id === res.num || meeting.date === res.num ? `dateActive` : `dateContainer`} name={res.num} onClick={() => { dispatch(ChangeDayActionCreate(res.num, variables.currMonth, variables.currYear)); dispatch(onChangeDateActiveActionCreate(res.num, res.day)) }}>
            <div className={Object.values(dateActive)[0].id === res.num || meeting.date === res.num ? `textActive` : `textDay`}>
              {res.num === variables.currDay ? "Сегодня" : res.day}
            </div>
            <div className={Object.values(dateActive)[0].id === res.num || meeting.date === res.num ? `numActive` : meeting.month > variables.currMonth || meeting.year > variables.currYear ? `numDay` : `numDay`}>
              {res.num}</div>
          </div>)}
          {/* // */}
        </div>
        <div className="freetime">
          <h1>Cвободное время</h1>
        </div>
        {/* /выбор дня времени/ */}
        <div className="timeBlock">
          {/* /если выбрано какое то время (activeTime), то класс будет `activeTime` в ином случае, textTime/ */}
          {/* /один dispatch делает onChange в `onActiveReducer` другой dispatch (onChangeTimeActiveActionCreate) добавляет в state какое время мы выбрали/ */}
          {configs.times.map((res) =>
            <div key={res.id} className={Object.values(timeActive)[0].id === res.id || meeting.time === res.id && variables.currDay <= meeting.date ? `activeTime` : `textTime`} name={res.time} onClick={() => { dispatch(ChangeTimeActionCreate(res.id)); dispatch(onChangeTimeActiveActionCreate(res.id,res.time)) }}>
              {res.time}
            </div>)}
        </div>
        <div className="outputBlock">
          <div className="outputContainer">
            <div className="dateOutput">
              <h1 className="dateOutputText">Дата</h1>
              {/* /отображение дня и месяца, какое мы выбрали/ */}
              <h1 className="monthes">{meeting.date < variables.currDay ? '' : meeting.date} {meeting.date === ''  || meeting.date < variables.currDay ? '' : configs.monthes[meeting.month]}</h1>
            </div>
            <div className="beetwen" />
            <div className="timeOutput">
              <h1 className="timeOutputText">Время</h1>
              {/* /отображение время, какое мы выбрали/ */}
              <h1 className="secondHour">{configs.times.map((res)=> res.id === meeting.time && variables.currDay <= meeting.date ? res.time : '')}</h1>
            </div>
          </div>
          <div>
          {/* /отправка в БД данных, которые были выбраны/ */}
            <button className="btn" onClick={() => {dispatch(asyncAddMeeting({time: time, date: date, month: month, year: year}))}}>Записаться на безплатную встречу</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
