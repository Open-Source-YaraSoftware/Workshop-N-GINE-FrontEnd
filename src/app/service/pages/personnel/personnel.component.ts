import { Component, computed, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from '../../../profiles/model/profile.entity';
import { ProfileService } from '../../../profiles/services/profile.service';
import { WorkshopService } from '../../services/workshop.service';
import { NewMechanicDialogComponent } from '../../components/new-mechanic-dialog/new-mechanic-dialog.component';
import { JsonPipe, NgIf } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { PersonnelListComponent } from '../../components/personnel-list/personnel-list.component';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css'],
  standalone: true,
  imports: [
    NgIf,
    MatLabel,
    MatFormField,
    MatInput,
    FormsModule,
    MatIcon,
    MatButton,
    PersonnelListComponent,
    JsonPipe
  ]
})
export class PersonnelComponent implements OnInit {
  isModalOpen = false;
  selectedMechanic: Profile | null = null;
  mechanics = signal<Profile[]>([]);
  searchQuery = signal('');
  noMechanics = signal(false);

  filteredMechanics = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.mechanics().filter(mechanic =>
      (mechanic.firstName?.toLowerCase().includes(query) || '') ||
      (mechanic.lastName?.toLowerCase().includes(query) || '') ||
      mechanic.dni.toString().includes(query) ||
      (mechanic.email?.toLowerCase().includes(query) || '')
    );
  });

  constructor(
    private profileService: ProfileService,
    private workshopService: WorkshopService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchMechanics();
  }

  fetchMechanics(): void {
    this.workshopService.getMechanicsIdsByWorkshopId(1).subscribe({
      next: (ids: number[]) => {
        if (ids.length === 0) {
          this.noMechanics.set(true);
          return;
        }
        this.loadProfiles(ids);
      },
      error: (err) => console.error('Error fetching mechanics IDs:', err)
    });
  }

  loadProfiles(ids: number[]): void {
    const profileRequests = ids.map(id =>
      this.profileService.getProfileById(id).toPromise()
    );
    Promise.all(profileRequests).then(profiles => {
      this.mechanics.set(profiles as Profile[]);
      this.noMechanics.set(profiles.length === 0);
    }).catch(error => {
      console.error('Error loading profiles:', error);
      this.noMechanics.set(true);
    });
  }

  openCreateModal(): void {
    this.selectedMechanic = null;
    const dialogRef = this.dialog.open(NewMechanicDialogComponent, {
      data: { mechanic: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createMechanic(result);
      }
    });
  }

  openUpdateModal(mechanic: Profile): void {
    this.selectedMechanic = mechanic;
    const dialogRef = this.dialog.open(NewMechanicDialogComponent, {
      data: { mechanic: mechanic }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateMechanic(result);
      }
    });
  }

  createMechanic(newMechanic: Profile): void {
    this.workshopService.postMechanicByWorkshopId(1, newMechanic).subscribe({
      next: (response: Profile) => this.mechanics.set([response, ...this.mechanics()]),
      error: (error) => console.error('Error creating mechanic:', error)
    });
  }

  updateMechanic(updatedMechanic: Profile): void {
    this.profileService.putProfile(updatedMechanic.id, updatedMechanic).subscribe({
      next: () => {
        const index = this.mechanics().findIndex(m => m.id === updatedMechanic.id);
        if (index !== -1) {
          const updatedMechanics = [...this.mechanics()];
          updatedMechanics[index] = updatedMechanic;
          this.mechanics.set(updatedMechanics);
        }
      },
      error: (error) => console.error('Error updating mechanic:', error)
    });
  }
}
