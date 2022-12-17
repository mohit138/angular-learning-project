import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { FLAVOURS, GRINDS, PRODUCTS } from './app.mock-products';
import { Product } from './app.product';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // private productsUrl = 'api/products';
  // private flavoursUrl = 'api/flavours';
  // private grindsUrl = 'api/grinds';

  // will have to modify for new deployments
  private productsUrl = 'https://coffee-store-backend.herokuapp.com/products';
  private flavoursUrl = 'https://coffee-store-backend.herokuapp.com/flavours';
  private grindsUrl = 'https://coffee-store-backend.herokuapp.com/grinds';
  
  invokeProductOnSearchSelectFunction = new EventEmitter();
  subsVar?: Subscription;
  selectedProduct?: Product;

  constructor(
    private http: HttpClient
  ) { }

  onSearchSelect() {
    this.invokeProductOnSearchSelectFunction.emit();
  }

  log(e: string){
    // can use a service here, or some other method to, display error on the users interfact.
    console.log(e);
  }

  getProducts(): Observable<Product[]>{
    // const products = of(PRODUCTS);
    // return products;
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(_ => this.log('fetched products')),
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?:T){
    return (error:any): Observable<T> => {
      // CAN SEND THE ERROR TO THE REMOTE LOGGING INFRASTRUCTURE
      console.error(error);

      // CAN TRANSFORM THE ERROR FOR USER CONSUMPTION
      this.log(`${operation} failed: ${error.message}`);

      // return of(result as T);
      return throwError(() => {});
    };
  }

  getFlavours(): Observable<string[]>{
    return this.http.get<string[]>(this.flavoursUrl)
      .pipe(
        tap(_ => this.log('fetched flavours')),
        catchError(this.handleError<string[]>('getFlavours',[]))
      );
  }

  getGrinds(): Observable<string[]>{
    return this.http.get<string[]>(this.grindsUrl)
      .pipe(
        tap(_ => this.log('fetched grinds')),
        catchError(this.handleError<string[]>('getGrinds',[]))
      );
  }

  searchProducts(term: string): Observable<Product[]> {
    if(!term.trim()){
      return of([]);
    }

    return this.http.get<Product[]>(`${this.productsUrl}/search/?name=${term}`).pipe(
      tap(x => x.length?
        this.log(`found products matching "${term}"`) :
        this.log(`no of products matchinf "${term}"`)),
      catchError(this.handleError<Product[]>('searchProducts',[]))
    );
  }

  // Post to Backend
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product)
      .pipe(
        catchError(this.handleError('addProduct', product))
      );
  }

  deleteProduct(id: number): Observable<unknown> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError('deleteProduct'))
      );
  }

  updateProduct(product:Product): Observable<Product> {
    return this.http.put<Product>(`${this.productsUrl}/${product.id}`, product)
      .pipe(
        catchError(this.handleError('updateProduct',product))
      );
  }

}
