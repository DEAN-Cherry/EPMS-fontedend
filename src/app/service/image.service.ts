import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  getImages(): Observable<any> {
    return this.http.get<any>('api/Images').pipe(
      tap((_) => this.log('后端操作：fetched images')),
      catchError(this.handleError<any>('getImages', []))
    );
  }

  uploadImage(uploadFile: any, imageType: number): Observable<any> {
    const formData = new FormData();
    formData.append('files', uploadFile);
    return this.http.post('api/Images?imageType=' + imageType, formData);
  }

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

  private log(message: string) {
    console.log(`SchoolService: ${message}`);
  }
}
