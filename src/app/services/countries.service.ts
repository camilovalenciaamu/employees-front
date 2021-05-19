import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  public getCountries() {
    return this.http.get<any>('https://restcountries.eu/rest/v2/all');
  }
}
