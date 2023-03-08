import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, switchMap, throwError, of} from "rxjs";
import {ProfileInterface} from "../interfaces/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class Mir4CollectionService {

  api_url = 'https://mir4collection.com:8000/api/players'
  constructor(
    private httpClient: HttpClient
  ) { }


  getProfileData(ign: string): Observable<ProfileInterface> {
    const url = `${this.api_url}/profile/${ign}`;
    return this.httpClient.get(url)
      .pipe(
        switchMap((res: {status, profile}) => {
          if (res.status === 'error') {
            return throwError(res)
          }

          return of(res)
        }),
        map((res: any) => {
          return res.player
        })
      );
  }
}
