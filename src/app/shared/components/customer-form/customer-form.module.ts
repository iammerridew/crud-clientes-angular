import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerFormComponent } from './customer-form.component';
import { RouterModule } from '@angular/router';
import { HereMapModule } from '../here-map/here-map.module';

@NgModule({
  declarations: [CustomerFormComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HereMapModule],
  exports: [CustomerFormComponent],
})
export class CustomerFormModule {}
