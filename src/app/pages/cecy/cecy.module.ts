import { SchoolPeriodComponent } from './maestros/school-period/school-period.component';
import { ScheduleComponent } from './maestros/schedule/schedule.component';
import { InstitucionComponent } from './maestros/institucion/institucion.component';
import { DepartmentDataComponent } from './maestros/department-data/department-data.component';
import { ClassroomComponent } from './maestros/classroom/classroom.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AutoCompleteModule } from "primeng/autocomplete";
import {ToastModule} from 'primeng/toast';
import { MultiSelectModule } from "primeng/multiselect";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { CheckboxModule } from "primeng/checkbox";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputMaskModule } from "primeng/inputmask";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { SpinnerModule } from "primeng/spinner";
import { SliderModule } from "primeng/slider";
import { LightboxModule } from "primeng/lightbox";
import { ListboxModule } from "primeng/listbox";
import { RatingModule } from "primeng/rating";
import { ColorPickerModule } from "primeng/colorpicker";
import { EditorModule } from "primeng/editor";
import { ToggleButtonModule } from "primeng/togglebutton";
import { SelectButtonModule } from "primeng/selectbutton";
import { SplitButtonModule } from "primeng/splitbutton";
import { PasswordModule } from "primeng/password";
import { FileUploadModule } from "primeng/fileupload";
import {DialogModule} from 'primeng/dialog';
import {PaginatorModule} from 'primeng/paginator';




import { CecyRoutes } from "./cecy.routing";
import { TooltipModule } from "primeng/tooltip";
import {ToolbarModule} from 'primeng/toolbar';
import { TableModule } from "primeng/table";
import { DataViewModule } from "primeng/dataview";
import { PanelModule } from "primeng/panel";
import { TreeModule } from "primeng/tree";
import { TreeTableModule } from "primeng/treetable";
import { VirtualScrollerModule } from "primeng/virtualscroller";
import { PickListModule } from "primeng/picklist";
import { OrderListModule } from "primeng/orderlist";
import { CarouselModule } from "primeng/carousel";
import { FullCalendarModule } from "primeng/fullcalendar";
//import { TabViewModule } from "primeng";
import { InputNumberModule } from "primeng/inputnumber";


//import { PaidCoursesComponent } from "./matriculacion/paid-courses/paid-courses.component";
//import { MisCursosComponent } from "./matriculacion/mis-cursos/mis-cursos.component";
import { ParticipantscrudComponent } from './maestros/participantscrud/participantscrud.component';
import { AuthoritiesComponent } from './maestros/authorities/authorities.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CecyRoutes),
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    MultiSelectModule,
    CalendarModule,
    ChipsModule,
    CheckboxModule,
    FileUploadModule,
    RadioButtonModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    SpinnerModule,
    SliderModule,
    LightboxModule,
    ListboxModule,
    RatingModule,
    ColorPickerModule,
    EditorModule,
    ToggleButtonModule,
    SelectButtonModule,
    SplitButtonModule,
    PasswordModule,
    ToolbarModule,
    TooltipModule,
    TableModule,
    DataViewModule,
    PanelModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,
    PickListModule,
    OrderListModule,
    CarouselModule,
    FullCalendarModule,
    PaginatorModule,
    //TabViewModule,
    InputNumberModule,
    DialogModule,
    ToastModule
   

    
  ],
  declarations: [//PaidCoursesComponent, MisCursosComponent,
    ClassroomComponent,DepartmentDataComponent,InstitucionComponent,ScheduleComponent,SchoolPeriodComponent,ParticipantscrudComponent,AuthoritiesComponent],
})
export class CedyModule {}
