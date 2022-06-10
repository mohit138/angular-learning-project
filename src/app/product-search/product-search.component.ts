import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Product } from 'src/app/app.product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  products$! : Observable<Product[]>;
  private searchTerms = new Subject<string>();
  
  constructor(private productService: ProductService, private router: Router) { }

  search(term:string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.products$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.productService.searchProducts(term)),
    );
  }

  updateDisplayOnSearchSelect(product: Product){
    
    this.productService.selectedProduct = product;
    this.productService.onSearchSelect();
    this.router.navigateByUrl("/products")
    this.search("");
  }

}
