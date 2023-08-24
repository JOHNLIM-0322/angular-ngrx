
import { createReducer, on } from '@ngrx/store';
import { AssociateState } from './associate.state';
import { addassociateSuccess, deleteassociateSuccess, getassociateSuccess, loadassociateFail, loadassociateSuccess, opendialog, updateassociateSuccess } from './associate.action';


const _associateReducer = createReducer(
    AssociateState,
    on(loadassociateSuccess, (state, action) => {
        return {
            ...state,
            list: [...action.list],
            errorMessage: ''
        }
    }),
    on(loadassociateFail, (state, action) => {
        return {
            ...state,
            list: [],
            errorMessage: action.errorMessage
        }
    }),
    on(addassociateSuccess, (state, action) => {
        let _maxid = Math.max(...state.list.map(o => o.id));
        if (_maxid == Number.POSITIVE_INFINITY || _maxid == Number.NEGATIVE_INFINITY)
        {
            console.log('value is infinite');
            _maxid = 0;
        }
        console.log('maxid: ' + _maxid);
        const _newdata = { ...action.data };
        _newdata.id = _maxid + 1;
        return {
            ...state, //existing data
            list: [...state.list, _newdata],
            errorMessage: ''
        }
    }),
    on(updateassociateSuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.data.id ? action.data : o
        });
        return {
            ...state, //existing data
            list: _newdata,
            errorMessage: ''
        }
    }),
    on(deleteassociateSuccess, (state, action) => {
        const _newdata = state.list.filter(o => o.id !== action.id)
        return {
            ...state, //existing data
            list: _newdata,
            errorMessage: ''
        }
    }),
    on(getassociateSuccess, (state, action) => {
        return {
            ...state,
            associate: action.associate,
            errorMessage: ''
        }
    }),
    on(opendialog, (state, action) => {
        return {
            ...state,
            associate: {
                id: 0,
                name: "",
                email: "",
                phone: "",
                type: "CUSTOMER",
                address: "",
                associategroup: "level1",
                status: true
            }
        }
    }),
)

export function AssociateReducer(state: any, action: any) {
    return _associateReducer(state, action);
}