import { combineReducers } from "redux";
import reclamatiiReducer from "./reclamatiiReducer";
import connectivityReducer from "./connectivityReducer";


//face legatura intre reduceri
//reclamatii is managed by reclamatiiReducer
//actiunile din reclamatiiReducer sunt aplicate pe lista de reclamatii
export const rootReducer = combineReducers({reclamatii: reclamatiiReducer, connectivity: connectivityReducer })