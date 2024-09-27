import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Task} from "../model/task.entity";

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService<Task> {

  constructor() {
    super();
    this.resourceEndpoint = '/tasks';
  }
}
