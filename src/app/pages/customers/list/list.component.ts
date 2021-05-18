import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/shared/models/customer';
import { CustomersService } from '../customers.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  customers!: Customer[];

  constructor(
    private router: Router,
    private customerService: CustomersService
  ) {}

  ngOnInit(): void {
    this.index();
  }

  index(): void {
    this.customerService
      .index()
      .subscribe((res) => (this.customers = <any>res));
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
          Swal.fire(
            '¡Eliminado!',
            'El registro ha sido eliminado',
            'success'
          ).then(() => {
            this.index();
          });
        });
      }
    });
  }

  exportExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.customers);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'customer-list.xlsx');
  }
}
