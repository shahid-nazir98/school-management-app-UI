import { Component, Inject, ViewChild } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})

export class StudentFormComponent {

constructor(
  private api: ApiService,
 private dialogRef: MatDialogRef<StudentFormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {}

 loading = false;
 student: any = {};
isEdit = false;

ngOnInit() {
  if (this.data) {
    this.student = { ...this.data }; // prefill form
    this.isEdit = true;
  }
}

save() {
  this.loading = true;

  if (this.isEdit) {
    // 🔥 UPDATE
    this.api.updateStudent(this.student).subscribe(() => {
      this.loading = false;
      this.dialogRef.close(true);
    });
  } else {
    // 🔥 ADD
    this.api.addStudent(this.student).subscribe(() => {
      this.loading = false;
      this.dialogRef.close(true);
    });
  }
}

  close() {
    this.dialogRef.close();
  }
}