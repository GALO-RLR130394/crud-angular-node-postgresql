import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Inscription } from '../models/inscription';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private httpService: HttpClient) { }

   public createInscription(inscription: Inscription): Observable<Inscription> {

    return this.httpService.post(`${environment.api_url}/inscription/`, inscription).pipe(
      map((data: any) => new Inscription().deserialize(data)),
      catchError(this.handleError)
    );
  }

  public getInscriptions(): Observable<Inscription[]> {

    return this.httpService.get<Inscription[]>(`${environment.api_url}/inscription/`).pipe(
      map((request: any[]) => {
        return request.map((inscription: any) => new Inscription().deserialize(inscription));
      }),
      catchError(this.handleError)
    );
  }

  public getInscriptionById(id: string): Observable<Inscription> {

    return this.httpService.get<Inscription>(`${environment.api_url}/inscription/${id}`).pipe(
      map((data: any) => new Inscription().deserialize(data)),
      catchError(this.handleError)
    );
  }

  public updateInscription(inscription: Inscription,uuid:any): Observable<Inscription> {

    return this.httpService.put(`${environment.api_url}/inscription/${uuid}`, inscription).pipe(
      map((data: any) => new Inscription().deserialize(data)),
      catchError(this.handleError)
    );
  }

  public deleteInscription(id: string): Observable<Inscription> {

    return this.httpService.delete<Inscription>(`${environment.api_url}/inscription/${id}`).pipe(
      map((data: any) => new Inscription().deserialize(data)),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage: any = {};

    if (err.error instanceof ErrorEvent) {
      errorMessage = {
        message: `An error occurred: ${err.error.message}`,
        code: err.status
      };
    } else {
      errorMessage = {
        message: err
      };
    }
    return throwError(errorMessage);
  }

}
