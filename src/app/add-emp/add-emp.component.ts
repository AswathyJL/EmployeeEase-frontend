import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-add-emp',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-emp.component.html',
  styleUrl: './add-emp.component.css'
})
export class AddEmpComponent {
  employeeForm: FormGroup;
  @Output() employeeAdded: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder, private api: ApiService) {
    // Initialize the form
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.pattern('^([2-5][0-9]|60)$')]],
      status: ['', [Validators.required]]
    });
  }

  // Convenience getter for easy access to form controls in the template
  get formControls() {
    return this.employeeForm.controls;
  }

  // Handle form submission
  onSubmit() {
    if (this.employeeForm.valid) {
      const employee = this.employeeForm.value;
      this.api.addEmployee(employee).subscribe((res:any)=>{
        alert(`${employee.name} details added`);
        this.employeeForm.reset();
        // Emit the new employee to the parent component
        this.employeeAdded.emit(res); // Emit event with the added employee
      }) 
    } else {
      alert('Form is invalid. Please enter the details in correct format to proceed');
    }
  }
}
