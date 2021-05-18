export interface Customer {
  id?: number;
  name: string;
  father_lastname: string;
  mother_lastname: string;
  rfc: string;
  email: string;
  telephone: string;
  fiscal_name: string;
  contact?: string;
  longitude: number;
  latitude: number;
  created_at?: Date;
  updated_at?: Date;
}
