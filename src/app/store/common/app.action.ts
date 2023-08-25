import { createAction, props } from "@ngrx/store"


// EMPTY ACTION
export const EMPTY_ACTION='[app] empty'
export const emptyaction=createAction(EMPTY_ACTION)

// SHOW ALERT
export const SHOW_ALERT='[app] show alert'
export const showalert=createAction(SHOW_ALERT, props<{message:string, result:string}>())

// SPINNER
export const LOAD_SPINNER='[associate page] load spinner'
export const loadspinner=createAction(LOAD_SPINNER, props<{isLoaded: boolean}>())