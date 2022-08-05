import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HomeComponent } from '../home/home.component';
import jwt from 'jwt-decode';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  Permissions:any;
  userPrivlage: any;
  username:any;
  permissionResponseForm = new FormGroup({
    responseMessage: new FormControl(''),
    username: new FormControl(''),
    responseType: new FormControl(''),
    responseStatues: new FormControl('')
  })

  constructor(public Service:ApiService,public home:HomeComponent) {

    this.getPermssion()

   }

  ngOnInit(): void {
  }

  Accept(id:any,type:any,permissionId:any,permissionUsername:any){
    this.permissionResponseForm.value['username']=permissionUsername;
    this.permissionResponseForm.value['responseStatues']='true';

    if (type=='Stop the machine') {
      this.Service.postFun('stopMachine',{id}).subscribe(data => {
      })
      this.permissionResponseForm.value['responseMessage']='Your Request For Stopping The Machine have been Accepted';
      this.permissionResponseForm.value['responseType']='Aceepted';
      this.Service.postFun('permissionResponse',this.permissionResponseForm.value).subscribe(data => {
      }) 
    }
    else if (type=='Start the machine') {
      this.Service.postFun('startMachine',{id}).subscribe(data => {
      })
      this.permissionResponseForm.value['responseMessage']='Your Request For Starting The Machine have been Accepted';
      this.permissionResponseForm.value['responseType']='Aceepted';
      this.Service.postFun('permissionResponse',this.permissionResponseForm.value).subscribe(data => {
      }) 
    }
    else if (type=='Stop the Order') {
      this.Service.postFun('stopTask',{id}).subscribe(data => {
      })
      this.permissionResponseForm.value['responseMessage']='Your Request For Stopping The Task have been Accepted';
      this.permissionResponseForm.value['responseType']='Aceepted';
      this.Service.postFun('permissionResponse',this.permissionResponseForm.value).subscribe(data => {
      }) 
    }
    else if (type=='Start the Order') {
      this.Service.postFun('startTask',{id}).subscribe(data => {
      })
      this.permissionResponseForm.value['responseMessage']='Your Request For Starting The Task have been Accepted';
      this.permissionResponseForm.value['responseType']='Aceepted';
      this.Service.postFun('permissionResponse',this.permissionResponseForm.value).subscribe(data => {
      })   
    }
    this.Service.postFun('submittedColumn',{permissionId}).subscribe(data => {
      console.log(data);
      this.getPermssion();
      this.home.getMachines();
      this.home.getTasks();
    })
    setTimeout(()=>{this.permissionTimeOut()}, 120000);
  }
  Decline(id:any,type:any,permissionId:any,permissionUsername:any){

    this.permissionResponseForm.value['username']=permissionUsername;
    if (type=='Stop the machine' || type=='Start the machine') {
      this.permissionResponseForm.value['responseMessage']='Your Request For Stopping The Machine have been Denied';
    }
    if (type=='Stop the Order' || type=='Start the Order') {
      this.permissionResponseForm.value['responseMessage']='Your Request For Stopping The Order have been Denied';
    }
    this.permissionResponseForm.value['responseType']='Decline';
    this.permissionResponseForm.value['responseStatues']='true';
    this.Service.postFun('permissionResponse',this.permissionResponseForm.value).subscribe(data => {
    }) 
    this.Service.postFun('submittedColumn',{permissionId}).subscribe(data => {
      this.getPermssion();
      this.home.getMachines();
      this.home.getTasks();
    })
    setTimeout(()=>{this.permissionTimeOut()}, 1200000);
  }
  permissionTimeOut(){
    this.Service.postFun('permissionTimeOut','').subscribe(data => {
    })
  }
  getPermssion(){
    this.Service.getFun('getPermissions').subscribe(data => {
      this.Permissions=data
      for (let i = 0; i < this.Permissions.length; i++) {
              
      if (this.Permissions[i].type =='machinePermissionStop') {
        this.Permissions[i].type='Stop the machine'
      } 
      else if (this.Permissions[i].type =='machinePermissionStart') {
        this.Permissions[i].type='Start the machine'
      }
      else if (this.Permissions[i].type =='taskPermissionStop') {
        this.Permissions[i].type='Stop the Order'
      }
      else if (this.Permissions[i].type =='taskPermissionStart') {
        this.Permissions[i].type='Start the Order'
      }
    }
    })
  }



}
