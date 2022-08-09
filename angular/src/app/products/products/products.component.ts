
import { ProductsService } from './../services/products.service';
import { Product } from './../model/product';
import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { __values } from 'tslib';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Observable<Product[]>
  public displayedColumns = ['name', 'barCode', 'price']

  @ViewChild('inputName', {static:false}) inputName!: ElementRef;
  @ViewChild('inputBarCode', {static:false}) inputBarCode!: ElementRef;
  @ViewChild('inputPrice', {static:false}) inputPrice!: ElementRef;
  @ViewChild('inputSelect', {static:false}) inputSelect!: MatOption;
  @ViewChild('inputSearch', {static:false}) inputSearch!: ElementRef


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
    let barCode: string = ((document.getElementById('inputRemoveBarCode') as HTMLInputElement).value)
    window.alert(barCode)
    this.productService.delete(barCode)
  }

  updateProduct(){
    let barCode: string = ((document.getElementById('inputRemoveBarCode') as HTMLInputElement).value)
    let product = this.getProduct();

    if(product === null){
      window.alert('Valores inválidos')
    }else{
      this.productService.put(barCode, product)
    }

  }

  searchProduct(){
    this.inputSelect.value = 'view'
    this.changeFormMode()

    this.productService.findByBarCode(this.inputSearch.nativeElement.value)
    .subscribe(products => {
        this.setView(products)
    })
  }

  changeFormMode(){
    switch(this.inputSelect.value){
      case "create":
        this.changeFormToCreateMode()
        break
      case "update":
        this.changeFormToCreateMode()
        break
      case "view":
        this.changeFormToViewMode()
        break
    }
  }

  private getProduct(){
    let name:string = this.inputName.nativeElement.value
    let barCode:string = this.inputBarCode.nativeElement.value
    let price:number = (Number)(this.inputPrice.nativeElement.value)

    if(name !== '' && barCode !== '' && price > 0){
      let product: Product= {name: name, barCode: barCode, price: price}
      return product
    }else{
      return null
    }
  }

  private changeFormToViewMode(){
    this.inputName.nativeElement.disabled = true;
    this.inputBarCode.nativeElement.disabled = true;
    this.inputPrice.nativeElement.disabled = true;
  }

  private changeFormToCreateMode(){
    this.inputName.nativeElement.disabled = false;
    this.inputBarCode.nativeElement.disabled = false;
    this.inputPrice.nativeElement.disabled = false;
  }

  private setView(product:Product){
    this.inputName.nativeElement.value = product.name
    this.inputBarCode.nativeElement.value = product.barCode
    this.inputPrice.nativeElement.value = product.price
  }
}
