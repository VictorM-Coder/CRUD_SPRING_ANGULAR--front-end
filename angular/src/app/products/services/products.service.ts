
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
    return this.httpClient.post<Product>(URL, product)
  }

  delete(id:number){
    return this.httpClient.delete(URL + `/remove/${id}`)
  }

}
