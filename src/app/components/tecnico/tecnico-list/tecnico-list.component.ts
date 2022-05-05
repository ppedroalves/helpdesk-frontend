import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/modules/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = [
    {
      id: 1,
      nome: "Pedro",
      cpf: "071.441.796.32",
      email: "pedro@email.com",
      senha: "1234",
      perfis: ['0'],
      dataCriacao: '15/08/2022'
    }
  ]
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private service: TecnicoService) { }

  ngOnInit(): void {
    this.findAll()
  }



 


  findAll(){
    this.service.findAll().subscribe(
      res =>  {
        this.ELEMENT_DATA = res
        this.dataSource = new MatTableDataSource<Tecnico>(res)
        this.dataSource.paginator = this.paginator;
      }
     
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}

