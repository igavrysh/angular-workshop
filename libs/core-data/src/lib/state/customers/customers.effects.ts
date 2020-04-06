import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';

import { CustomersState } from './customers.reducer';
import { CustomersService } from '../../customers/customers.service';
import { CustomersActionTypes, LoadCustomers, CustomersLoaded } from './customers.actions';
import { Customer } from '../../customers/customer.model';

@Injectable()
export class CustomersEffects {
  @Effect()
  loadCustomers$ = this.dataPersistence.fetch(
    CustomersActionTypes.LoadCustomers, 
    {
      run: (action: LoadCustomers, state: CustomersState) => {
        return this.customersService.all().pipe(
          map((res: Customer[]) => new CustomersLoaded(res))
        )
      },
      onError: (action: LoadCustomers, error) => {
        console.error('Error', error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<CustomersState>,
    private customersService: CustomersService
  ) {}
}