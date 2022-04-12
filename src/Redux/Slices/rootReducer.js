import { combineReducers } from "redux";
import insightSlice from "./insightSlice";
import accountSlice from "./accountSlice";

// const rootReducer = {
//     reducer: {
//         trans: transactionSlice.reducer,
//     }
// }

const rootReducer = combineReducers({
    accounts: accountSlice.reducer,
    insight: insightSlice.reducer
})

export default rootReducer;