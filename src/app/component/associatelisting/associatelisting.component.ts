import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Store } from '@ngrx/store';
import { Associate } from 'src/app/store/associate/associate.model';
import { getassociatelist } from 'src/app/store/associate/associate.selector';
import { deleteassociate, getassociate, loadassociate, opendialog } from 'src/app/store/associate/associate.action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmComponent } from '../confirm/confirm.component';
import { loadspinner } from 'src/app/store/common/app.action';


@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.scss']
})
export class AssociatelistingComponent implements OnInit {

  associateList!: Associate[];
  displayColumns: string[] = ["code", "name", "email", "phone", "address", "type", "associategroup", "status", "action"]
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {

    this.store.dispatch(loadspinner({isLoaded: true}));
    // 1. dispatch loadassociate() `action` --> effect side (associate.effect.ts)
    // 2. effect of _loadassociate is listening to loadassociate() action
    // 3. and it run the servie of this.service.Get()
    // 4. reducer side -> sending the data (no matter success or fail) to the 'store'

    // setTimeout(() => {
    //   this.store.dispatch(loadassociate());
    //   //this.store.dispatch(loadspinner({ isLoaded: false }));
      
    // },5000);

    this.store.dispatch(loadassociate());

    // get data from the 'store' using "selector"
    this.store.select(getassociatelist).subscribe(item => {
      this.associateList = item;
      this.dataSource = new MatTableDataSource<Associate>(this.associateList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.associateList);
    })
  }

  functionAdd() {
    this.openDialog(0, 'Create Associate');
  }

  onEdit(code: number) {
    this.store.dispatch(loadspinner({ isLoaded: true }));
    this.openDialog(code, 'Edit Associate');
    this.store.dispatch(getassociate({ id: code }));
  }

  dialogRef!: MatDialogRef<ConfirmComponent>;
  onDelete(code: number) {
    //this.openConfirmDialog();
    // let dialogRef = 
    // let dialogRef = this.dialog.open(ConfirmComponent, {
    //   width: '50%',
    //   enterAnimationDuration: '350ms',
    //   exitAnimationDuration: '350ms'
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    //   if ((result += '') === 'OK') {
    //     this.store.dispatch(deleteassociate({ id: code }));
    //   }
    // });
    // if (confirm('do you want to remove?')) {
    //   this.store.dispatch(deleteassociate({ id: code }));
    // }
    this.dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false
    });
    //this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // do confirmation actions
        this.store.dispatch(loadspinner({ isLoaded: true }));
        this.store.dispatch(deleteassociate({ id: code }));
      }
      //this.dialogRef = null;
    });
  }

  
  openConfirmationDialog() {

  }

  openDialog(code: number, title: string) {
    this.store.dispatch(opendialog());
    this.dialog.open(AddassociateComponent, {
      width: '50%',
      enterAnimationDuration: '350ms',
      exitAnimationDuration: '350ms',
      data: {
        code: code,
        title: title
      }
    })
  }




}
