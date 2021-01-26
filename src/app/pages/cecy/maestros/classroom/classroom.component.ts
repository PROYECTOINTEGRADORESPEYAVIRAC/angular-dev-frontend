import { State } from 'src/app/models/ignug/state';
import { Classroom } from './../../../../models/ignug/classroom';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IgnugService } from './../../../../services/ignug/ignug.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Condition, Col, Paginator } from '../../../../models/setting/models.index';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css'],
  providers: [MessageService, ConfirmationService]


})
export class ClassroomComponent implements OnInit {
  selectedCol: Col;
  cols: Col[];
  conditions: Condition[];
  rowsPerPageOptions: number[];
  paginator: Paginator;
  selectedClassroom: Classroom;
  classroom: Classroom;
  dialog: boolean;
  form: FormGroup;
  validatorsOptions: any;
  icon: any[];
  types: any[];
  catalogues: any = [];
  state: any[];
  states: any = [];
  classrooms: any = [];
  ClassroomSelect: Classroom;
  uploadedFiles: any[] = [];

  constructor(private _spinnerService: NgxSpinnerService,
    private _messageService: MessageService,
    private _ignugService: IgnugService,
    private _fb: FormBuilder,) {
    this.paginator = { current_page: 1, per_page: 5 };
    this.rowsPerPageOptions = [5, 10, 20, 30, 50];
  }

  ngOnInit(): void {
    this.buildForm();

    this.icon = [
      { label: 'New York', value: 'NY' },
      { label: 'Rome', value: 'RM' },
      { label: 'London', value: 'LDN' },
      { label: 'Istanbul', value: 'IST' },
      { label: 'Paris', value: 'PRS' }
    ];
    this.cols = [
      { field: 'Codigo', header: 'Codigo' },
      { field: 'Nombre', header: 'Nombre del Aula' },
      { field: 'Tipo', header: 'Tipo de Aula' },
      { field: 'Icono', header: 'Icono' },

    ];


    this.selectedCol = this.cols[0];
    this.getAulas();
    this.getCatalgue();


  }

  paginate(event) {
    this.paginator.current_page = event.page + 1;
    this.paginator.per_page = event.rows;
    this.getAulas();
  }

  getAulas() {
    this._spinnerService.show();
    this._ignugService.get('classroom').subscribe(response => {
      this._spinnerService.hide();
      this.classrooms = response['data'];
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



  getCatalgue() {
    this._ignugService.get('catalogues').subscribe((r: any) => {
      for (let i = 0; i < r.length; i++) {

        let objeto: any = {};
        objeto.label = r[i].name;
        objeto.value = r[i].id;
        this.catalogues.push(objeto);

      }
      console.log(this.catalogues);

    });
  }

  openModal(classroom: Classroom) {
    if (classroom) {
      this.selectedClassroom = classroom;
      console.log(this.form.controls)
      this.form.controls['id'].setValue(classroom.id);
      this.form.controls['code'].setValue(classroom.code);
      this.form.controls['name'].setValue(classroom.name);
      this.form.controls['capacity'].setValue(classroom.capacity);
      this.form.controls['type'].setValue(classroom.type.id);
      this.form.controls['icon'].setValue(classroom.icon);
      this.form.controls['state'].setValue(classroom.state.id);
    } else {
      this.form.reset();
    }
    this.dialog = true;
  }

  castClassroom(): Classroom {
    return {
      id: this.form.controls['id'].value,
      code: this.form.controls['code'].value,
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
      capacity: this.form.controls['capacity'].value,
      type:
        { id: this.form.controls['type'].value },
      state:
        { id: this.form.controls['state'].value }
    } as Classroom;
  }


  deleteSelected() {
    console.log('hola');
  }

  delete(classroom: Classroom) {
    this._spinnerService.show();
    this._ignugService.delete('classroom/' + classroom.id).subscribe(
      response => {

        this.classrooms = this.classrooms.filter(word => word.id != classroom.id);
        this._spinnerService.hide();
        this._messageService.add({
          severity: 'success',
          summary: 'Se eliminó correctamente',
          detail: 'Eliminado  Aula',
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

  search(event, inputSearch) {
    if (inputSearch.length > 0 && event.key !== 'Backspace') {
      this.conditions = [{ field: this.selectedCol.field, logic_operator: 'ilike', match_mode: 'contains', value: inputSearch }];
      this.getAulas();
    } else if (inputSearch.length === 0) {
      this.conditions = null;
      this.getAulas();
    }
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
    this.selectedClassroom = this.castClassroom();
    this._spinnerService.show();
    this._ignugService.update('classroom/' + this.selectedClassroom.id, {
      'classroom': this.selectedClassroom,
      'type': this.selectedClassroom.type,
      'state': this.selectedClassroom.state
    }).subscribe(
      (response: any) => {
        this._spinnerService.hide();
        this._messageService.add({
          key: 'tst',
          severity: 'success',
          summary: 'Se creó correctamente',
          detail: 'Actualizada  Aula',
          life: 5000
        });
        //this.classrooms.push(response.data.attributes.classroom)
        this.getAulas();
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

  selectColSearch(col) {
    this.selectedCol = col;
  }

  buildForm() {
    this.form = this._fb.group({
      id: [],
      icon: [''],
      type: [''],
      name: [''],
      code: [''],
      state: [''],
      capacity: [''],
    });
  }



  loadFile(event,data) {


    const logo = event.target.files[0];


    console.log(event.target.files[0])

    let form = new FormData();
    form.append('image',logo);
    form.append('name',logo.name);
    form.append('description','logoClassroom');
    form.append('classroom_id',data.id);

    console.log(data)


    this._ignugService.upload('logo',form).subscribe(
      (response: any) => {

        console.log(response)

      }, error => {

        console.log(error)
      }
    );



  }

  create() {

    this.selectedClassroom = this.castClassroom();
    console.log(this.ClassroomSelect);
    this._spinnerService.show();
    this._ignugService.post('classroom/', {
      'classroom': this.selectedClassroom,
      'type': this.selectedClassroom.type,
    }).subscribe(
      (response: any) => {
        this._spinnerService.hide();
        this._messageService.add({
          severity: 'success',
          summary: 'Se creó correctamente',
          detail: 'Creado Nueva Aula',
          life: 5000
        });
        this.getAulas();
        //this.classrooms.push(response.data.attributes.classroom)
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




}
