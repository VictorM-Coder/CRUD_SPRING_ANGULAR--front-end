
import { ProductsService } from './../services/products.service';
import { Product } from './../model/product';
import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, take, tap } from 'rxjs';
import { __values } from 'tslib';
import { CdkTable } from '@angular/cdk/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Observable<Product[]>
  public displayedColumns = ['name', 'barCode', 'price']
  horizontalPosition: MatSnackBarHorizontalPosition = 'start'
  verticalPosition: MatSnackBarVerticalPosition = 'top'

  @ViewChild('inputName', {static:false}) inputName!: ElementRef;
  @ViewChild('inputBarCode', {static:false}) inputBarCode!: ElementRef;
  @ViewChild('inputPrice', {static:false}) inputPrice!: ElementRef;
  @ViewChild('inputSelect', {static:false}) inputSelect!: ElementRef;
  @ViewChild('inputSearch', {static:false}) inputSearch!: ElementRef
  @ViewChild('cdkTable', {static:false}) cdkTable!: CdkTable<Product>

  constructor(private productService: ProductsService, private _snackBar: MatSnackBar) {
    this.products = productService.findAll()
  }

  ngOnInit(): void {
  }

  postProduct(){
    let product:Product | null = this.getProduct()

    if(product === null){
      this.showSnackBar("Valores inválidos", "snack-error")
    }else{
      this.productService.post(product).subscribe({
        next: (v) => console.info('complete'),
        error: (e) => this.showSnackBar("Falha ao adicionar produto", "snack-error"),
        complete: () =>{
          this.showSnackBar("Produto adicionado com sucesso", "snack-success")
          this.updateTable()
        }
      })
    }
  }

  removeProduct(){
    let barCode: string = ((document.getElementById('inputRemoveBarCode') as HTMLInputElement).value)
    this.productService.delete(barCode).subscribe({
      next: () => console.info('complete'),
      error: () => this.showSnackBar("Falha ao remover produto", "snack-error"),
      complete: () => {
        this.showSnackBar("Produto removido com sucesso", "snack-success")
        this.updateTable()
      }

    })
  }

  updateProduct(){
    let barCode: string = ((document.getElementById('inputRemoveBarCode') as HTMLInputElement).value)
    let product = this.getProduct();

    if(product === null){
      this.showSnackBar("Valores inválidos para produto", "snack-error")
    }else{
      this.productService.put(barCode, product).subscribe({
        next: () => console.info('complete'),
        error: () => this.showSnackBar("Falha ao atualizar o produto", "snack-error"),
        complete: () => {
          this.showSnackBar("Produto atualizado com sucesso", "snack-success")
          this.updateTable()
        }
      })
    }

  }

  searchProduct(){
    this.inputSelect.nativeElement.value = 'view'
    this.changeFormMode()

    this.productService.findByBarCode(this.inputSearch.nativeElement.value)
    .subscribe(products => {
        this.setView(products)
    })
  }

  changeFormMode(){
    switch(this.inputSelect.nativeElement.value){
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
    this.inputPrice.nativeElement.value = String(product.price)
  }

  private showSnackBar(text: string, classType: string){
    this._snackBar.open(text, 'Close', {
      duration: 5000,
      panelClass:["snack", classType]
    })
  }

  private updateTable(){
    this.products = this.productService.findAll()
    this.cdkTable.renderRows()
  }
}
