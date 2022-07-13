import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HomeComponent } from '../home/home.component';



@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  Permissions:any;



  constructor(public Service:ApiService,public home:HomeComponent) {
    this.getPermssion()

   }

  ngOnInit(): void {
  }

  Accept(id:any,type:any,permissionId:any){
    console.log(id,type,permissionId);
    if (type=='Stop the machine') {
      this.Service.postFun('stopMachine',{id}).subscribe(data => {
      })
    }
    else if (type=='Transfer the task') {
    }
    this.Service.postFun('submittedColumn',{permissionId}).subscribe(data => {
      console.log(data);
      this.getPermssion();
      this.home.getMachines();
      this.home.getTasks();
    })
  }

  getPermssion(){
    this.Service.getFun('getPermissions').subscribe(data => {
      this.Permissions=data
      for (let i = 0; i < this.Permissions.length; i++) {
              
      if (this.Permissions[i].type =='machinePermission') {
        this.Permissions[i].type='Stop the machine'
        
      }
      else if (this.Permissions[i].type =='taskPermission') {
        this.Permissions[i].type='Transfer the task'
      }
    }
    })
  }
}
