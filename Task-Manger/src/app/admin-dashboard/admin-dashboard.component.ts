import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

export interface Permissions {
  id: number;
  name: string;
}
declare var $:any //declear $ to use jquery
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    type: new FormControl(''),
    permission: this.fb.array([])

  })
  machineForm = new FormGroup({
    machineName: new FormControl(''),
    password: new FormControl(''),
  })
  userFormValue:any;
  machineFormValue:any;
  permissionData: Permissions[] = [
    { id: 0, name: 'Create/Edit User' },
    { id: 1, name: 'Create/Edit Machine' },
    { id: 2, name: 'Create/Edit Task' },
    { id: 3, name: 'Reports' },
    { id: 4, name: 'Permission' }

  ];


  constructor(private fb: FormBuilder) { }

  onChange(name: string, isChecked: boolean) {
    const permission = (this.userForm.controls.permission as FormArray);

    if (isChecked) {
      permission.push(new FormControl(name));
    } else {
      const index = permission.controls.findIndex(x => x.value === name);
      permission.removeAt(index);
    }
  }


  ngOnInit(): void {
    $('.userIcon').click(function(){
      $('.chooser').css("left","0px")
      $('.userDiv').css("display", "none");
      $('.machineDiv').toggleClass('d-none');
      $('.userDiv').removeClass('d-none');

  });
  $('.machineIcon').click(function(){
    $('.chooser').css("left","200px")
    $('.userDiv').toggleClass('d-none');
    $('.machineDiv').removeClass('d-none');
    
  });
  $('.checkIcon').click(function(){
    $('.chooser').css("left","400px")

      
  });
  }

  addUser(){
    console.log(this.userForm.value);

  }
  addMachine(){
    console.log(this.machineForm.value);

  }
  

}
