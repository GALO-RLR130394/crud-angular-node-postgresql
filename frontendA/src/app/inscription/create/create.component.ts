import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//Services
import { InscriptionService } from '../services/inscription.service';
//Models
import { Inscription } from '../models/inscription';
//Sweet Alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  inscription_uuid:any=null;
  inscriptions: Inscription[] = [];
  inscription: Inscription = new Inscription().deserialize({});
  //Form
  inscriptionForm=new FormGroup({
    firstname:new FormControl('',Validators.required),
    lastname:new FormControl('',Validators.required),
    birthday:new FormControl('',Validators.required),
    age:new FormControl('',Validators.required),
    inscription_date:new FormControl('',Validators.required),
    cost:new FormControl(0,Validators.required)
  });
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private inscriptionService:InscriptionService
  ) { }

  ngOnInit(): void {
    this.inscription_uuid= this.route.snapshot.paramMap.get('id');
    console.log(this.inscription_uuid)
    
    if (this.inscription_uuid) {
      this.getInscriptionById(this.inscription_uuid);
    }
  }

  getInscriptionById(inscription_uuid:any):void{
    this.inscriptionService.getInscriptionById(inscription_uuid).subscribe(
        (inscription: Inscription) => {
          this.inscriptionForm.patchValue({
            firstname:inscription.firstname,
            lastname:inscription.lastname,
            birthday:inscription.birthday,
            age:inscription.birthday,
            inscription_date:inscription.inscription_date,
            cost:inscription.cost
          });

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

  createInscription():void {
    Swal.fire('Un momento...');
    Swal.showLoading();

    this.inscriptionService.createInscription(this.inscriptionForm.value).subscribe(() => {
        Swal.hideLoading();
          Swal.fire({
            icon: 'success',
            title: 'Inscrito correctamente',
            showConfirmButton: false,
            timer: 5000
          });
          //this.getInscriptions();
          this.inscriptionForm.reset();
          this.router.navigate(['/inscription']);
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

  updateInscription():void {
    Swal.fire('Un momento...');
    Swal.showLoading();

    this.inscriptionService.updateInscription(this.inscriptionForm.value,this.inscription_uuid).subscribe(() => {
        Swal.hideLoading();
          Swal.fire({
            icon: 'success',
            title: 'Incripción actualizada',
            showConfirmButton: false,
            timer: 5000
          });
          //this.getInscriptions();
          this.inscriptionForm.reset();
          this.router.navigate(['/inscription']);
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
}
