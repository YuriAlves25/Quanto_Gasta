import { Expense } from './../../model/expense';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpenseService } from '../../services/expense.service';
import { ToastrService } from 'ngx-toastr';
import { AppMaterialImports } from '../../shared/app-material/app-material-imports';


@Component({
  selector: 'app-dialog-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppMaterialImports
  ],
  templateUrl: './dialog-edit.component.html',
  styleUrl: './dialog-edit.component.scss'
})
export class DialogEditComponent {
  readonly dialogRef = inject(MatDialogRef<DialogEditComponent>)
  readonly data = inject<Expense>(MAT_DIALOG_DATA);

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: ExpenseService,
    private toastService: ToastrService,
    ) {
    this.form = this.formBuilder.group({
      id:[this.data.id],
      category: [this.data.category],
      money: [this.data.money],


      })

  }

  onSubmit() {
    this.service.putEdit(this.form.value)
    .subscribe( () => this.toastService.success("Gasto editado com sucesso"), error => this.toastService.error("Erro ao editar Gasto"));
    this.dialogRef.close()
  }

onCancel() {
  this.dialogRef.close()
}

}
