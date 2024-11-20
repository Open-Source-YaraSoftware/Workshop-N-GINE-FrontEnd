import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mechanic } from '../../model/mechanic.entity';
import {PersonnelItemComponent} from "../personnel-item/personnel-item.component";
import {NgForOf} from "@angular/common";
import {Profile} from "../../../profiles/model/profile.entity";

@Component({
  selector: 'app-personnel-list',
  templateUrl: './personnel-list.component.html',
  styleUrls: ['./personnel-list.component.css'],
  imports: [
    PersonnelItemComponent,
    NgForOf
  ],
  standalone: true
})
export class PersonnelListComponent {
  @Input() mechanics: Profile[] = [];
  @Output() editMechanic = new EventEmitter<Profile>();

  selectMechanic(mechanic: Profile): void {
    this.editMechanic.emit(mechanic);
  }
}
