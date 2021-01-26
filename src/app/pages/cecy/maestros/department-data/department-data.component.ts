import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DepartmentData } from 'src/app/models/cecy/department';
import { CecyService } from 'src/app/services/cecy/cecy.service';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';

@Component({
  selector: 'app-department-data',
  templateUrl: './department-data.component.html',
  styleUrls: ['./department-data.component.css']
})
export class DepartmentDataComponent implements OnInit {
  types: any[];
  department: DepartmentData;
  departments: any = [];
  displayFormDepartment: boolean;
  formClassroom: FormGroup;
  datadepartamentSelect:DepartmentData = new DepartmentData;
  constructor(private _spinnerService: NgxSpinnerService,
    private _cecyService: CecyService,
    //private _confirmationService: ConfirmationService,
) { }

  ngOnInit(): void {
    this.departments = new DepartmentData();
    this.getDepartments();
    this.types = [
      {label: '', value: ''},
      {label: 'New York', value: 'NY'},
      {label: 'Rome', value: 'RM'},
      {label: 'London', value: 'LDN'},
      {label: 'Istanbul', value: 'IST'},
      {label: 'Paris', value: 'PRS'}
  ];
  }

  getDepartments() {
    this._spinnerService.show();
    this._cecyService.get('department_data').subscribe(response => {
      this._spinnerService.hide();
      this.departments = response//['data']['classroom'];
      console.log(this.departments);
      // this.parentCodeCatalogues = [];
      /*this.catalogues.forEach(catalogue => {
           this.parentCodeCatalogues.push({'label': catalogue.name, 'value': catalogue.id});
       });*/
    }, error => {
      this._spinnerService.hide();
      /*this._messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Oops! Problemas con el servidor',
          detail: 'Vuelve a intentar más tarde',
          life: 5000
      });*/
    });
  }
  showDialog() {
    this.displayFormDepartment = true;
  }

  postDepartment() {
    console.log(this.datadepartamentSelect);
    this._spinnerService.show();
    this._cecyService.post('department_data/' + this.datadepartamentSelect.id, {
      'department_data': this.datadepartamentSelect,
      //'type': this.authoritiesSelect.type
  }).subscribe(
    response=>{
      this._spinnerService.hide();
               /* this._messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Se creó correctamente',
                    detail: this.classroomSelect.name,
                    life: 5000
                });*/
    }
  )

  }
  updateDepartment() {
    this._spinnerService.show();
    this._cecyService.update('department_data/' + this.datadepartamentSelect.id, {
        'authorities': this.datadepartamentSelect,
        //'parent_code': this.classroomSelect.type
    }).subscribe(
        response => {
            this._spinnerService.hide();
            /*this._messageService.add({
                key: 'tst',
                severity: 'success',
                summary: 'Se actualizó correctamente',
                detail: this.selectedCatalogue.name,
                life: 5000
            });*/
            this.displayFormDepartment = false;
        }, error => {
            this._spinnerService.hide();
           /* this._messageService.add({
                key: 'tst',
                severity: 'error',
                summary: 'Oops! Problemas con el servidor',
                detail: 'Vuelve a intentar más tarde',
                life: 5000
            });*/
        });
}

/*deleteDepartment(departments: DepartmentData) {
    this._confirmationService.confirm({
        header: 'Delete ' + departments.id,
        message: 'Are you sure to delete?',
        acceptButtonStyleClass: 'ui-button-danger',
        rejectButtonStyleClass: 'ui-button-secondary',
        acceptLabel: 'Si',
        rejectLabel: 'No',
        icon: 'pi pi-trash',
        accept: () => {
            this._spinnerService.show();
            this._cecyService.delete('department_data/' + departments.id).subscribe(
                response => {
                    const indiceUser = this.departments
                        .findIndex(element => element.id === departments.id);
                    this.departments.splice(indiceUser, 1);
                    this._spinnerService.hide();
                    /*this._messageService.add({
                        key: 'tst',
                        severity: 'success',
                        summary: 'Se eliminó correctamente',
                        detail: catalogue.name,
                        life: 5000
                    });
                }, error => {
                    this._spinnerService.hide();
                    /*this._messageService.add({
                        key: 'tst',
                        severity: 'error',
                        summary: 'Oops! Problemas con el servidor',
                        detail: 'Vuelve a intentar más tarde',
                        life: 5000
                    });
                });
        }
    });

  }*/

}
