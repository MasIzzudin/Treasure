import { combineReducers } from 'redux';
import IncomeReducers from './IncomeReducers';
import IncomeValReducers from './IncomeValReducers';
import SpendingReducers from './SpendingReducers';
import SpendingValReducers from './SpendingValReducers';
import SaldoReducers from './SaldoReducers';
import SaldoUserReducers from './SaldoUserReducers';

export default combineReducers({
    income: IncomeReducers,
    incomeVal: IncomeValReducers,
    spending: SpendingReducers,
    spendingVal: SpendingValReducers,
    saldo: SaldoReducers,
    saldoUsers: SaldoUserReducers
});
