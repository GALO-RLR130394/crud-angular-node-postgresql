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

import * as _moment from 'moment';

const moment = _moment;

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
    cost:new FormControl({value:0,disabled:true},Validators.required)
  });
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private inscriptionService:InscriptionService
  ) { }

  ngOnInit(): void {
    this.inscription_uuid= this.route.snapshot.paramMap.get('id');
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
            age:inscription.age,
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

  calculateCost(): void {
    let a1 = moment();
    let b1 = moment(this.inscriptionForm.controls.inscription_date.value);
    let time=a1.diff(b1, 'years');
    let cost=time*100;
    this.inscriptionForm.controls.cost.setValue(cost);
  }

  createInscription():void {
    //VALIDATE
    let a = moment();
    let b = moment(this.inscriptionForm.controls.birthday.value);
    let age=a.diff(b, 'years');

    let isAfter=moment(this.inscriptionForm.controls.inscription_date.value)
        .isAfter(this.inscriptionForm.controls.birthday.value); // true

    let firstname=this.inscriptionForm.controls.firstname.value;
    let lastname=this.inscriptionForm.controls.lastname.value;

    /*console.log(isAfter) // 1
    console.log('age:',age) // 1
    console.log(this.inscriptionForm.controls.age.value)*/
    
    if(firstname.length<4 || lastname.length<4){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre o apelllido son demasiado cortos (mínimo 4 carácteres)'
      });
    }else if(!isAfter){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La fecha de inscripción tiene que ser mayor que la fecha de nacimiento'
      });
    }else if(age<18){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La edad mínima debe ser 18 años'
      });
    }else if(parseInt(this.inscriptionForm.controls.age.value)!==age){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La edad no coincide con la fecha de nacimiento'
      });
    }else{

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
        this.inscriptionForm.reset();
        this.router.navigate(['/inscription']);
      },(error: any) => {
        Swal.hideLoading();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });
      });
    };
  }

  updateInscription():void {
    
    let cost=this.inscriptionForm.controls.cost.value;
    console.log('cost:',cost)
    this.inscriptionForm.controls.cost.enable();
    //this.inscriptionForm.controls.cost.setValue(cost);
    //VALIDATE
    let a = moment();
    let b = moment(this.inscriptionForm.controls.birthday.value);
    let age=a.diff(b, 'years');

    let isAfter=moment(this.inscriptionForm.controls.inscription_date.value)
        .isAfter(this.inscriptionForm.controls.birthday.value); // true

    let firstname=this.inscriptionForm.controls.firstname.value;
    let lastname=this.inscriptionForm.controls.lastname.value;

    /*console.log(isAfter) // 1
    console.log('age:',age) // 1
    console.log(this.inscriptionForm.controls.age.value)*/
    
    if(firstname.length<4 || lastname.length<4){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre o apelllido son demasiado cortos (mínimo 4 carácteres)'
      });
    }else if(!isAfter){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La fecha de inscripción tiene que ser mayor que la fecha de nacimiento'
      });
    }else if(age<18){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La edad mínima debe ser 18 años'
      });
    }else if(parseInt(this.inscriptionForm.controls.age.value)!==age){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La edad no coincide con la fecha de nacimiento'
      });
    }else{
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
        this.inscriptionForm.reset();
        this.router.navigate(['/inscription']);
      },(error: any) => {
        this.inscriptionForm.controls.cost.disable();
        Swal.hideLoading();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });
      });
    };
  }
}
