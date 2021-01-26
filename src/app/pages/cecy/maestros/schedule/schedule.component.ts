import { Institucion } from './../../../../models/cecy/institution';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Schedule } from 'src/app/models/cecy/schedule';
import { CecyService } from 'src/app/services/cecy/cecy.service';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {Condition, Col, Paginator} from '../../../../models/setting/models.index' ;





@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class ScheduleComponent implements OnInit {
  selectedCol: Col;
  cols: Col[];
  conditions: Condition[];
  rowsPerPageOptions: number[];
  paginator: Paginator;
  selectedSchedule: Schedule;
  schedules: any = [];
  dialog: boolean;
  form: FormGroup;


  day: any=[];
  

  schedule: Schedule;
  
 
  scheduleSelect:Schedule ;
  constructor(private _spinnerService: NgxSpinnerService,
    private _cecyService: CecyService,
    private _fb: FormBuilder,
    private _messageService: MessageService,
    //private _confirmationService: ConfirmationService,
    ) {
      this.paginator = {current_page: 1, per_page: 5};
      this.rowsPerPageOptions = [5, 10, 20, 30, 50];
     }

  ngOnInit(): void {
    this.buildForm();
    this.getSchedules();
    this.getCatalgue();
    console.log(this.schedules);
     
  this.cols = [
    { field: 'start_time', header: 'Fecha de Incio' },
    { field: 'end_time', header: 'Fecha Fin' },
    { field: 'day', header: 'Dia' },
    { field: 'state', header: 'Estado' },

  ];
  }

  getCatalgue(){
    this._cecyService.get('catalogue').subscribe((r:any) =>{
      for(let i=0;i<r.length;i++){
      
        let objeto:any ={};
        objeto.label = r[i].name;
        objeto.value = r[i].id;
        this.day.push(objeto);

      }
      console.log(this.day);
    });
  }


  openModal(schedule: Schedule) {
    if (schedule) {
        this.form.controls['id'].setValue(schedule.id);
        this.form.controls['start_time'].setValue(schedule.start_time);
        this.form.controls['end_time'].setValue(schedule.end_time);
        this.form.controls['day'].setValue(schedule.day.id);       
    } else {
        this.form.reset();
    }
    this.dialog = true;
}

castSchedule(): Schedule {
  return {
      id: this.form.controls['id'].value,
      start_time: this.form.controls['start_time'].value,
      end_time: this.form.controls['end_time'].value,
      day:
          {id: this.form.controls['day'].value},
  } as Schedule;
}

  getSchedules() {
    this._spinnerService.show();
    this._cecyService.get('schedule').subscribe(response => {
      this._spinnerService.hide();
      this.schedules = response['data'];
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
    this.selectedSchedule = this.castSchedule();
    this._spinnerService.show();
    this._cecyService.update('schedule/'+ this.selectedSchedule.id , {
      'schedule': this.selectedSchedule,
      'day': this.selectedSchedule.day,
    }).subscribe(
     ( response:any) => {
        this._spinnerService.hide();
        this.getSchedules();
         this._messageService.add({
             key: 'tst',
             severity: 'success',
             summary: 'Se creó correctamente',
             detail: 'Actualizado  Horario',
             life: 5000
         });
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

  create() {
    this.selectedSchedule = this.castSchedule();
    console.log(this.selectedSchedule);
     this._spinnerService.show();
     this._cecyService.post('schedule/' , {
       'schedule': this.selectedSchedule,
       'day': this.selectedSchedule.day
       }).subscribe(
      ( response:any) => {
         this._spinnerService.hide();
         this.getSchedules();
          this._messageService.add({
              key: 'tst',
              severity: 'success',
              summary: 'Se creó correctamente',
              detail: 'Nuevo Horario',
              life: 5000
          });
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

   delete(schedule: Schedule) {
    this._spinnerService.show();
    this._cecyService.delete('schedule/' + schedule.id).subscribe(
      response => {

        this.schedules = this.schedules.filter(word => word.id != schedule.id);
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


  


  buildForm() {
    this.form = this._fb.group({
      id: [],
      start_time: [''],
      end_time: [''],
      day: [''],
      state:[''], 
      });
  }
   

  selectColSearch(col) {
    this.selectedCol = col;
}

search(event, inputSearch) {
  if (inputSearch.length > 0 && event.key !== 'Backspace') {
      this.conditions = [{field: this.selectedCol.field, logic_operator: 'ilike', match_mode: 'contains', value: inputSearch}];
      this.getSchedules();
  } else if (inputSearch.length === 0) {
      this.conditions = null;
      this.getSchedules();
  }
  
}

}
