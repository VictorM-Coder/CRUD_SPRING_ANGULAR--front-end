
import { Product } from './../model/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, take } from 'rxjs';

const URL:string = 'http://localhost:8080/api/product'
@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private httpClient: HttpClient) {

  }

  findAll() {
    return this.httpClient.get<Product[]>(URL + '/products')
  }

  post(product: Product){
    console.log(product)
    return this.httpClient.post<Product>(`http://localhost:8080/api/product`, product)
  }

  delete(barCode:String){
    console.log(URL + `/remove/barCode/${barCode}`)
    return this.httpClient.delete<Product>(URL + `/remove/barCode/${barCode}`, {}).subscribe(data =>
      console.log(data))
  }

}
