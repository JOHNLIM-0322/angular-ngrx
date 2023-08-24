import { createAction, props } from "@ngrx/store";
import { Associate } from "../model/associate.model";


// LOAD
export const LOAD_ASSOCIATE='[associate page] load associate'
export const LOAD_ASSOCIATE_SUCCESS='[associate page] load associate success'
export const LOAD_ASSOCIATE_FAIL='[associate page] load associate fail'

export const loadassociate=createAction(LOAD_ASSOCIATE)
export const loadassociateSuccess=createAction(LOAD_ASSOCIATE_SUCCESS, props<{list:Associate[]}>())
export const loadassociateFail=createAction(LOAD_ASSOCIATE_FAIL, props<{errorMessage:string}>())

// ADD
export const ADD_ASSOCIATE='[associate page] add associate'
export const ADD_ASSOCIATE_SUCCESS='[associate page] add associate success'
export const ADD_ASSOCIATE_FAIL='[associate page] add associate fail'

export const addassociate=createAction(ADD_ASSOCIATE, props<{data:Associate}>())
export const addassociateSuccess=createAction(ADD_ASSOCIATE_SUCCESS, props<{data:Associate}>())
export const addassociateFail=createAction(ADD_ASSOCIATE_FAIL, props<{errorMessage:string}>())

// GET
export const GET_ASSOCIATE='[associate page] get associate'
export const GET_ASSOCIATE_SUCCESS='[associate page] get associate success'
export const GET_ASSOCIATE_FAIL='[associate page] get associate fail'

export const getassociate=createAction(GET_ASSOCIATE, props<{id:number}>())
export const getassociateSuccess=createAction(GET_ASSOCIATE_SUCCESS, props<{associate:Associate}>())
export const getassociateFail=createAction(GET_ASSOCIATE_FAIL, props<{errorMessage:string}>())

// UPDATE
export const UPDATE_ASSOCIATE='[associate page] update associate'
export const UPDATE_ASSOCIATE_SUCCESS='[associate page] update associate success'
export const UPDATE_ASSOCIATE_FAIL='[associate page] update associate fail'

export const updateassociate=createAction(UPDATE_ASSOCIATE, props<{data:Associate}>())
export const updateassociateSuccess=createAction(UPDATE_ASSOCIATE_SUCCESS, props<{data:Associate}>())
export const updateassociateFail=createAction(UPDATE_ASSOCIATE_FAIL, props<{errorMessage:string}>())

// DELETE
export const DELETE_ASSOCIATE='[associate page] delete associate'
export const DELETE_ASSOCIATE_SUCCESS='[associate page] delete associate success'
export const DELETE_ASSOCIATE_FAIL='[associate page] delete associate fail'

export const deleteassociate=createAction(DELETE_ASSOCIATE, props<{id:number}>())
export const deleteassociateSuccess=createAction(DELETE_ASSOCIATE_SUCCESS, props<{id:number}>())
export const deleteassociateFail=createAction(DELETE_ASSOCIATE_FAIL, props<{errorMessage:string}>())

// OPEN DIALOG
export const OPEN_DIALOG='[associate page] open dialog'
export const opendialog=createAction(OPEN_DIALOG)
