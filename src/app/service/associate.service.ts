import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Associate } from '../store/associate/associate.model';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {

  baseUrl = 'http://localhost:3000/associate';
  constructor(private httpClient: HttpClient) { }

  Get() {
    return this.httpClient.get<Associate[]>(this.baseUrl);
  }

  GetByCode(code: number) {
    return this.httpClient.get<Associate>(this.baseUrl + '/' + code);
  }

  Delete(code: number) {
    return this.httpClient.delete(this.baseUrl + '/' + code);
  }

  Update(data: Associate) {
    return this.httpClient.put(this.baseUrl + '/' + data.id, data);
  }

  Create(data: Associate) {
    return this.httpClient.post(this.baseUrl, data);
  }
}
