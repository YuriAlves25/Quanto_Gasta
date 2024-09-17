import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { AppMaterialImports} from '../../shared/app-material/app-material-imports';
import { MatDatepicker } from '@angular/material/datepicker';
import { default as _rollupMoment, Moment } from 'moment';
import * as _moment from 'moment';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import { MatDialogRef } from '@angular/material/dialog';
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
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss'
})
export class DialogFormComponent {
  readonly dialogRef = inject(MatDialogRef<DialogFormComponent>)


  form: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private service: ExpenseService,
              private toastService: ToastrService
              ) {
    this.form = this.formBuilder.group({
      yearMonth: [moment()],
      category: [null],
      money: [null],


    })

  }


  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.form.get('yearMonth')?.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.form.get('yearMonth')?.setValue(ctrlValue);
    datepicker.close();
  }

  onSubmit() {
    const formValue = { ...this.form.value };

    formValue.yearMonth = this.form.get('yearMonth')?.value.format('YYYY-MM');

    this.service.postSave(formValue)
    .subscribe( data => this.toastService.success("Gasto adicionado com sucesso"), error => this.toastService.error("Erro ao adicionar Gasto"));



    this.onCancel();


  }

  onCancel(){
    this.dialogRef.close()
  }



}




