import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from 'src/app/pages/customers/customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  customerForm!: FormGroup;
  activeID: string;

  lat!: string;
  lng!: string;

  title!: string;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomersService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activeID = this.activedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.initForm();
    if (this.activeID) {
      this.customerService.show(this.activeID).subscribe((res) => {
        this.customerForm.patchValue(res[0]);
        this.lat = this.customerForm.value.latitude;
        this.lng = this.customerForm.value.longitude;
        this.title = 'Editar cliente';
      });
    } else {
      this.lat = '21.1236';
      this.lng = '-101.68';
      this.customerForm.patchValue({
        latitude: '21.1236',
        longitude: '-101.68',
      });
      this.title = 'Crear cliente';
    }
  }

  private initForm(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      father_lastname: ['', [Validators.required]],
      mother_lastname: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      telephone: ['', [Validators.maxLength(14)]],
      fiscal_name: ['', [Validators.required]],
      rfc: ['', [Validators.maxLength(13)]],
      contact: '',
      longitude: [
        '',
        [Validators.required, Validators.min(-180), Validators.max(180)],
      ],
      latitude: [
        '',
        [Validators.required, Validators.min(-90), Validators.max(90)],
      ],
    });
  }

  storage(): void {
    this.customerForm.markAllAsTouched();
    this.customerForm.valid
      ? this.activeID
        ? this.customerService
            .update(this.activeID, this.customerForm.value)
            .subscribe((res) => {
              Swal.fire(
                'Actualizado!',
                'El registro ha sido actualizado',
                'success'
              ).then(() => {
                this.router.navigate(['/list']);
              });
            })
        : this.customerService
            .store(this.customerForm.value)
            .subscribe((res) => {
              Swal.fire(
                'Almacenado!',
                'El registro ha sido almacenado',
                'success'
              ).then(() => {
                this.router.navigate(['/list']);
              });
            })
      : Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El formulario no es válido',
        });
  }

  destroy(id: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podras revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.destroy(id).subscribe((res) => {
          Swal.fire('¡Eliminado!', 'El registro ha sido eliminado', 'success');
          this.router.navigate(['/list']);
        });
      }
    });
  }

  setNewCords(cords: any) {
    this.customerForm.patchValue({ latitude: cords[0], longitude: cords[1] });
  }
}
