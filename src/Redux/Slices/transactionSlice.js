import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    iBal: 0,
    credit: 0,
    debit: 0,
    accName: "",
    trans: {},
}
const transactionSlice = createSlice({
    name: "trans",
    initialState: initialState,
    reducers: {
        addTrans: (state, action) => {
            let obj = action.payload;
            console.log(state, action)
            state.trans[obj.ctime] = obj;

            let dt = obj.date;
            let tc = 0, td = 0, m = new Date().getMonth();
            if (obj.type === 'credit')
                tc += Number(obj.amt);
            else
                td -= Number(obj.amt);
            // console.log(tc, td);
            if (new Date(dt).getMonth() === m) {
                state.credit += tc;
                state.debit -= td;
            }
            state.iBal += tc + td;
            console.log("addTrans");
        },
        removeTrans: (state, action) => {
            let ctime = action.payload;
            let obj = state.trans[ctime];
            let dt = obj.date;
            let tc = 0, td = 0, m = new Date().getMonth();

            if (obj.type === 'credit')
                tc += Number(obj.amt);
            else
                td -= Number(obj.amt);
            if (new Date(dt).getMonth() === m) {
                state.credit -= tc;
                state.debit += td;
            }
            state.iBal -= (tc + td);
            delete (state.trans[ctime])
            console.log("removeTrans");
        },
        setiBal: (state, action) => {
            state.iBal = Number(action.payload)
        },
        setTransFromAcc: (state, action) => {
            // Object.assign
            // console.log(action.payload);
            Object.assign(state, action.payload);
        }
    }
})

export const { addTrans, removeTrans, setiBal, setTransFromAcc } = transactionSlice.actions;
export default transactionSlice