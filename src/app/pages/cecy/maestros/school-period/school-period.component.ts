import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SchoolPeriod } from 'src/app/models/cecy/schoolPeriod';
import { CecyService } from './../../../../services/cecy/cecy.service'
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Condition, Col, Paginator } from '../../../../models/setting/models.index';



@Component({
  selector: 'app-school-period',
  templateUrl: './school-period.component.html',
  styleUrls: ['./school-period.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class SchoolPeriodComponent implements OnInit {

  selectedCol: Col;
  cols: Col[];
  conditions: Condition[];
  rowsPerPageOptions: number[];
  paginator: Paginator;
  selectedSchoolPeriod: SchoolPeriod;
  schoolPeriod: SchoolPeriod;
  schoolPeriods: SchoolPeriod[];
  dialog: boolean;
  form: FormGroup;
  validatorsOptions: any;
  status: any=[];



  displayFormSchoolp: boolean;
  formClassroom: FormGroup;

  constructor(private _spinnerService: NgxSpinnerService,
    private _cecyService: CecyService,
    private _messageService: MessageService,
    private _fb: FormBuilder,
    private _confirmationService: ConfirmationService,
  ) {
    this.paginator = { current_page: 1, per_page: 5 };
    this.rowsPerPageOptions = [5, 10, 20, 30, 50];
    this.schoolPeriod={}; 
    this.schoolPeriods=[];
  }

  ngOnInit(): void {
    this.buildForm();
    this.getschoolPeriods();
    this.getCatalgue();

    this.validatorsOptions = {}



    this.cols = [
      { field: 'Código', header: 'Código' },
      { field: 'Nombre', header: 'Nombre' },
      { field: 'Fecha de Incio', header: 'Fecha de Incio' },
      { field: 'Fecha de Fin', header: 'Fecha de Fin' },
      { field: 'Fecha de Incio Ordinaria', header: 'Fecha de Incio Ordinaria' },
      { field: 'Fecha de Fin Ordinaria', header: 'Fecha de Fin Ordinaria' },
      { field: 'Fecha de Incio Extraordinaria', header: 'Fecha de Incio Extraordinaria' },
      { field: 'Fecha de Fin Extraordinaria', header: 'Fecha de Fin Extraordinaria' },
      { field: 'Fecha de Incio Especial', header: 'Fecha de Incio Especial' },
      { field: 'Fecha de Fin Especial', header: 'Fecha de Fin Especial' },
      { field: 'Estatus', header: 'Estatus' },
      { field: 'Estado', header: 'Estado' },
    ];


  }


  getCatalgue(){
    this._cecyService.get('catalogue').subscribe((r:any) =>{
      for(let i=0;i<r.length;i++){
      
        let objeto:any ={};
        objeto.label = r[i].name;
        objeto.value = r[i].id;
        this.status.push(objeto);

      }
      
      console.log(this.status);
    });
  }



  getschoolPeriods() {
    this._spinnerService.show();
    this._cecyService.get('schoolPeriod').subscribe(response => {
      this._spinnerService.hide();
      this.schoolPeriods = response['data'];
     
    }, error => {
      this._spinnerService.hide();
       this._messageService.add({
          severity: 'error',
          summary: 'Oops! Problemas con el servidor',
          detail: 'Vuelve a intentar más tarde',
          life: 5000
        });
      }
    );
  }




  openModal(schoolPeriods: SchoolPeriod) {
    if (schoolPeriods) {

      this.selectedSchoolPeriod = schoolPeriods;
console.log(schoolPeriods);
      console.log(this.form)
      this.form.controls['id'].setValue(schoolPeriods.id);
      this.form.controls['code'].setValue(schoolPeriods.code);
      this.form.controls['name'].setValue(schoolPeriods.name);
      this.form.controls['start_date'].setValue(schoolPeriods.start_date);
      this.form.controls['end_date'].setValue(schoolPeriods.end_date);
      this.form.controls['ordinary_start_date'].setValue(schoolPeriods.ordinary_start_date);
      this.form.controls['ordinary_end_date'].setValue(schoolPeriods.ordinary_end_date);
      this.form.controls['extraordinary_start_date'].setValue(schoolPeriods.extraordinary_start_date);
      this.form.controls['extraordinary_end_date'].setValue(schoolPeriods.extraordinary_end_date);
      this.form.controls['especial_start_date'].setValue(schoolPeriods.especial_start_date);
      this.form.controls['especial_end_date'].setValue(schoolPeriods.especial_end_date);
      this.form.controls['status'].setValue(schoolPeriods.status.id);

    } else {
      this.form.reset();
    }
    this.dialog = true;
  }

  castSchoolPeriod(): SchoolPeriod {
    return {
      id: this.form.controls['id'].value,
      code: this.form.controls['code'].value,
      name: this.form.controls['name'].value,
      start_date: this.form.controls['start_date'].value,
      end_date: this.form.controls['end_date'].value,
      ordinary_start_date: this.form.controls['ordinary_start_date'].value,
      ordinary_end_date: this.form.controls['ordinary_end_date'].value,
      extraordinary_start_date: this.form.controls['extraordinary_start_date'].value,
      extraordinary_end_date: this.form.controls['extraordinary_end_date'].value,
      especial_start_date: this.form.controls['especial_start_date'].value,
      especial_end_date: this.form.controls['especial_end_date'].value,
      status:
      {id: this.form.controls['status'].value},
 } as SchoolPeriod;
  }

  buildForm() {
    this.form = this._fb.group({
      id: [],
      name: ['', [
        Validators.required,]],
      code: ['', [
        Validators.required,]],
      start_date: ['', [
        Validators.required,]],
      end_date: ['', [
        Validators.required,]],
      ordinary_start_date: ['', [
        Validators.required,]],
      ordinary_end_date: ['', [
        Validators.required,]],
      extraordinary_start_date: ['', [
        Validators.required,]],
      extraordinary_end_date: ['', [
        Validators.required,]],
      especial_start_date: ['', [
        Validators.required,]],
      especial_end_date: ['', [
        Validators.required,]],
        status: [''],
    });
  }

  search(event, inputSearch) {
    if (inputSearch.length > 0 && event.key !== 'Backspace') {
        this.conditions = [{field: this.selectedCol.field, logic_operator: 'ilike', match_mode: 'contains', value: inputSearch}];
        this.getschoolPeriods();
    } else if (inputSearch.length === 0) {
        this.conditions = null;
        this.getschoolPeriods();
    }
    
}

 selectColSearch(col) {
    this.selectedCol = col;
}

  


  onSubmit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      if (this.form.controls['id'].value === null) {
        this.create();
      } else {
        this.update();
      }
      this.dialog = false;
    } else {
      this.form.markAllAsTouched();
    }
  }

  create() {
    this.selectedSchoolPeriod = this.castSchoolPeriod();
    console.log(this.form.controls);
    this._spinnerService.show();
    this._cecyService.post('schoolPeriod/', {
      'schoolPeriods': this.selectedSchoolPeriod,
      'status':this.selectedSchoolPeriod.status
    }).subscribe(
      ( response:any) => {
        this._spinnerService.hide();
        this.getschoolPeriods();
        this._messageService.add({
          severity: 'success',
          summary: 'Se creó correctamente',
          detail: 'Nuevo Perido Creado'
        });
      }, error => {
        this._spinnerService.hide();
        this._messageService.add({
          severity: 'error',
          summary: 'Oops! Problemas con el servidor',
          detail: 'Vuelve a intentar más tarde',
          life: 5000
        });
      }
    );

  }


  update() {
    this.selectedSchoolPeriod = this.castSchoolPeriod();
    this._spinnerService.show();
    this._cecyService.update('schoolPeriod/' + this.selectedSchoolPeriod.id, {
      'schoolPeriods': this.selectedSchoolPeriod,
      'status':this.selectedSchoolPeriod.status
    }).subscribe(
      response => {
        this.getschoolPeriods();
        this._spinnerService.hide();

        this._messageService.add({
          severity: 'success',
          summary: 'Se actualizado correctamente',
          detail: 'Actualizado  Perido Escolar'
        });
      }, error => {
        this._spinnerService.hide();
        this._messageService.add({
          severity: 'error',
          summary: 'Oops! Problemas con el servidor',
          detail: 'Vuelve a intentar más tarde',
          life: 5000
        });
      });
    
  }
  deleted(schoolPeriod: SchoolPeriod) {
    this._messageService.clear();
    this._messageService.add({  key: "c", sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
    
  }

  delete(schoolPeriod: SchoolPeriod) {
  console.log(this.schoolPeriod); 
    this._cecyService.delete('schoolPeriod/' + schoolPeriod.id).subscribe(
      response => {

        this.schoolPeriods = this.schoolPeriods.filter(word => word.id != schoolPeriod.id);
        this._spinnerService.hide();
        this._messageService.add({
          severity: 'success',
          summary: 'Se eliminó correctamente',
          detail: 'Eliminado  Perido Escolar',
          life: 5000
        });
      }, error => {
        this._spinnerService.hide();
        this._messageService.add({
          severity: 'error',
          summary: 'Oops! Problemas con el servidor',
          detail: 'Vuelve a intentar más tarde',
          life: 5000
        });
      });
  }


 
clear() {
  this._messageService.clear();
}
onReject() {
  this._messageService.clear('c');
}


}
