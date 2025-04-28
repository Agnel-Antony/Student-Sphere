import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  paginatedStudents: any[] = [];
  showadd: Boolean = true;
  showupdate: Boolean = false;
  showSuccessMessage:Boolean = false;
  showErrorMessage:Boolean = false;
  currentStudentId: string = ''; 
  formValue!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

   currentPage: number = 1;
   pageSize: number = 10; 
   totalPages: number = 0;


  ngOnInit(): void {
    // Fetch all students when the component is initialized
    this.getAllStudents();

    this.formValue = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      course: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      grade: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]]
    });
  }

  // Fetch all students from the API
  getAllStudents() {
    this.apiService.getAllStudentAPI().subscribe((data: any) => {
      this.students = data;
      this.totalPages = Math.ceil(this.students.length / this.pageSize); 
      this.updatePaginatedStudents();
    }, error => {
      console.error('Error fetching students:', error);
    });
  }

  // Show add form
  add() {
    this.showadd = true;
    this.showupdate = false;
    this.formValue.reset();
  }

  // Show update form with selected student's data

  update(student: any) {
    this.showadd = false;
    this.showupdate = true;
    this.currentStudentId = student._id;
    this.formValue.patchValue({
      name: student.name,
      email: student.email,
      course: student.course,
      grade: student.grade
    });
  }

  // Add new student to the database



  addStudent() {
    // Mark all fields as touched to trigger validation messages
    this.showErrorMessage = false;
    this.showSuccessMessage = false;
    this.formValue.markAllAsTouched();

    if (this.formValue.valid) {
      this.apiService.addStudentAPI(this.formValue.value).subscribe((response) => {
        console.log('Student added.....', response);
        this.getAllStudents(); 
        this.formValue.reset();
        this.showSuccessMessage = true;
      }, error => {
        this.showErrorMessage = true;
        console.error('Error adding student..', error);
      });
    }
  }

  // Update student details in the database

  updateStudent() {
    if (this.formValue.valid) {
      this.apiService.updateStudentAPI(this.currentStudentId, this.formValue.value).subscribe((response) => {
        console.log('Student updated...', response);
        this.getAllStudents(); 
      }, error => {
        console.error('Error updating student...', error);
      });
    }
  }

  // Delete student by ID


  delete(studentId: string) {
    this.apiService.deleteStudentAPI(studentId).subscribe(() => {
      console.log('Student deleted..');
      this.getAllStudents(); 
    }, error => {
      console.error('Error deleting student', error);
    });
  }



  updatePaginatedStudents() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedStudents = this.students.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedStudents();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedStudents();
    }
  }


  confirmDelete(studentId: string) {
    const isConfirmed = confirm('Are you sure you want to delete this student?');
    if (isConfirmed) {
      this.delete(studentId);
    }
  }

  closeModal() {
    
    this.showSuccessMessage = false; 
    this.showErrorMessage = false; 
  }

}
