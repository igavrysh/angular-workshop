import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxModule } from '@nrwl/nx';
import { StoreModule } from '@ngrx/store';
import { reducers } from '.';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects';
import { ProjectsEffects } from './projects/projects.effects';
import { CustomersEffects } from './customers/customers.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NxModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
    EffectsModule.forRoot([
      CustomersEffects,
      ProjectsEffects
    ])
  ]
})
export class StateModule { }
