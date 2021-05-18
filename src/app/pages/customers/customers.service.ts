import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/shared/models/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  index() {
    return this.http.get(`${environment.api_url}/customer`);
  }

  store(customer: Customer) {
    return this.http.post(`${environment.api_url}/customer`, customer);
  }

  show(id: string) {
    return this.http.get<Customer[]>(`${environment.api_url}/customer/${id}`);
  }

  update(id: string, customer: Customer) {
    return this.http.put(`${environment.api_url}/customer/${id}`, customer);
  }

  destroy(id: string) {
    return this.http.delete(`${environment.api_url}/customer/${id}`);
  }
}
