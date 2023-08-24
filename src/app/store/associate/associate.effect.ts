import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AssociateService } from "src/app/service/associate.service";
import { addassociate, addassociateFail, addassociateSuccess, deleteassociate, deleteassociateSuccess, getassociate, getassociateSuccess, loadassociate, loadassociateFail, loadassociateSuccess, updateassociate, updateassociateSuccess } from "./associate.action";
import { catchError, exhaustMap, of, map, switchMap } from "rxjs";
import { showalert } from "../common/app.action";

@Injectable()
export class AssociateEffect {
    constructor(private action$: Actions, private service: AssociateService) {
    }

    // load associate effect
    _loadassociate = createEffect(() =>
        this.action$.pipe(
            ofType(loadassociate),
            exhaustMap((action) => {
                return this.service.Get().pipe(
                    map((data) => {
                        return loadassociateSuccess({ list: data })
                    }),
                    catchError((_error) => of(loadassociateFail({ errorMessage: _error.message })))
                )
            })
        )
    )

    // add associate effect
    _addassociate = createEffect(() =>
        this.action$.pipe(
            ofType(addassociate),
            switchMap((action) => {
                return this.service.Create(action.data).pipe(
                    switchMap((data) => {
                        console.log('addassociate, data: ' + data)
                        console.log('addassociate, action.data: ' + action.data)
                        return of(addassociateSuccess({ data: action.data }),
                            showalert({ message: 'Created Sucessfully.', result: 'pass' })
                        )
                    }),
                    catchError((_error) => of(showalert({ message: 'failed to create associate: ' + _error.message, result: 'fail' })))
                )
            })
        )
    )

    // get associate effect
    _getassociate = createEffect(() =>
        this.action$.pipe(
            ofType(getassociate),
            exhaustMap((action) => {
                return this.service.GetByCode(action.id).pipe(
                    map((data) => {
                        return getassociateSuccess({ associate: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'failed to fetch associate: ' + _error.message, result: 'fail' })))
                )
            })
        )
    )

    // update associate effect
    _updateassociate = createEffect(() =>
        this.action$.pipe(
            ofType(updateassociate),
            switchMap((action) => {
                return this.service.Update(action.data).pipe(
                    switchMap((data) => {
                        return of(updateassociateSuccess({ data: action.data }),
                            showalert({ message: 'Updated Sucessfully.', result: 'pass' })
                        )
                    }),
                    catchError((_error) => of(showalert({ message: 'failed to update associate: ' + _error.message, result: 'fail' })))
                )
            })
        )
    )

    // delete associate effect
    _deleteassociate = createEffect(() =>
        this.action$.pipe(
            ofType(deleteassociate),
            switchMap((action) => {
                return this.service.Delete(action.id).pipe(
                    switchMap((data) => {
                        return of(deleteassociateSuccess({ id: action.id }),
                            showalert({ message: 'Deleted Sucessfully.', result: 'pass' })
                        )
                    }),
                    catchError((_error) => of(showalert({ message: 'failed to delete associate: ' + _error.message, result: 'fail' })))
                )
            })
        )
    )

}