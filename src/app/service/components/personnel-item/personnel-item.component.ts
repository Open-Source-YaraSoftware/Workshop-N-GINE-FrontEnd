import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatCard, MatCardAvatar, MatCardContent, MatCardHeader } from '@angular/material/card';
import { Profile } from '../../../profiles/model/profile.entity';

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
  @Input() mechanic!: Profile;
  @Output() selectMechanic = new EventEmitter<Profile>();

  constructor(private sanitizer: DomSanitizer) {}

  get sanitizedImageUrl(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('https://xsgames.co/randomusers/avatar.php?g=male');
  }

  onCardClick(): void {
    this.selectMechanic.emit(this.mechanic);
  }
}
