import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { ChangeActiveReduser } from "./reducers/OnActiveReducer";
let reducers = combineReducers({
    changeActive: ChangeActiveReduser
})
let store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));
export default store;
