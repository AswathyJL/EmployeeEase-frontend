import { Component, SimpleChanges } from '@angular/core';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { ApiService } from '../services/api.service';
import { EmpInterface } from '../interfaces/emp-interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddEmpComponent, ReactiveFormsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allEmployees: EmpInterface[] = [];
  statusFilteredEmployees: EmpInterface[] =[];
  selectedEmployee:any = {}

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
    // Initialize the reactive form
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.pattern('^([2-5][0-9]|60)$')]],
      status: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.api.getEmployee().subscribe({
      next: (employees) => {
        this.allEmployees = employees;
        this.statusFilteredEmployees = employees
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      }
    });
  }
  
  onEdit(employee:any){
    // console.log(`inside edit`);
    const empId = employee.id
    this.api.getEmployeeById(empId).subscribe((res:any)=>{
      this.selectedEmployee = res
      this.employeeForm.patchValue({
        name: this.selectedEmployee.name,
        age: this.selectedEmployee.age,
        status: this.selectedEmployee.status  // Set the status directly
      });
    })
  }

  onSubmit(empId:any){
    const employee = this.employeeForm.value;
    // console.log(`inside submit`);
    this.api.editEmployee(empId,employee).subscribe({
      next: (res: any) => {

        // Show success alert
        alert(`${employee.name} details have been updated.`);
        // Reset the form
        this.employeeForm.reset();
        this.loadEmployees()
      },
      error: (err) => {
        console.error('Error updating employee:', err);
      }
    })
  }

  // Method to handle the employee addition event
  onEmployeeAdded(newEmployee: EmpInterface) {
    this.allEmployees.push(newEmployee); // Update the employee list
  }

  onDelete(employee:any)
  {
    const empId = employee.id
    // Check if the selectedEmployee exists and has a valid ID
  if (!empId) {
    alert('No employee selected to delete!');
    return;
  }

    this.api.deleteEmployee(empId).subscribe({
      next:(res:any)=>{
        alert(`${employee.name} details have been deleted.`);
        // Reset the form
        this.employeeForm.reset();
        this.loadEmployees()
      }
    })
  }

  onFilter(statusEmp:string){
    if(statusEmp == "All")
    {
      this.statusFilteredEmployees = this.allEmployees
    }
    else
    {
      this.statusFilteredEmployees = this.allEmployees.filter((emp:any)=>emp.status == statusEmp)
    }
  }
}

