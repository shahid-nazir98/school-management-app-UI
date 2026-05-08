import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { StudentFormComponent } from './form/student-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule,MatTableModule,MatButtonModule,MatDialogModule,
    MatInputModule,MatFormFieldModule,MatSortModule,MatSnackBarModule,MatPaginator,MatIconModule,
    MatOptionModule,MatSelectModule
  ],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: any[] = [];
  editingStudent: any = null;
 displayedColumns: string[] = ['sno','name', 'class', 'section', 'parentPhone', 'actions'];
dataSource = new MatTableDataSource<any>();
@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;
classList: any[] = [];


  constructor(private api: ApiService,private dialog: MatDialog,private snack: MatSnackBar) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.api.getStudents().subscribe((res: any) => {
      this.students = res;
      this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
          // 🔥 Extract unique classes
    this.classList = [...new Set(res.map((s: any) => s.class))];
    });
  }


  deleteStudent(id: number) {
    this.api.deleteStudent(id).subscribe(() => {
      this.snack.open('Student deleted successfully', 'Close', {
  duration: 3000
});
      this.loadStudents();
    });
  }
editStudent(student: any) {
  const dialogRef = this.dialog.open(StudentFormComponent, {
    width: '500px',
    data: student   // 🔥 pass selected student
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.snack.open('Student updated successfully', 'Close', {
  duration: 3000
});
      this.loadStudents();
    }
  });
}

openAddDialog() {
  const dialogRef = this.dialog.open(StudentFormComponent, {
    width: '500px',
    height:'auto'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.snack.open('Student added successfully', 'Close', {
  duration: 3000
});
      this.loadStudents(); //  refresh table
    }
  });
}
applyFilter(event: any) {
  const value = event.target.value.trim().toLowerCase();
  this.dataSource.filter = value;
}
filterByClass(value: string) {
  if (!value) {
    this.dataSource.filter = '';
  } else {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.class.toLowerCase() === filter;
    };

    this.dataSource.filter = value.trim().toLowerCase();
  }
}
}