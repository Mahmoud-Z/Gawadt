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
    checkbox4 : new FormControl(false, [])

  })
  machineForm = new FormGroup({
    machineName: new FormControl('',Validators.compose([Validators.required])),
  })
  taskForm = new FormGroup({
    CustomerName: new FormControl('',Validators.compose([Validators.required])),
    CustomerCode: new FormControl('',Validators.compose([Validators.required])),
    OrderReference: new FormControl('',Validators.compose([Validators.required])),
    OrderStatus: new FormControl('',Validators.compose([Validators.required])),
    OrderNumber: new FormControl('',Validators.compose([Validators.required])),
    OrderTypeCode: new FormControl('',Validators.compose([Validators.required])),
    OrderTypeName: new FormControl('',Validators.compose([Validators.required])),
    OrderPriority: new FormControl('',Validators.compose([Validators.required])),
    OrderTotalAmount: new FormControl('',Validators.compose([Validators.required])),
    PiecesPreSheets: new FormControl('',Validators.compose([Validators.required])),
    OrderSheets: new FormControl('',Validators.compose([Validators.required])),
    PiecePrice: new FormControl('',Validators.compose([Validators.required])),
    TotalPieces: new FormControl('',Validators.compose([Validators.required])),
    SheetPrice: new FormControl('',Validators.compose([Validators.required])),
    PaperType: new FormControl('',Validators.compose([Validators.required])),
    LeatherType: new FormControl('',Validators.compose([Validators.required])),
    imgSrc: new FormControl('',),
    CNC: new FormControl(false,[]),
    CTB: new FormControl(false,[]),
    Stamp: new FormControl(false,[]),
    StepCode: new FormControl('',Validators.compose([Validators.required])),
    StepName: new FormControl('',Validators.compose([Validators.required])),
    StepFactor: new FormControl('',Validators.compose([Validators.required])),
    MachinePath: new FormControl(''),
  })
  itemForm = new FormGroup({
    itemName: new FormControl('',Validators.compose([Validators.required])),
    itemPrice: new FormControl('',Validators.compose([Validators.required])),


  })
  customerForm = new FormGroup({
    customerName: new FormControl('',Validators.compose([Validators.required])),
    customerCode: new FormControl('',Validators.compose([Validators.required]))

  })
  orderSheets:any;
  sheetsPrice:any;
  orderTotalAmount:any;
  sheetPrice:any;
  userFormValue:any;
  machineFormValue:any;
  show:any;
  customers:any;
  successMsg: boolean = false;
  machineSuccessMsg: boolean = false;
  FailMsg: boolean = false;
  ItemSuccessMsg: boolean = false;
  CustomerSuccessMsg: boolean = false;
  user: any;
  selectedMachines:any;
  selectedMachines2:any;
  machines:any;
  input:any;
  customerName:any;
  custom:any;
  customerCodeId:any;
  permissionData: Permissions[] = [
    { id: 0, name: 'Create/Edit User' },
    { id: 1, name: 'Create/Edit Machine' },
    { id: 2, name: 'Create/Edit Task' },
    { id: 3, name: 'Reports' },
    { id: 4, name: 'Permission' }
  ];



  constructor(public Service:ApiService) { 
    this.getMachines();
    this.getCustomers();
    this.selectedMachines=[""]
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
    $('.chooser').css("left","120px")
  });
  $('.itemIcon').click(function(){
    $('.chooser').css("left","230px")
  });
  $('.taskIcon').click(function(){
    $('.chooser').css("left","330px")
  });
  $('.customerIcon').click(function(){
    $('.chooser').css("left","450px")
  });
  }

  OnKey(x:any) { // appending the updated value to the variable
    this.custom  = this.customers.find((ele:any )=> {
      
      return ele.customerName ==  x.target.value
    })
    this.taskForm.controls['CustomerCode'].setValue(this.custom.customerCode);
  }

  checkUser(){
    this.Service.postFun('checkUser',this.userForm.value).subscribe(data => {
      
      if (data.length != 0) {
        this.FailMsg=true;
        this.successMsg=false;
      }
      else{
        this.addUser()
      }
      
    })

  }
  addUser() {
    console.log(this.userForm);
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
  addItem(){
    console.log(this.taskForm.value);
    // this.Service.postFun('importItem',this.taskForm.value).subscribe(data => {
    //   this.ItemSuccessMsg=true;
    // })
  }
  sheetsOrderCounter(){
    let PiecesPreSheets='0',TotalPieces='0';
    if (this.taskForm.get('PiecesPreSheets')?.value!=null&&this.taskForm.get('PiecesPreSheets')?.value!=undefined&&this.taskForm.get('PiecesPreSheets')?.value!="") {
      PiecesPreSheets=this.taskForm.get('PiecesPreSheets')?.value+"";
    }
    if (this.taskForm.get('TotalPieces')?.value!=null&&this.taskForm.get('TotalPieces')?.value!=undefined&&this.taskForm.get('TotalPieces')?.value!="") {
      TotalPieces=this.taskForm.get('TotalPieces')?.value+"";
    }
    this.orderSheets=(parseInt(TotalPieces)/parseInt(PiecesPreSheets))+"";
  }
  sheetsPriceCalculator(){
    let PiecesPreSheets='0',PiecePrice='0';
    if (this.taskForm.get('PiecesPreSheets')?.value!=null&&this.taskForm.get('PiecesPreSheets')?.value!=undefined&&this.taskForm.get('PiecesPreSheets')?.value!="") {
      PiecesPreSheets=this.taskForm.get('PiecesPreSheets')?.value+"";
    }
    if (this.taskForm.get('PiecePrice')?.value!=null&&this.taskForm.get('PiecePrice')?.value!=undefined&&this.taskForm.get('PiecePrice')?.value!="") {
      PiecePrice=this.taskForm.get('PiecePrice')?.value+"";
    }
    console.log(PiecesPreSheets,PiecePrice);
    this.sheetsPrice=(parseInt(PiecesPreSheets)*parseInt(PiecePrice))+"";
  }
  orderTotalAmountCalculator(){
    let SheetPrice='0',OrderSheets='0';
    if (this.taskForm.get('SheetPrice')?.value!=null&&this.taskForm.get('SheetPrice')?.value!=undefined&&this.taskForm.get('SheetPrice')?.value!="") {
      SheetPrice=this.taskForm.get('SheetPrice')?.value+"";
    }
    if (this.taskForm.get('OrderSheets')?.value!=null&&this.taskForm.get('OrderSheets')?.value!=undefined&&this.taskForm.get('OrderSheets')?.value!="") {
      OrderSheets=this.taskForm.get('OrderSheets')?.value+"";
    }
    this.orderTotalAmount=(parseInt(SheetPrice)*parseFloat(OrderSheets))+"";
  }
  addTask(){
    console.log(this.customerName);

    //this.taskForm.controls['CustomerCode'].setValue(this.taskDetails.stepCode);
    console.log(this.taskForm.value);
    this.Service.postFun('importTasks',this.taskForm.value).subscribe(data => {
      this.ItemSuccessMsg=true;
    })
  }
  addCustomer(){
    this.Service.postFun('importCustomer',this.customerForm.value).subscribe(data => {
      console.log(this.customerForm.value);
      this.CustomerSuccessMsg=true;
    })
  }
  subm(){

  }
  getCustomers(){
    this.Service.getFun('getCustomers').subscribe(data => {
      this.customers=data;
      console.log(this.customers);
    })
  }
  getMachines(){
    this.Service.getFun('getMachine').subscribe(data => {
      this.machines=data;
    })
  }
  machinePath(event:any){
    this.selectedMachines=new Array(event);
    this.selectedMachines2=new Array(event);
    console.log(event);
  }
  test(id:any,event:any){
    this.selectedMachines2[id]=(<HTMLInputElement>event.target).value;
    this.taskForm.value['MachinePath']=this.selectedMachines2;
    console.log(this.selectedMachines2);
  }
}
