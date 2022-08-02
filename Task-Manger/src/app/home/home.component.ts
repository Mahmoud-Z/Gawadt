import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CdkDragDrop,moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { interval } from 'rxjs';
import { end } from '@popperjs/core';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  machines:any;
  tasks:any;
  orderSheets:any;
  sheetsPrice:any;
  orderTotalAmount:any;
  stoppedMachines:any;
  theArray:any;
  task:any;
  input:any;
  tasksRight:any;
  counters:any;
  machineIds:any;
  machinePermissionStop:boolean=false;
  machinePermissionStart:boolean=false;
  username:any;
  taskPermission:boolean=false;
  remainingTime: any;
  taskDetails: any;
  permissionResponse: any;
  userPrivlage: any;
  permissionForm = new FormGroup({
    permissionItemId: new FormControl('',Validators.compose([Validators.required])),
    reason: new FormControl('',Validators.compose([Validators.required])),
    startTime: new FormControl(''),
    duration: new FormControl('',Validators.compose([Validators.required])),
    type: new FormControl(''),
    username: new FormControl('')
  })
  orderForm = new FormGroup({
    CustomerName:  new FormControl('',),
    CustomerCode:  new FormControl('',),
    OrderReference:  new FormControl('',),
    OrderStatus:  new FormControl('',),
    OrderNumber:  new FormControl('',),
    OrderTypeCode:  new FormControl('',),
    OrderTypeName:  new FormControl('',),
    OrderPriority:  new FormControl('',),
    OrderTotalAmount:  new FormControl('',),
    PiecesPreSheets:  new FormControl('',),
    OrderSheets:  new FormControl('',),
    PiecePrice:  new FormControl('',),
    TotalPieces:  new FormControl('',),
    SheetPrice:  new FormControl('',),
    PaperType:  new FormControl('',),
    LeatherType:  new FormControl('',),
    imgSrc: new FormControl('',),
    CNC: new FormControl(false,[]),
    CTB: new FormControl(false,[]),
    Stamp: new FormControl(false,[]),
    StepCode:  new FormControl('',),
    StepName:  new FormControl('',),
    StepFactor:  new FormControl('',),
    MachinePath: new FormControl('',)
  })
  customers: any;
  anything: any;
  selectedMachines:any;


  constructor(public Service:ApiService) {
    var token=localStorage.getItem("token");
    this.userPrivlage=jwt(token||"");
    this.userPrivlage=this.userPrivlage.user
    this.username=this.userPrivlage[0].userName    
    this.getMachines()
    this.getTasks()
    this.getTasksRight()
    this.viewTask(0)
    this.getPermissionResponse();
    interval(1000).subscribe((ev)=>{
      this.counters={}
      for (let i = 0; i < Object.keys(this.tasks).length; i++) {
          for (let j = 0; j < this.tasks[Object.keys(this.tasks)[i]].length; j++) {
            if(this.tasks[Object.keys(this.tasks)[i]][j]!=undefined)
              this.counters[this.tasks[Object.keys(this.tasks)[i]][j].id]=this.timeCounter(this.tasks[Object.keys(this.tasks)[i]][j].endDate)
          }
      }
    }) 
  }
  ngOnInit(): void {
  }
  timeCounter(endDate:any){
    var seconds = Math.floor(((new Date().getTime())-(new Date(endDate).getTime()))/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);
    var days = Math.floor(hours/24);
    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
    this.remainingTime=days+"D"+" : "+hours+"H"+" : "+minutes+"M"+" : "+seconds+"S";
    return this.remainingTime
  }
  sheetsOrderCounter(){
    let PiecesPreSheets='0',TotalPieces='0';
    if (this.orderForm.get('PiecesPreSheets')?.value!=null&&this.orderForm.get('PiecesPreSheets')?.value!=undefined&&this.orderForm.get('PiecesPreSheets')?.value!="") {
      PiecesPreSheets=this.orderForm.get('PiecesPreSheets')?.value+"";
    }
    if (this.orderForm.get('TotalPieces')?.value!=null&&this.orderForm.get('TotalPieces')?.value!=undefined&&this.orderForm.get('TotalPieces')?.value!="") {
      TotalPieces=this.orderForm.get('TotalPieces')?.value+"";
    }
    this.orderSheets=(parseInt(TotalPieces)/parseInt(PiecesPreSheets))+"";
  }
  sheetsPriceCalculator(){
    let PiecesPreSheets='0',PiecePrice='0';
    if (this.orderForm.get('PiecesPreSheets')?.value!=null&&this.orderForm.get('PiecesPreSheets')?.value!=undefined&&this.orderForm.get('PiecesPreSheets')?.value!="") {
      PiecesPreSheets=this.orderForm.get('PiecesPreSheets')?.value+"";
    }
    if (this.orderForm.get('PiecePrice')?.value!=null&&this.orderForm.get('PiecePrice')?.value!=undefined&&this.orderForm.get('PiecePrice')?.value!="") {
      PiecePrice=this.orderForm.get('PiecePrice')?.value+"";
    }
    console.log(PiecesPreSheets,PiecePrice);
    this.sheetsPrice=(parseInt(PiecesPreSheets)*parseInt(PiecePrice))+"";
  }
  orderTotalAmountCalculator(){
    let SheetPrice='0',OrderSheets='0';
    if (this.orderForm.get('SheetPrice')?.value!=null&&this.orderForm.get('SheetPrice')?.value!=undefined&&this.orderForm.get('SheetPrice')?.value!="") {
      SheetPrice=this.orderForm.get('SheetPrice')?.value+"";
    }
    if (this.orderForm.get('OrderSheets')?.value!=null&&this.orderForm.get('OrderSheets')?.value!=undefined&&this.orderForm.get('OrderSheets')?.value!="") {
      OrderSheets=this.orderForm.get('OrderSheets')?.value+"";
    }
    this.orderTotalAmount=(parseInt(SheetPrice)*parseFloat(OrderSheets))+"";
  }
  deleteMachine(element:any){
    this.Service.postFun('deleteMachine',{id:element}).subscribe(data => {
      this.getMachines()
    })
  }
  deleteTask(element:any){
    this.Service.postFun('deleteTask',{id:element}).subscribe(data => {
      this.getTasks()
    })
  }
  getMachines(){
    this.machineIds=[]
    this.Service.getFun('getMachine').subscribe(data => {
      this.machines=data;
      for (let i = 0; i < this.machines.length; i++) {
      this.machineIds.push(this.machines[i].id.toString())
      }  
    })
  }
  getCustomers(){
    this.Service.getFun('getCustomers').subscribe(data => {
      this.customers=data;
      console.log(this.customers);
    })
  }
  getTasks(){
    this.Service.getFun('getTasks').subscribe(data => {
      this.tasks=data;
    })
  }
  getTasksRight(){
    this.Service.getFun('getTasksRight').subscribe(data => {
      this.tasksRight=data;
    })
  }
  updateTask(machineId:any,taskId:any,machineIdBefore:any,taskIDsBefore:any) {
    this.Service.postFun('updateTask',{machineId,taskId,machineIdBefore,taskIDsBefore}).subscribe(data => {
      this.getTasks()
    })
  }
  timeCalculation(previousContainer:any,container:any,previousIndex:any,currentIndex:any){
    // console.log("oldTask : ",oldTask,"id : ",id);
    // console.log("------------------------------------------------------");
    // this.Service.postFun('changeTime',{id,oldTask}).subscribe(data => {
    //     this.getTasks()
    // })
    this.Service.postFun('changeTime',{previousContainer,container,previousIndex,currentIndex}).subscribe(data => {
        this.getTasks()
    })
  }
  startStop(event:any,id:any){
    if (event.target.checked==true) {
      this.Service.postFun('start',{id}).subscribe(data => {
        this.getMachines()
        this.getTasks()
      })
    } else {
      this.Service.postFun('stop',{id}).subscribe(data => {
        this.getMachines()
      })
    }
  }
  startStopTask(event:any,id:any){
    if (event.target.checked==true) {
      this.Service.postFun('startTask',{id}).subscribe(data => {
        this.getTasks()
      })
    } else {
      this.Service.postFun('stopTask',{id}).subscribe(data => {
        this.getTasks()
      })
    }
  }
  viewTask(id:any){
    this.Service.postFun('viewTask',{id}).subscribe(data => {
      this.taskDetails=data;
       this.anything= this.taskDetails.id
    })
    
  }
  switchPermission(event:any){
    if ((<HTMLInputElement>event.target).value =='taskPermission')
    {
      this.taskPermission=true;
      this.machinePermissionStart=false;
      this.machinePermissionStop=false;

    }
    else if ((<HTMLInputElement>event.target).value =='machinePermissionStop'){
      this.machinePermissionStop=true;
      this.machinePermissionStart=false;
      this.taskPermission=false;
    }
    else if ((<HTMLInputElement>event.target).value =='machinePermissionStart'){
      this.machinePermissionStop=false;
      this.machinePermissionStart=true;
      this.taskPermission=false;
    }
  }
  Permssion(){
    this.permissionForm.value['username']=this.username;
    console.log(this.permissionForm);
    
    this.Service.postFun('addPermission',this.permissionForm.value).subscribe(data => {

    })
  }
  getPermissionResponse(){
    this.Service.postFun('getPermissionResponse',{username:this.username}).subscribe(data => {
      this.permissionResponse=data;
    })
  }
  editOrder(){

    this.Service.postFun('editOrder',this.orderForm.value).subscribe(data => {
    })
  }
  machinePath(event:any){
    this.selectedMachines=new Array(event);
    console.log(event);
  }
  test(id:any,event:any){
    this.selectedMachines[id]=(<HTMLInputElement>event.target).value;
    this.orderForm.value['MachinePath']=this.selectedMachines;
  }

  onDrop(event:CdkDragDrop<string []>,status:any){
    if (status=='true') {
      if (event.previousContainer === event.container) {
          moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        )
      }
      else{
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        )
      }
      let taskIDs=[];
      let taskIDsBefore=[];
      for (let i = 0; i < event.container.data.length; i++) {
        taskIDs.push(JSON.parse(JSON.stringify(event.container.data[i])).id)
      }
      for (let i = 0; i < event.previousContainer.data.length; i++) {
        taskIDsBefore.push(JSON.parse(JSON.stringify(event.previousContainer.data[i])).id)
      }
      // this.timeCalculation(
      //   event.previousContainer.id,
      //   event.container.id,
      //   event.previousIndex,
      //   event.currentIndex)
      this.updateTask(event.container.id,taskIDs,event.previousContainer.id,taskIDsBefore) 
      console.log(this.tasks);
    }
  }
}
