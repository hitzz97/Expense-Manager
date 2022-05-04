import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    iBal: 0,
    credit: 0,
    debit: 0,
    accName: "",
    trans: {},
}
const accountSlice = createSlice({
    name: "accounts",
    initialState: {},
    reducers: {
        createAccount: (state, action) => {
            let accName = action.payload;
            state[accName] = { ...initialState, accName };
            console.log("created Account", accName)
        },
        deleteAccount: (state, action) => {
            delete (state[action.payload]);
            console.log("deleted Account", action.payload)
        },
        renameAccount: (state, action) => {
            let { accName, newAccName } = action.payload;
            let data = { ...state[accName] };
            delete (state[accName]);
            state[newAccName] = { ...data };
        },
        addTrans: (state, action) => {
            let { accName, obj } = action.payload;
            // console.log(state, action)
            // creating entry ctime:obj in account
            state[accName].trans[obj.ctime] = obj;

            let dt = obj.date;
            let tc = 0, td = 0, m = new Date().getMonth();
            if (obj.type === 'credit')
                tc += Number(obj.amt);
            else
                td -= Number(obj.amt);
            // console.log(tc, td);
            if (new Date(dt).getMonth() === m) {
                state[accName].credit += tc;
                state[accName].debit -= td;
            }
            state[accName].iBal += tc + td;
            console.log("addTrans");
        },
        removeTrans: (state, action) => {
            let { accName, ctime } = action.payload;
            let obj = state[accName].trans[ctime];
            let dt = obj.date;
            let tc = 0, td = 0, m = new Date().getMonth();

            if (obj.type === 'credit')
                tc += Number(obj.amt);
            else
                td -= Number(obj.amt);
            if (new Date(dt).getMonth() === m) {
                state[accName].credit -= tc;
                state[accName].debit += td;
            }
            state[accName].iBal -= (tc + td);
            delete (state[accName].trans[ctime])
            console.log("removeTrans");
        },
        setiBal: (state, action) => {
            let { accName, amt } = action.payload
            state[accName].iBal = Number(amt)
        },
    }
})

export const { createAccount, deleteAccount, addTrans, removeTrans, setiBal } = accountSlice.actions;
export default accountSlice;