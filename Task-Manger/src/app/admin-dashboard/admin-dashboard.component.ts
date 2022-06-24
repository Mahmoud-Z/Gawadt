import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
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
    userName: new FormControl('',Validators.compose([Validators.required])),
    password: new FormControl('',Validators.compose([Validators.required])),
    checkbox0 : new FormControl(false, []),
    checkbox1 : new FormControl(false, []),
    checkbox2 : new FormControl(false, []),
    checkbox3 : new FormControl(false, []),
    checkbox4 : new FormControl(false, []),

  })
  machineForm = new FormGroup({
    machineName: new FormControl('',Validators.compose([Validators.required])),
  })
  taskForm = new FormGroup({
    machineName: new FormControl(''),
    password: new FormControl(''),
  })
  
  userFormValue:any;
  machineFormValue:any;
  show:any;
  successMsg: boolean = false;
  machineSuccessMsg: boolean = false;
  FailMsg: boolean = false;
  user: any;

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
  $('.taskIcon').click(function(){
    $('.chooser').css("left","400px")


      
  });
  }

  checkUser(){
    this.Service.postFun('checkUser',this.userForm.value).subscribe(data => {
      try {
        this.user=data;
        this.user=this.user[0].userName;
        console.log(this.user);
        this.FailMsg=true;
        this.successMsg=false;
      } catch (error) {
        this.addUser()
      }
    })

  }
  addUser() {
    this.Service.postFun('addUser',this.userForm.value).subscribe(data => {
      this.successMsg=true;
      this.FailMsg=false;
    })

  }

  addMachine(){
    this.Service.postFun('importMachine',this.machineForm.value).subscribe(data => {
      this.machineSuccessMsg=true;
    })
  }
  addTask(){
    console.log(this.taskForm.value);

  }
  

}
