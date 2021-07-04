let initial = {
    meeting: [{date: '',time: '', month: '', year: ''}], // массив который хранит дату встречи
    //данные вибранные пользователем, но не добавленные в БД
    date: '', 
    year: '',
    month: '',
    time: '',
    //
    //для проверки выбран ли конкретный денль, время пользователем
    activeDate: [{id: '', date: ''}],
    activeTime: [{id: '' ,time: ''}],
    //
}
// actionType
const Change_Active_Date = "CHANGEACTIVEDATE";
const Add_Date = "ADDDATE";
const Change_Active_Time = "CHANGEACTIVETIME";
const Change_Time = "CHANGETIME";
const Change_Day = "CHANGEDAY";
const GETMEETING = "GETMEETING";
//
export let ChangeActiveReduser = (state = initial, action) => {
    switch (action.type) {
        //возвращение дня и числа, выбраного пользователем
        case Change_Active_Date:
            return {...state, activeDate: [{id: action.num, date: action.day}]}
        //возвращение время, выбраного пользователем
        case Change_Active_Time:
            return {...state, activeTime: [{id: action.id, time: action.time}]}
        //возвращение дня и числа, время выбраного пользователем в массив meeting
        case Add_Date: 
            return {...state, meeting: [{date: state.date, time: state.time, month: state.month, year: state.year}]}
        case Change_Day:
            return {...state, date: action.day, month: action.month, year: action.year}
        case Change_Time:
            return {...state, time: action.payload}
        //получение массива из БД, добавление полученного масссива в `meeting`
        case GETMEETING:
            return {...state, meeting: [{date: Object.values(action.payload)[Object.values(action.payload).length - 1].date, time: Object.values(action.payload)[Object.values(action.payload).length - 1].time, month: Object.values(action.payload)[Object.values(action.payload).length - 1].month, year: Object.values(action.payload)[Object.values(action.payload).length - 1].year}]}
        default:
            return state
    }
}
//actionCreate, которые возвращают тип action и какой то state
export let addMeetingActionCreate = () => {
    return {type: Add_Date}
}
export let getMeetingActionCreate = (payload) => {
    return {type: GETMEETING, payload}
}
export let onChangeDateActiveActionCreate = (num, day) =>{
    return {type: Change_Active_Date, num, day}
}
export let onChangeTimeActiveActionCreate = (id, time) =>{
    return {type: Change_Active_Time, id, time}
}
export let ChangeDayActionCreate = (day, month, year) => {
    return {type: Change_Day, day,month, year}
}
export let ChangeTimeActionCreate = (payload) => {
    return {type: Change_Time, payload}
}
//