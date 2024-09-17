import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { AppMaterialImports} from '../../shared/app-material/app-material-imports';
import { MatDatepicker } from '@angular/material/datepicker';
import { default as _rollupMoment, Moment } from 'moment';
import * as _moment from 'moment';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpenseService } from '../../services/expense.service';
import { ToastrService } from 'ngx-toastr';


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};



@Component({
  selector: 'app-dialog-form',
  providers: [

    provideMomentDateAdapter(MY_FORMATS),
  ],
  standalone: true,
  imports: [
    AppMaterialImports,
    ReactiveFormsModule

  ],
  templateUrl: './dialog-add.component.html',
  styleUrl: './dialog-add.component.scss'
})
export class DialogAddComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAddComponent>)
  readonly data = inject(MAT_DIALOG_DATA);

  date = moment(this.data).format('MM/YYYY');
  form: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private service: ExpenseService,
              private toastService: ToastrService
              ) {
    this.form = this.formBuilder.group({
      yearMonth: [this.date],
      category: [null],
      money: [null],


    })

  }

  onSubmit() {
    const formValue = { ...this.form.value };

    formValue.yearMonth = moment(this.data).format('YYYY-MM')

    this.service.postSave(formValue)
    .subscribe( () => this.toastService.success("Gasto adicionado com sucesso"), error => this.toastService.error("Erro ao adicionar Gasto"));



    this.onCancel();


  }

  onCancel(){
    this.dialogRef.close()
  }



}




