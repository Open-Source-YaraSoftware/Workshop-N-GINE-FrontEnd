import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonnelService } from '../../../service/services/personnel.service';
import { WorkshopClientService } from '../../../crm/services/workshop-client.service';
import { Mechanic } from '../../../service/model/mechanic.entity';
import { WorkshopClient } from '../../../crm/model/workshop-client.entity';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrls: ['./profile.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class ProfileComponent implements OnInit {
  profileData: Mechanic | WorkshopClient | null = null;
  isEditing = false;
  activeTab = 'personal';
  isMechanic = false;

  constructor(
    private route: ActivatedRoute,
    private personnelService: PersonnelService,
    private workshopClientService: WorkshopClientService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convert to number
      this.isMechanic = this.route.snapshot.data['isMechanic'];
      this.loadProfileData(id);
    });
  }

  loadProfileData(id: number) {
    if (this.isMechanic) {
      this.personnelService.getMechanicById(id).subscribe(
        mechanic => this.profileData = mechanic,
        error => console.error('Error loading mechanic profile:', error)
      );
    } else {
      this.workshopClientService.getById(id).subscribe(
        client => this.profileData = client,
        error => console.error('Error loading client profile:', error)
      );
    }
  }

  saveChanges() {
    if (!this.profileData) return;

    if (this.isMechanic) {
      this.personnelService.putMechanic(this.profileData).subscribe(
        updatedMechanic => {
          this.profileData = updatedMechanic;
          this.isEditing = false;
        },
        error => console.error('Error updating mechanic profile:', error)
      );
    } else {
      this.workshopClientService.update(this.profileData.id, this.profileData).subscribe(
        updatedClient => {
          this.profileData = updatedClient;
          this.isEditing = false;
        },
        error => console.error('Error updating client profile:', error)
      );
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}