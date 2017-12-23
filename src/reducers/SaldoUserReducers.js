import { SALDO_FETCH, TRANSFER_VALUE } from '../actions/type';

const INITIAL_STATE = {
    userSaldo: 0,
    email: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SALDO_FETCH:
            return { ...state, userSaldo: action.payload };
        case TRANSFER_VALUE:
            return { ...state, [action.payload.clan]: action.payload.value };
        default:
            return state;
    }
};
