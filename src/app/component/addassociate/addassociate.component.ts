import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addassociate, updateassociate } from 'src/app/store/associate/associate.action';
import { getassociate } from 'src/app/store/associate/associate.selector';
import { Associate } from 'src/app/store/associate/associate.model';
import { loadspinner } from 'src/app/store/common/app.action';

@Component({
  selector: 'app-addassociate',
  templateUrl: './addassociate.component.html',
  styleUrls: ['./addassociate.component.scss']
})
export class AddassociateComponent implements OnInit {

  title = 'Create Associate';
  isEdit = false;
  dialogData: any;
  constructor(private formBuilder: FormBuilder, private ref: MatDialogRef<AddassociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store) {
  }

  ngOnInit(): void {
    this.dialogData = this.data;
    this.title = this.dialogData.title;

    this.store.select(getassociate).subscribe(res => {
      this.associateForm.setValue({
        id: res.id, name: res.name, email: res.email, phone: res.phone,
        address: res.address, associategroup: res.associategroup, type: res.type, status: res.status
      })
    })
  }

  closeDialog() {
    this.ref.close();
  }


  associateForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    name: this.formBuilder.control('', Validators.required),
    email: this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.formBuilder.control(''),
    address: this.formBuilder.control(''),
    type: this.formBuilder.control('CUSTOMER'),
    associategroup: this.formBuilder.control('level1'),
    status: this.formBuilder.control(true),
  })

  SaveAssociate() {
    if (this.associateForm.valid) {
      const _obj: Associate = {
        id: this.associateForm.value.id as number,
        name: this.associateForm.value.name as string,
        email: this.associateForm.value.email as string,
        phone: this.associateForm.value.phone as string,
        associategroup: this.associateForm.value.associategroup as string,
        address: this.associateForm.value.address as string,
        type: this.associateForm.value.type as string,
        status: this.associateForm.value.status as boolean
      }
      this.store.dispatch(loadspinner({ isLoaded: true }));
      if (_obj.id === 0) {
        this.store.dispatch(addassociate({ data: _obj }))
      } else {
        this.store.dispatch(updateassociate({ data: _obj }))
      }
      this.closeDialog();
    }
  }
}


