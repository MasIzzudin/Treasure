import {
    SPENDING_DATA
} from '../actions/type';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SPENDING_DATA:
            return action.payload;
        default:
            return state;
    }
};
