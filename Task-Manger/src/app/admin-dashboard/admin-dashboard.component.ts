import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

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
    checkbox0 : new FormControl(false, []),
    checkbox1 : new FormControl(false, []),
    checkbox2 : new FormControl(false, []),
    checkbox3 : new FormControl(false, []),
    checkbox4 : new FormControl(false, []),

  })
  machineForm = new FormGroup({
    machineName: new FormControl(''),
    password: new FormControl(''),
  })
  taskForm = new FormGroup({
    machineName: new FormControl(''),
    password: new FormControl(''),
  })
  
  userFormValue:any;
  machineFormValue:any;
  show:any;
  permissionData: Permissions[] = [
    { id: 0, name: 'Create/Edit User' },
    { id: 1, name: 'Create/Edit Machine' },
    { id: 2, name: 'Create/Edit Task' },
    { id: 3, name: 'Reports' },
    { id: 4, name: 'Permission' }

  ];


  constructor(public Service:ApiService) { 
    this.show='users'
  }

  asignShow(type:any){
    this.show=type;
  }


  ngOnInit(): void {
      $('.userIcon').click(function(){
      $('.chooser').css("left","0px")




  });
  $('.machineIcon').click(function(){
    $('.chooser').css("left","200px")

    
  });
  $('.checkIcon').click(function(){
    $('.chooser').css("left","400px")


      
  });
  }

  addUser() {
    console.log(this.userForm.value);

    this.Service.postFun('addUser',this.userForm.value).subscribe(data => {
      console.log(this.userForm.value);

    })

  }

  addMachine(){
    console.log(this.machineForm.value);

  }
  addTask(){
    console.log(this.taskForm.value);

  }
  

}
