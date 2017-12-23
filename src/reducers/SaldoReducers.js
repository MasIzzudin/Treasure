import { DATA_FETCH } from '../actions/type';

const INITIAL_STATE = {
    result: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DATA_FETCH:
            return { ...state, result: action.payload };
        default:
            return state;
    }
};
