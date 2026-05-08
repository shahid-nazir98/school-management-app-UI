import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [  CommonModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatTableModule],
  templateUrl: './fees.component.html'
})
export class FeesComponent implements OnInit {

  students: any[] = [];
  fees: any[] = [];
 allFees: any[] = [];

  fee = {
    studentId: 0,
    amount: 0,
    status: 'Paid',
    date: new Date().toISOString().substring(0, 10)
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadStudents();
     this.loadAllFees();
  }

  loadStudents() {
    this.api.getStudents().subscribe((res: any) => {
      this.students = res;
      console.log(this.students)
    });
  }

  addFee() {
    this.api.addFee(this.fee).subscribe(() => {
      alert('Fee Added');
      this.loadAllFees();
    });
  }

  getFees() {
    if (this.fee.studentId === 0) return;

    this.api.getFeesByStudent(this.fee.studentId).subscribe((res: any) => {
      // this.fees = res;
    });
  }
  loadAllFees() {
  this.api.getAllStudentFees().subscribe((res: any) => {
    this.allFees = res;
  });
}
}