import { Product } from './../model/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private httpClient: HttpClient) { 

  }
  
  findAll(): Product[] {
    return [
      {id: 1, name: "notebook", barCode: "123345667", price: 12.3}
    ]
  }
  
}
