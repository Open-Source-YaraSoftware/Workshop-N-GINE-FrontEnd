import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mechanic } from '../../model/mechanic.entity';
import {PersonnelItemComponent} from "../personnel-item/personnel-item.component";
import {NgForOf} from "@angular/common";

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
  @Input() mechanics: Mechanic[] = [];
  @Output() editMechanic = new EventEmitter<Mechanic>();

  selectMechanic(mechanic: Mechanic): void {
    this.editMechanic.emit(mechanic);
  }
}
