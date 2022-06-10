import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { School } from '../api/school';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getTests(): Observable<any> {
    return this.http.get<any>('api/Tests').pipe(
      tap((_) => this.log('fetched tests')),
      catchError(this.handleError<any>('getTests', []))
    );
  }

  getProductsSmall() {
    return this.http
      .get<any>('assets/demo/data/products-small.json')
      .toPromise()
      .then((res) => res.data as School[])
      .then((data) => data);
  }

  getProducts() {
    // console.log('getProducts');
    // return this.http.get<any>('assets/demo/data/products.json').pipe(
    //   tap((_) => this.log('fetched products')),
    //   catchError(this.handleError<School[]>('getProducts', []))
    // );
    return this.http
      .get<any>('assets/demo/data/products.json')
      .toPromise()
      .then((res) => res.data as School[])
      .then((data) => data);
  }

  getProductsMixed() {
    return this.http
      .get<any>('assets/demo/data/products-mixed.json')
      .toPromise()
      .then((res) => res.data as School[])
      .then((data) => data);
  }

  getProductsWithOrdersSmall() {
    return this.http
      .get<any>('assets/demo/data/products-orders-small.json')
      .toPromise()
      .then((res) => res.data as School[])
      .then((data) => data);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`SchoolService: ${message}`);
  }
}
