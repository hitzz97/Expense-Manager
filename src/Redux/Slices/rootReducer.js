import transactionSlice from "./transactionSlice"
import { combineReducers } from "redux";
import insightSlice from "./insightSlice";

// const rootReducer = {
//     reducer: {
//         trans: transactionSlice.reducer,
//     }
// }

const rootReducer = combineReducers({
    trans: transactionSlice.reducer,
    insight: insightSlice.reducer
})

export default rootReducer;