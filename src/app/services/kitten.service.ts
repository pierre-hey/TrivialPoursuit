import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class KittenService {
  baseUrlCataas: string = 'https://cataas.com';

  constructor(private http: HttpClient) { }


  getCat2(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrlCataas + '/cat?json=true').subscribe({
        next: (data: any) => {
          resolve(this.baseUrlCataas + data.url);
        }, error: (err) => {
          reject('Error : ' + err);
        }
      });
    });
  }
}
