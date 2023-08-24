import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs";
import { emptyaction, showalert } from "./app.action";



@Injectable()
export class AppEffect{
    constructor(private action$: Actions, private snackBar: MatSnackBar) {
    }

    _showalert=createEffect(() => 
        this.action$.pipe(
            ofType(showalert),
            exhaustMap((action) => {
                return this.showSnackBarAlert(action.message, action.result).afterDismissed().pipe(
                    map(() => {
                        return emptyaction();
                    })
                )
            })
        )
    )

    showSnackBarAlert(message: string, result:string='fail') {
        let _class = result == 'pass' ? 'green-snackbar' : 'red-snackbar'
        return this.snackBar.open(message, 'OK', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 5000, // milisecond
            panelClass: [_class]
        })
    }
}