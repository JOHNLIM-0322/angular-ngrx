import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppModel } from "./app.model";


const getappstate=createFeatureSelector<AppModel>('app');

export const getspinnerstate=createSelector(getappstate,(state)=>{
    return state.IsLoaded;
});