import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table-book',
  templateUrl: './table-book.component.html',
  styleUrls: ['./table-book.component.css']
})
export class TableBookComponent implements OnInit {
  tableForm!:FormGroup
  table:any={}
  id:any
  titre:any
  button:any
  constructor(private tableService:TableService,private route:Router,private AR:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.AR.snapshot.paramMap.get("id")
    if(this.id){
      this.titre = "Edit Table"
      this.getTableById()
      this.button="Modifier Table"
    }
    else{
    let LS = JSON.parse(localStorage.getItem("connectedUser") || '{}')
    if (LS.role) {
      this.table.name = LS.firstName
      this.table.email=LS.email
      this.table.idUser=LS.id
      this.titre="Book A Table"
      this.button="Book A Table"
      console.log(this.table);
      console.log(LS);
      
      
      
    }}
  }
  add_edit_Table(){
    if(this.id){
      this.tableService.updateTable(this.table).subscribe((res) => {
        console.log(res.message);
        this.route.navigate(["mesTables"])
      })
    }
    else{
    this.tableService.addTable(this.table).subscribe((res) => {
      console.log(res.message);
    this.route.navigate(['mesTables'])
    })}
  }
  getTableById() {
    this.tableService.getTableById(this.id).subscribe((res) => {
      this.table = res.table
    })
  }


}
