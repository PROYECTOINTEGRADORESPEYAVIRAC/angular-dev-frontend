import { Routes } from "@angular/router";

//import { PaidCoursesComponent } from "./matriculacion/paid-courses/paid-courses.component";
//import { MisCursosComponent } from "./matriculacion/mis-cursos/mis-cursos.component";
import { ClassroomComponent } from './maestros/classroom/classroom.component';
import { DepartmentDataComponent } from './maestros/department-data/department-data.component';
import { SchoolPeriodComponent } from './maestros/school-period/school-period.component';
import { ScheduleComponent } from './maestros/schedule/schedule.component';
import { InstitucionComponent } from './maestros/institucion/institucion.component';
import { ParticipantscrudComponent } from './maestros/participantscrud/participantscrud.component';
import { AuthoritiesComponent } from './maestros/authorities/authorities.component';

export const CecyRoutes: Routes = [
  {
    path: "classroom",
    component: ClassroomComponent,
  },
  
  {
    path: "authorities",
    component: AuthoritiesComponent,
  },
  
  {
    path: "department",
    component: DepartmentDataComponent,
  },
  
  {
    path: "institucion",
    component: InstitucionComponent,
  },
  {
    path: "part",
    component: ParticipantscrudComponent,
  }, 
  {
    path: "schedule",
    component: ScheduleComponent,
  },
  
  {
    path: "schoolperiod",
    component: SchoolPeriodComponent,
  },
 /* {
    path: "",
    children: [/*
      {
        path: "dashboard",
        loadChildren: () =>
          import("./matriculacion/dashboards/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "free-courses",
        loadChildren: () =>
          import("./matriculacion/free-courses/free-courses.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "academic-records",
        loadChildren: () =>
          import(
            "./matriculacion/academic-records/academic-records.module"
          ).then((m) => m.DashboardModule),
      },
    ],
  },
  {
    path: "cursos-pago",
    component: PaidCoursesComponent,
  },
  {
    path: "mis-cursos",
    component: MisCursosComponent,
  },*/
  
  
];
