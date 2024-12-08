import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpInterface } from '../interfaces/emp-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  addEmployee(reqBody: any) {
    console.log(`inside addemployee`);
    
    return this.http.post(`${this.server_url}/allEmployees`,reqBody)
  }

  getEmployee(): Observable<EmpInterface[]> {
    return this.http.get<EmpInterface[]>(`${this.server_url}/allEmployees`);
  }

  getEmployeeById(empId:any){
    return this.http.get(`${this.server_url}/allEmployees/${empId}`)

  }

  editEmployee(empId:any,reqBody:any)
  {
    return this.http.put(`${this.server_url}/allEmployees/${empId}`,reqBody)
  }

  deleteEmployee(empId:any)
  {
    return this.http.delete(`${this.server_url}/allEmployees/${empId}`,empId)
  }
}
