import {
    SPENDING_VALUE,
    SPENDING_SAVE,
    DATA_FETCH
} from '../actions/type';

const INITIAL_STATE = {
    nominal: '',
    inform: '',
    picker: '',
    result: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SPENDING_VALUE:
            return { ...state, [action.payload.clan]: action.payload.value };
        case SPENDING_SAVE:
            return INITIAL_STATE;
        case DATA_FETCH:
            return { ...state, result: action.payload };
        default:
            return state;
    }
};
