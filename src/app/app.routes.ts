import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { FeesComponent } from './fees/fees.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🔥 MAIN APP (after login)
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],   // ✅ guard applied once
   children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], data: { title: 'Dashboard' } },
      { path: 'students', component: StudentsComponent, canActivate: [authGuard], data: { title: 'Students' } },
      { path: 'attendance', component: AttendanceComponent, canActivate: [authGuard], data: { title: 'Attendance' } },
      { path: 'fees', component: FeesComponent, canActivate: [authGuard], data: { title: 'Fees' } }
    ]
  }

];