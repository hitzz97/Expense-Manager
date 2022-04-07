import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: "trans",
    initialState: {
        iBal: 0,
        credit: 0,
        debit: 0,
        trans: {},
    },
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
            console.log("addTrans", state);
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
            console.log("removeTrans", state);
        },
        setiBal: (state, action) => {
            state.iBal = Number(action.payload)
        }
    }
})

export const { addTrans, removeTrans, setiBal } = transactionSlice.actions;
export default transactionSlice