import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../services/api.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  students: any[] = [];
  filteredStudents: any[] = [];
  classList: any[] = [];
  selectedClass = '';
  selectedSection = '';
  attendanceDate = new Date().toISOString().substring(0, 10);

  // key format => studentId_period
  attendanceMap: any = {};

  presentCount = 0;
  absentCount = 0;
  pendingCount = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {

    this.api.getStudents().subscribe((res: any) => {

      this.students = res;

      // unique classes
      this.classList = [...new Set(res.map((s: any) => s.class))];

    });

  }

  filterStudents() {

    this.filteredStudents = this.students.filter(s =>
      s.class === this.selectedClass &&
      (!this.selectedSection || s.section === this.selectedSection)
    );

    this.calculateCounts();
  }

  toggleAttendance(studentId: number, period: number) {

    const key = `${studentId}_${period}`;

    const current = this.attendanceMap[key];

    if (!current) {
      this.attendanceMap[key] = 'Present';
    }
    else if (current === 'Present') {
      this.attendanceMap[key] = 'Absent';
    }
    else {
      this.attendanceMap[key] = '';
    }

    this.calculateCounts();
  }

  getStatusText(studentId: number, period: number): string {

    const key = `${studentId}_${period}`;

    const status = this.attendanceMap[key];

    if (status === 'Present') return 'P';
    if (status === 'Absent') return 'A';

    return '-';
  }

  getStatusClass(studentId: number, period: number): string {

    const key = `${studentId}_${period}`;

    const status = this.attendanceMap[key];

    if (status === 'Present') return 'present-btn';
    if (status === 'Absent') return 'absent-btn';

    return 'pending-btn';
  }

  calculatePercentage(studentId: number): number {

    let total = 5;
    let present = 0;

    for (let i = 1; i <= 5; i++) {

      const key = `${studentId}_${i}`;

      if (this.attendanceMap[key] === 'Present') {
        present++;
      }

    }

    return Math.round((present / total) * 100);
  }

  calculateCounts() {

    let present = 0;
    let absent = 0;
    let pending = 0;

    Object.values(this.attendanceMap).forEach((status: any) => {

      if (status === 'Present') {
        present++;
      }
      else if (status === 'Absent') {
        absent++;
      }
      else {
        pending++;
      }

    });

    this.presentCount = present;
    this.absentCount = absent;

    // total cells
    const totalCells = this.filteredStudents.length * 5;

    this.pendingCount = totalCells - (present + absent);
  }

  saveAttendance() {

    const payload: any[] = [];

    this.filteredStudents.forEach(student => {

      for (let period = 1; period <= 5; period++) {

        const key = `${student.id}_${period}`;

        payload.push({
          studentId: student.id,
          class: student.class,
          section: student.section,
          date: this.attendanceDate,
          period: period,
          status: this.attendanceMap[key] || 'Pending'
        });

      }

    });

    console.log(payload);

    // API call
    // this.api.saveAttendance(payload).subscribe(() => {
    //   alert('Attendance Saved');
    // });

  }

}