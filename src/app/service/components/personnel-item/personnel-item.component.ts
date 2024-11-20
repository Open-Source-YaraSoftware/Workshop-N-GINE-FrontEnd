import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mechanic } from '../../model/mechanic.entity';
import { MatCard, MatCardAvatar, MatCardContent, MatCardHeader } from '@angular/material/card';
import {Profile} from "../../../profiles/model/profile.entity";

@Component({
  selector: 'app-personnel-item',
  templateUrl: './personnel-item.component.html',
  styleUrls: ['./personnel-item.component.css'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    MatCardContent
  ],
  standalone: true
})
export class PersonnelItemComponent {
  // Removed default initialization; mechanic will be provided by parent via Input.
  @Input() mechanic!: Profile;

  @Output() selectMechanic = new EventEmitter<Profile>();

  onCardClick(): void {
    this.selectMechanic.emit(this.mechanic);
  }
}
