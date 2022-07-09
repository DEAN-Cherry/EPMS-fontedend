import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { School } from '../api/school';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private http: HttpClient) {}

  getSchools(): Observable<any> {
    return this.http.get<any>('https://localhost:5200/api/Schools').pipe(
      tap((_) => this.log('数据库连接测试：fetched schools')),
      catchError(this.handleError<any>('getSchools', []))
    );
  }

  createSchool(school: School): Observable<any> {
    return this.http.post<any>('api/Schools', school).pipe(
      tap((_) => this.log('更新数据库：created school')),
      catchError(this.handleError<any>('createSchool'))
    );
  }

  updateSchool(school: School): Observable<any> {
    return this.http.put<any>('api/Schools/' + school.id, school).pipe(
      tap((_) => this.log('更新数据库：updated school')),
      catchError(this.handleError<any>('updateSchool'))
    );
  }

  deleteSchool(id: number): Observable<any> {
    return this.http.delete<any>('api/Schools/' + id).pipe(
      tap((_) => this.log('更新数据库：deleted school')),
      catchError(this.handleError<any>('deleteSchool'))
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
