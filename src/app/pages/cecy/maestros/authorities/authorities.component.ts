import { Authorities } from './../../../../models/cecy/authorities';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CecyService } from 'src/app/services/cecy/cecy.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Condition, Col, Paginator} from '../../../../models/setting/models.index' ;
import { Catalogue } from 'src/app/models/ignug/catalogue';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';

@Component({
  selector: 'app-authorities',
  templateUrl: './authorities.component.html',
  styleUrls: ['./authorities.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class AuthoritiesComponent implements OnInit {
  selectedCol: Col;
  cols: Col[];
  conditions: Condition[];
  rowsPerPageOptions: number[];
  paginator: Paginator;
  selectedAuthority: Authorities;
  dialog: boolean;
  form: FormGroup;
  positions :Catalogue[];
  authorities: any = [] ;
  
  user:any[];
  
  displayFormAuthorities: boolean;
  formAuthorities: FormGroup;
  authoritiesSelect:Authorities;

  constructor(private _spinnerService: NgxSpinnerService,
    private _cecyService: CecyService,
    private _messageService: MessageService,
    private _fb: FormBuilder,
    //private _confirmationService: ConfirmationService,
) {
  this.paginator = {current_page: 1, per_page: 5};
    this.rowsPerPageOptions = [5, 10, 20, 30, 50];
 }

  ngOnInit(): void {
    this.user = [
      {label: '', value: ''},
      {label: 'New York', value: 'NY'},
      {label: 'Rome', value: 'RM'},
      {label: 'London', value: 'LDN'},
      {label: 'Istanbul', value: 'IST'},
      {label: 'Paris', value: 'PRS'}
  ];
 
  this.cols = [
    { field: 'identification', header: 'Identificación' },
    { field: 'first_name', header: 'Nombres' },
    { field: 'first_lastname', header: 'Apellidos' },
    { field: 'position', header: 'Cargo' },
    { field: 'start_position', header: 'Apellidos' },
    { field: 'end_position', header: 'Cargo' },
    { field: 'state', header: 'Estado' }
  ];
  
  this.buildForm();

    this.getAuthorities();
 }


  openModal(authoritie: Authorities) {
    if (authoritie) {
        this.form.controls['id'].setValue(authoritie.id);
        this.form.controls['start_position'].setValue(authoritie.start_position);
        this.form.controls['end_position'].setValue(authoritie.end_position);
        this.form.controls['position'].setValue(authoritie.position);
        this.form.controls['status'].setValue(authoritie.status);
        this.form.controls['user'].setValue(authoritie.user);
    } else {
        this.form.reset();
    }
    this.dialog = true;
}


 
  

  buildForm() {
    this.form = this._fb.group({
      id: [],
      start_position: [''],
      end_position: [''],
      position: [''],
      status:[''], 
      user:[''], 
      });
  }


  getAuthorities(){
    this._spinnerService.show();
    this._cecyService.get('authorities').subscribe(response => {
      this._spinnerService.hide();
      this.authorities = response['data'];
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
  castAuthorities(): Authorities {
    return {
        id: this.form.controls['id'].value,
        start_position: this.form.controls['start_position'].value,
        end_position: this.form.controls['end_position'].value,
        state:
        {id: this.form.controls['state'].value},
        user:
        {id:this.form.controls['user'].value},
        status:
        {id:this.form.controls['status'].value},
        position:
        {id:this.form.controls['position'].value},
    } as Authorities;
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


  update() {
    this.selectedAuthority = this.castAuthorities();
    this._spinnerService.show();
    this._cecyService.update('authorities/'+ this.selectedAuthority.id , {
      'authorities': this.selectedAuthority,
      'position': this.selectedAuthority.position,
      'status': this.selectedAuthority.status,
      'user':this.selectedAuthority.user
    }).subscribe(
     ( response:any) => {
        this._spinnerService.hide();
         this._messageService.add({
             key: 'tst',     
             severity: 'success',
             summary: 'Se creó correctamente',
             detail: 'Actualizada  Aula',
             life: 5000
         });
         //this.classrooms.push(response.data.attributes.classroom)
         this.getAuthorities();
      },error => {
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

  selectColSearch(col) {
    this.selectedCol = col;
  }

  create() {
    
    this.selectedAuthority = this.castAuthorities();
     this._spinnerService.show();
     this._cecyService.post('authorities/' , {
      'authorities': this.selectedAuthority,
      'position': this.selectedAuthority.position,
      'status': this.selectedAuthority.status,
      'user':this.selectedAuthority.user
       }).subscribe(
      ( response:any) => {
         this._spinnerService.hide();
          this._messageService.add({
              severity: 'success',
              summary: 'Se creó correctamente',
              detail: 'Creado Nueva Aula',
              life: 5000
          });
          this.getAuthorities();
       },error => {
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
   

   delete(authoritie:Authorities){
    this._spinnerService.show();
    this._cecyService.delete('authorities/' + authoritie.id).subscribe(
      response => {
        this.authorities = this.authorities.filter(word => word.id != authoritie.id);
        this._spinnerService.hide();
        this._messageService.add({
            severity: 'success',
            summary: 'Se eliminó correctamente',
            detail: 'Eliminado  Aula',
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

  search(event, inputSearch) {
    if (inputSearch.length > 0 && event.key !== 'Backspace') {
      this.conditions = [{ field: this.selectedCol.field, logic_operator: 'ilike', match_mode: 'contains', value: inputSearch }];
      this.getAuthorities();
    } else if (inputSearch.length === 0) {
      this.conditions = null;
      this.getAuthorities();
    }
  }


  
}
