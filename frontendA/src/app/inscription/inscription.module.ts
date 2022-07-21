import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modules
import { SharedModule } from '../shared/shared.module';
import { InscriptionRoutingModule } from './inscription-routing.module';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { InscriptionListComponent } from './inscription-list/inscription-list.component';


@NgModule({
  declarations: [
    CreateComponent,
    IndexComponent,
    InscriptionListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InscriptionRoutingModule
  ]
})
export class InscriptionModule { }
