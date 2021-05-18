import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';
import { CustomerFormModule } from 'src/app/shared/components/customer-form/customer-form.module';

@NgModule({
  declarations: [NewComponent],
  imports: [CommonModule, NewRoutingModule, CustomerFormModule],
})
export class NewModule {}
