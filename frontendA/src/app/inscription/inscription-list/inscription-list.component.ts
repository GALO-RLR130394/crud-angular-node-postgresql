import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Services
import { InscriptionService } from '../services/inscription.service';
//Models
import { Inscription } from '../models/inscription';
//Sweet Alert
import Swal from 'sweetalert2';
//Components
import { CreateComponent } from '../create/create.component';
@Component({
  selector: 'app-inscription-list',
  templateUrl: './inscription-list.component.html',
  styleUrls: ['./inscription-list.component.scss']
})
export class InscriptionListComponent implements OnInit, AfterViewInit{

  inscriptions: Inscription[] = [];
  inscription: Inscription = new Inscription().deserialize({});

  paginator:any;
  totalRecords = 0;
  pageSize = 0;
  displayedColumns: string[] = [
    'fullname',
    'age',
    'date',
    'cost',
    'actions',
  ];

  dataSource = new MatTableDataSource<Inscription>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private inscriptionService:InscriptionService) { }

  ngAfterViewInit() {
    this.getInscriptions();
  }

  ngOnInit(): void {
  }

  getInscriptions():void{
    this.inscriptionService.getInscriptions().subscribe(
        (inscriptions: Inscription[]) => {
          console.log(inscriptions)
          this.dataSource.data=inscriptions;
          this.totalRecords = inscriptions.length;
          this.dataSource.paginator = this.paginator;
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message.message
          });
        }
    );
  }

  deleteInscription(inscription_uuid:any):void{
    Swal.fire({
      title: 'Eliminar',
      text: '¿Seguro que deseas eliminarla?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result:any) => {
      if (result.value) {
        Swal.fire('Un momento...');
        Swal.showLoading();
          this.inscriptionService.deleteInscription(inscription_uuid).subscribe(() => {
            Swal.hideLoading();
            Swal.fire({
              icon: 'success',
              title: 'Eliminada correctamente',
              showConfirmButton: false,
              timer: 5000
            });
            this.getInscriptions()
          },
            (error: any) => {
              Swal.hideLoading();
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
              });
          });
      }
    }); 
  }

}
