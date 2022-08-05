import { ProductsService } from './../services/products.service';
import { Product } from './../model/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Product[]
  public displayedColumns = ['id', 'name', 'barCode', 'price']

  constructor(private productService: ProductsService) { 
    this.products = productService.findAll()
  }

  ngOnInit(): void {
  }

}
