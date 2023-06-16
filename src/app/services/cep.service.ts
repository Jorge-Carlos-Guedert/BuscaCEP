import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) {}

  localizaCEP(cod: string) {
    const url = `https://viacep.com.br/ws/${cod}/json/`;

    const header = {
      headers: new HttpHeaders().set('Content-Type', 'aplication/json'),
    };

    return this.http.get(url, header);
  }
}



