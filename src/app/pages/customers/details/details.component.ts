import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/shared/models/customer';
import { CustomersService } from '../customers.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  customer!: Customer;
  activeID: string;

  constructor(
    private customerService: CustomersService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.activeID = this.activedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.activeID
      ? this.customerService.show(this.activeID).subscribe((res) => {
          this.customer = res[0];
        })
      : null;
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

  exportPDF() {
    var data = document.getElementById('card-details')!;
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf');
    });
  }
}
