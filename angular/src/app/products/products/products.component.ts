
import { ProductsService } from './../services/products.service';
import { Product } from './../model/product';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Observable<Product[]>
  public displayedColumns = ['id', 'name', 'barCode', 'price']

  constructor(private productService: ProductsService) {
    this.products = productService.findAll()
  }

  ngOnInit(): void {
  }

  postProduct(){
    let product:Product | null = this.getProduct()

    if(product === null){
      window.alert('Valores inválidos!')
    }else{
      this.productService.post(product).subscribe(
        result => console.log(result),
        error => window.alert('falha ao salvar produto')
      )
    }
  }

  removeProduct(){

  }

  private getProduct(){
    let name:string = ((document.getElementById('inputName') as HTMLInputElement).value)
    let barCode:string = ((document.getElementById('inputBarCode') as HTMLInputElement).value)
    let price:number = (Number)((document.getElementById('inputPrice') as HTMLInputElement).value)

    if(name !== '' && barCode !== '' && price > 0){
      let product: Product= {name: name, barCode: barCode, price: price}
      return product
    }else{
      return null
    }
  }
}
