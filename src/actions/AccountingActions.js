import firebase from 'firebase';
import { ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    //================Income==================//
    INCOME_VALUE, //onChange Input
    INCOME_SAVE, //data push into database
    INCOME_DATA, // Take data from database
    INCOME_RESULT, // data result set to database
    DATA_FETCH, // take data saldo/result from database 
    //=================Spending================//
    SPENDING_VALUE,
    SPENDING_SAVE,
    SPENDING_DATA,
    SPENDING_RESULT,
    //=================Transfer================//
    TRANSFER_VALUE,
    SALDO_FETCH
} from './type';

// ====================================Income===============================//

export const IncomeValue = ({ clan, value }) => {
    return {
        type: INCOME_VALUE,
        payload: { clan, value }
    };
};

export const IncomeSave = ({ nominal, inform, date, picker }) => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        firebase.database().ref('/Income')
        .push({ nominal, inform, date, picker, createdBy: currentUser.uid })
        .then(() => {
            dispatch({ type: INCOME_SAVE });
            ToastAndroid.show('Selamat, Saldo telah bertambah', ToastAndroid.SHORT);
            Actions.home({ type: 'reset' });
        });
    };
};

export const IncomeData = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref('/Income').orderByChild('createdBy').equalTo(currentUser.uid)
        .on('value', snapshot => {
            dispatch({ type: INCOME_DATA, payload: snapshot.val() });
        });
    };
};

export const IncomeResult = ({ result, nominal }) => {
    const { currentUser } = firebase.auth();
    const data = parseInt(result) + parseInt(nominal);
    return (dispatch) => {
        firebase.database().ref(`/Saldo/${currentUser.uid}/value`)
        .set(data)
        .then(() => {
            dispatch({ type: INCOME_RESULT });
        });
    };
};

export const DataSaldo = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/Saldo/${currentUser.uid}/`)
        .on('child_added', snapshot => {
            dispatch({ type: DATA_FETCH, payload: snapshot.val() });
        });
    };
};

//=====================================Spending=============================//


export const SpendingValue = ({ clan, value }) => {
    return {
        type: SPENDING_VALUE,
        payload: { clan, value }
    };
};

export const SpendingSave = ({ nominal, inform, date, picker }) => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        firebase.database().ref('/Spending')
        .push({ nominal, inform, date, picker, createdBy: currentUser.uid })
        .then(() => {
            dispatch({ type: SPENDING_SAVE });
            ToastAndroid.show('Saldo telah berkurang', ToastAndroid.SHORT);
            Actions.home({ type: 'reset' }); 
        });
    };
};

export const SpendingData = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref('/Spending').orderByChild('createdBy').equalTo(currentUser.uid)
        .on('value', snapshot => {
            dispatch({ type: SPENDING_DATA, payload: snapshot.val() });
        });
    };
};

export const SpendingResult = ({ result, nominal }) => {
    const { currentUser } = firebase.auth();
    const data = parseInt(result) - parseInt(nominal);
    return (dispatch) => {
        firebase.database().ref(`/Saldo/${currentUser.uid}/value`)
        .set(data)
        .then(() => {
            dispatch({ type: SPENDING_RESULT });
        });
    };
};


//======================================Transfer============================//

export const TransferValue = ({ clan, value }) => {
    return {
        type: TRANSFER_VALUE,
        payload: { clan, value }
    };
};

export const TransferResult = ({ nominal, result }) => {
    const { currentUser } = firebase.auth();
    const data = parseInt(result) - parseInt(nominal);
    return () => {
        firebase.database().ref(`/Saldo/${currentUser.uid}/value`)
        .set(data);
    };
};

export const TransferUsersSaldo = ({ email }) => {
    console.log('kasbdhasd');
    return (dispatch) => {
        firebase.database().ref('/users').orderByChild('email').equalTo(email)
        .once('value')
        .then(snapshot => {
            firebase.database().ref(`/Saldo/${Object.keys(snapshot.val())[0]}/`)
            .on('child_added', snapshot => {
                console.log(snapshot.val());
                dispatch({ type: SALDO_FETCH, payload: snapshot.val() });
            });
        });
    };
};
