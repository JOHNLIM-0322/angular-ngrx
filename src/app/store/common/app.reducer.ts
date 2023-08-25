import { createReducer, on } from "@ngrx/store";
import { loadspinner } from "./app.action";
import { AppState } from "./app.state";


const _appReducer = createReducer(AppState,
    on(loadspinner, (state, action) => {
        return {
            ...state,
            IsLoaded: action.isLoaded
        }
    })
)

export function AppReducer(state: any, action: any) {
    return _appReducer(state, action);
}