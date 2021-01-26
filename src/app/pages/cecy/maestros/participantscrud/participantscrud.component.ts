import { state } from '@angular/animations';
import { Participants } from './../../../../models/cecy/participants';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IgnugService } from 'src/app/services/ignug/ignug.service';
import { CecyService } from 'src/app/services/cecy/cecy.service';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Condition, Col, Paginator } from '../../../../models/setting/models.index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-participantscrud',
  templateUrl: './participantscrud.component.html',
  styleUrls: ['./participantscrud.component.css']
})
export class ParticipantscrudComponent implements OnInit {

  selectedCol: Col;
  cols: Col[];
  conditions: Condition[];
  rowsPerPageOptions: number[];
  paginator: Paginator;
  selectedParticipant: Participants;
  dialog: boolean;
  form: FormGroup;

  persons: any = [];
  states: any = [];
  participant: Participants;
  participants: any = [];
  part:any=[];
  displayFormParticipants: boolean;
  participantSelect: Participants;

  constructor(private _spinnerService: NgxSpinnerService,
    private _fb: FormBuilder,
    private _cecyService: CecyService,
    private _messageService: MessageService,

    //private _confirmationService: ConfirmationService,
  ) {
    this.paginator = { current_page: 1, per_page: 5 };
    this.rowsPerPageOptions = [5, 10, 20, 30, 50];
  }

  ngOnInit(): void {
    this.persons = [
      { label: '', value: '' },
      { label: 'New York', value: 'NY' },
      { label: 'Rome', value: 'RM' },
      { label: 'London', value: 'LDN' },
      { label: 'Istanbul', value: 'IST' },
      { label: 'Paris', value: 'PRS' }
    ];
   
    this.part = [
      { label: 'Adultos', value: '4' },
      { label: 'Estudiantes', value: '5' },      
      { label: 'Profesores', value: '6' }

    ];
    
  this.cols = [
    { field: 'identification', header: 'Identificación' },
    { field: 'first_name', header: 'Nombres' },
    { field: 'first_lastname', header: 'Apellidos' },
    { field: 'type_person', header: 'Tipo de Persona' },
    { field: 'state', header: 'Estado' }
  ];

    this.getParticipants();
  }


  getParticipants() {
    this._spinnerService.show();
    this._cecyService.get('participant').subscribe(response => {
      this._spinnerService.hide();
      this.participants = response//['data']['classroom'];
      console.log(this.participants);
      
    }, error => {
      this._spinnerService.hide();
      
    });
  }
  
  openModal(participants: Participants) {
    if (participants) {
        this.form.controls['id'].setValue(participants.id);
       
    } else {
        //this.form.reset();
    }
    this.dialog = true;
}

update() {
  this.selectedParticipant = this.castParticipants();
  this._spinnerService.show();
  this._cecyService.update('participant/'+ this.selectedParticipant.id , {
    'participant': this.selectedParticipant,
    'user': this.selectedParticipant.user,
    'person_type': this.selectedParticipant.person_type,
  }).subscribe(
   ( response:any) => {
      this._spinnerService.hide();
      this.getParticipants();
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


castParticipants(): Participants {
  return {
      id: this.form.controls['id'].value,
      user:
          {id: this.form.controls['user'].value},
      person_type:
          { id: this.form.controls['person_type'].value},
          state:
          {id:this.form.controls['state'].value}
  } as Participants ;
}



create() {
  this.selectedParticipant = this.castParticipants();
   this._spinnerService.show();
   this._cecyService.post('participant/' , {
    'participant': this.selectedParticipant,
    'user': this.selectedParticipant.user,
    'person_type': this.selectedParticipant.person_type,
     }).subscribe(
    ( response:any) => {
       this._spinnerService.hide();
       this.getParticipants();
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

 delete(participant: Participants) {
  this._spinnerService.show();
  this._cecyService.delete('participant/' + participant.id).subscribe(
    response => {

      this.participants = this.participants.filter(word => word.id != participant.id);
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
    this.getParticipants();
} else if (inputSearch.length === 0) {
    this.conditions = null;
    this.getParticipants();
}

}



 


 

}
