import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  // GET  API - http://localhost:5000/allStudents

  getAllStudentAPI(): Observable<any> {
    return this.http.get(`${this.server_url}/allStudents`);
  }

  // POST  API - http://localhost:5000/addStudent

  addStudentAPI(studentData: any): Observable<any> {
    return this.http.post(`${this.server_url}/addStudent`, studentData);
  }

  // PUT Update Student API - http://localhost:5000/updateStudent/:id


  updateStudentAPI(id: string, studentData: any): Observable<any> {
    return this.http.put(`${this.server_url}/updateStudent/${id}`, studentData);
  }

  // DELETE  API - http://localhost:5000/deleteStudent/:id


  deleteStudentAPI(id: string): Observable<any> {
    return this.http.delete(`${this.server_url}/deleteStudent/${id}`);
  }

}
