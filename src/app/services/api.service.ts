import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {

  baseUrl = 'http://localhost:5141/api';

  constructor(private http: HttpClient) {}

  register(data: any) {
  return this.http.post(`${this.baseUrl}/auth/register`, data);
}

  login(email: string, password: string) {
  return this.http.post(`${this.baseUrl}/auth/login`, {
    email: email,
    password: password
  });
}

  getDashboard() {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }
  getStudents() {
  return this.http.get(`${this.baseUrl}/student`);
}

addStudent(data: any) {
  return this.http.post(`${this.baseUrl}/student`, data);
}

deleteStudent(id: number) {
  return this.http.delete(`${this.baseUrl}/student/${id}`);
}
updateStudent(data: any) {
  return this.http.put(`${this.baseUrl}/student`, data);
}
markAttendance(data: any) {
  return this.http.post(`${this.baseUrl}/attendance`, data);
}
addFee(data: any) {
  return this.http.post(`${this.baseUrl}/fee`, data);
}
getFeesByStudent(studentId: number) {
  return this.http.get(`${this.baseUrl}/fee/${studentId}`);
}
getAllStudentFees() {
  return this.http.get(`${this.baseUrl}/fee/all`);
}
}