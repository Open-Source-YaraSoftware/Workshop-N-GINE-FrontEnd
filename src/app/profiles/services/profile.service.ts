import {Injectable} from "@angular/core";
import {BaseService} from "../../shared/services/base.service";
import {Mechanic} from "../../service/model/mechanic.entity";
import {Profile} from "../model/profile.entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProfileService extends BaseService<Profile> {
  constructor() {
    super();
    this.resourceEndpoint = '/profiles';
  }

  getProfileByUserId(userId: number):Observable<Profile> {
    console.log()
    return this.http.get<Profile>(`${this.resourcePath()}?userId=${userId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getByDNI(dni: number):Observable<Profile> {
    return this.http.get<Profile>(`${this.resourcePath()}?dni=${dni}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getProfileById(profileId: number) {
    return this.http.get(`${this.resourcePath()}/${profileId}`);
  }

  postProfile(data: any) {
    return this.http.post(`${this.resourcePath()}`, data);
  }

  putProfile(id: number, data: any) {
    return this.http.put(`${this.resourcePath()}/${id}`, data);
  }
}
