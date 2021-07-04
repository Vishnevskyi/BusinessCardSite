import { addMeetingActionCreate, getMeetingActionCreate } from "../redux/reducers/OnActiveReducer"
//добавление в БД данных, которые были выбраны//
export let asyncAddMeeting = (payload) => {
    return (dispatch) => {
        fetch(`${`https://testtaskreactfirebase-default-rtdb.firebaseio.com/tasks.json`}`,{
            body: JSON.stringify(payload),
            method: "POST",
            mode: "cors"
        }).then((res)=> res.json())
        .then((res)=> dispatch(addMeetingActionCreate())) // dispatch на добаление данных выбраных пользователем в state
     }
}
//получение данных из БД//
export let asyncGetMeeting = () =>{
    return (dispatch) => {
        fetch(`${`https://testtaskreactfirebase-default-rtdb.firebaseio.com/tasks.json`}`)
        .then((res)=> res.json())
        .then((res)=> {dispatch(getMeetingActionCreate(res))}) // dispatch на добаление данных полученых из БД в state
        .catch((res)=> console.log(res))
    }
}