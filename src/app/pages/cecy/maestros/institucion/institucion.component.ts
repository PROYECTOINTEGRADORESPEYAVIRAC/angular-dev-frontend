import { Authorities } from './../../../../models/cecy/authorities';
import { IgnugService } from './../../../../services/ignug/ignug.service';
import { SchoolPeriod } from './../../../../models/cecy/schoolPeriod';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Institucion } from 'src/app/models/cecy/institution';
import { CecyService } from 'src/app/services/cecy/cecy.service';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {Condition, Col, Paginator} from '../../../../models/setting/models.index' ;



@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class InstitucionComponent implements OnInit {

  selectedCol: Col;
  cols: Col[];
  conditions: Condition[];
  rowsPerPageOptions: number[];
  paginator: Paginator;
  selectedInstitucion: Institucion;
  dialog: boolean;
  form: FormGroup;



  types: any[];
  institucion: Institucion;
  institucions: any = [];
  formClassroom: FormGroup;
  institucionSelect:Institucion;
  states: any=[];
  authorities: any=[];

  constructor(private _spinnerService: NgxSpinnerService,
    private _messageService: MessageService,
    private _cecyService: CecyService,
    private  _ignugService: IgnugService,
    private _fb: FormBuilder,
    //private _confirmationService: ConfirmationService
    ){ 
      this.paginator = {current_page: 1, per_page: 5};
      this.rowsPerPageOptions = [5, 10, 20, 30, 50];
    }

  ngOnInit(): void {
    this.buildForm();
    this.getAuthorities();
    this.getInstitucions();

    this.cols = [
      { field: 'Ruc', header: 'Ruc' },
      { field: 'Codigo', header: 'Codigo' },
      { field: 'Nombre', header: 'Nombre ' },
      { field: 'Slogan', header: 'Slogan' },
      { field: 'Icono', header: 'Icono' },
      { field: 'state', header: 'Estado' },
    ];

    this.types = [
      {label: '', value: 1},
      {label: 'New York', value: 1},
      {label: 'Rome', value: 1},
      {label: 'London', value: 1},
      {label: 'Istanbul', value: 1},
      {label: 'Paris', value: 1}
  ];
  

  }


  getInstitucions() {
    this._spinnerService.show();
    this._cecyService.get('institutions').subscribe(response => {
      this._spinnerService.hide();
      this.institucions = response['data'];
      console.log(this.institucions);
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

  

  getAuthorities(){
    this._cecyService.get('authorities').subscribe(response => {
      this._spinnerService.hide();
      this.authorities = response['data'];
    },error => {
      this._messageService.add({
          severity: 'error',
          summary: 'Oops! Problemas con el servidor',
          detail: 'Vuelve a intentar más tarde',
          life: 5000
      });
    });

  }
    
    



  openModal(institucion: Institucion) {
    if (institucion) {
      this.selectedInstitucion = institucion;
      console.log(this.selectedInstitucion);


        this.form.controls['id'].setValue(institucion.id);
        this.form.controls['code'].setValue(institucion.code);
        this.form.controls['name'].setValue(institucion.name);
        this.form.controls['ruc'].setValue(institucion.ruc);
        this.form.controls['slogan'].setValue(institucion.slogan);
        this.form.controls['logo'].setValue(institucion.logo);
        this.form.controls['state'].setValue(institucion.state);
        this.form.controls['authorities.id'].setValue(institucion.authorities.id);

    } else {
        this.form.reset();
    }
    this.dialog = true;
}

  deleteSelected(){
    console.log('hola');
  }
  search(){
  console.log('hola');
    
  }

  castInstitucion(): Institucion {
    return {
        id: this.form.controls['id'].value,
        code: this.form.controls['code'].value,
        name: this.form.controls['name'].value,
        slogan: this.form.controls['slogan'].value,
        ruc:this.form.controls['ruc'].value,
        logo:this.form.controls['logo'].value,
        state:
        {id: this.form.controls['state'].value},
        authorities:
        {id:this.form.controls['authorities'].value}
    } as Institucion;
}

buildForm() {
  this.form = this._fb.group({
    id: [],
    logo: [''],
    slogan: [''],
    name: [''],
    ruc:[''],
    code: [''],
    state:[''], 
    });
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
    
  this.selectedInstitucion = this.castInstitucion();
   this._spinnerService.show();
   this._cecyService.post('institutions/' , {
     'institutions': this.selectedInstitucion,
   }).subscribe(
    ( response:any) => {
       this._spinnerService.hide();
        this._messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Se creó correctamente',
            detail:'Creada Nueva Instituciòn ',
            life: 5000
        });
        this.getInstitucions();
      //this.institucions.push(response.data.attributes.classroom)
     }, error =>{
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
  this.selectedInstitucion = this.castInstitucion();
  this._spinnerService.show();
  this._cecyService.post('institutions/' , {
    'institutions': this.selectedInstitucion,
    'logo': this.selectedInstitucion.logo,
  }).subscribe(
   ( response:any) => {
      this._spinnerService.hide();
      window.location.reload();
      this._messageService.add({
           key: 'tst',
           severity: 'success',
           summary: 'Se Actualizo correctamente',
           detail: 'Se Actualizo Intitución',
           life: 5000
       });
       this.institucions.push(response.data.attributes.classroom)
    }
  );

}

delete(institucion:Institucion){
 
  this._spinnerService.show();
  this._cecyService.delete('institutions/' + institucion.id).subscribe(
    response => {

      this.institucions = this.institucions.filter(word => word.id != institucion.id);
      this._spinnerService.hide();
      this._messageService.add({
          key: 'tst',
          severity: 'success',
          summary: 'Se eliminó correctamente',
          detail: 'Se eliminó una Institución',
          life: 5000
      });
    }, error =>{
      this._spinnerService.hide();
      this._messageService.add({
          severity: 'error',
          summary: 'Oops! Problemas con el servidor',
          detail: 'Vuelve a intentar más tarde',
          life: 5000
      });
    });

}



}
