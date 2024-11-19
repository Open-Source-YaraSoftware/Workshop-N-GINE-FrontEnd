import {Injectable} from "@angular/core";
import {BaseService} from "../../shared/services/base.service";
import {Mechanic} from "../../service/model/mechanic.entity";
import {Profile} from "../model/profile.entity";

@Injectable({
  providedIn: 'root'
})

export class ProfileService extends BaseService<Profile> {
  constructor() {
    super();
    this.resourceEndpoint = '/profiles';
  }

  getProfileByUserId(userId: number) {
    return this.http.get(`/profiles?userId=${userId}`);
  }

  getByDNI(dni: number) {
    return this.http.get(`/profiles?dni=${dni}`);
  }

  getProfileById(profileId: number) {
    return this.http.get<Profile>(`/profiles/${profileId}`);
  }

  postProfile(data: any) {
    return this.http.post('/profiles', data);
  }

  putProfile(id: number, data: any) {
    return this.http.put(`/profiles/${id}`, data);
  }
}
