import {Component, computed, OnInit, signal} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewMechanicDialogComponent } from '../../components/new-mechanic-dialog/new-mechanic-dialog.component';
import { NgIf } from '@angular/common';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PersonnelListComponent } from '../../components/personnel-list/personnel-list.component';
import {Profile} from "../../../profiles/model/profile.entity";
import {ProfileService} from "../../../profiles/services/profile.service";
import {WorkshopService} from "../../services/workshop.service";

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css'],
  imports: [
    NgIf,
    MatFormField,
    MatInput,
    FormsModule,
    MatIconButton,
    MatIcon,
    PersonnelListComponent,
    MatButton,
    MatLabel
  ],
  standalone: true
})
export class PersonnelComponent implements OnInit {
  isModalOpen = false;
  selectedMechanic: Profile | null = null;
  filteredMechanics = computed<Profile[]>(() => {
    const filter = this.searchQuery().toLowerCase();
    return this.mechanics().filter(
      mechanic =>
        mechanic.firstName.toLowerCase().includes(filter)
        || mechanic.lastName.toLowerCase().includes(filter)
        || mechanic.dni.toString().includes(filter)
        || mechanic.email.toLowerCase().includes(filter));
  });
  mechanics = signal<Profile[]>([]);
  noMechanics = false;
  searchQuery = signal('');



  constructor( private profileService: ProfileService, private workshopService: WorkshopService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPersonnel();
  }

  getPersonnel(): void {
    this.workshopService.getMechanicsIdsByWorkshopId(1).subscribe({
      next: (mechanicIds: number[]) => {
        if (mechanicIds.length === 0) {
          this.noMechanics = true;
          return;
        }
        mechanicIds.forEach((id: number) => {
          /*this.profileService.getProfileById(id).subscribe({
            next: (mechanic: Profile) => {
              this.mechanics.set([mechanic, ...this.mechanics()]);
            },
            error: (error: any) => console.error('Error getting mechanic:', error)
          });*/
        });
      },
      error: (error: any) => console.error('Error getting mechanics:', error)
    });
  }

  openCreateModal(): void {
    this.selectedMechanic = null;
    const dialogRef = this.dialog.open(NewMechanicDialogComponent, {
      data: { mechanic: this.selectedMechanic }
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
      data: { mechanic: this.selectedMechanic }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateMechanic(result);
      }
    });
  }

  createMechanic(newMechanicData: Profile): void {
    this.workshopService.postMechanicByWorkshopId(1, newMechanicData).subscribe({
      next: (data: Profile) => this.mechanics.set([data, ...this.mechanics()]),
      error: (error) => console.error('Error creating mechanic:', error)
    });
  }

  updateMechanic(updatedMechanicData: Profile): void {
    this.profileService.putProfile(updatedMechanicData.id, updatedMechanicData).subscribe({
      next: () => {
        const index = this.mechanics().findIndex(m => m.id === updatedMechanicData.id);
        if (index !== -1) {
          this.mechanics()[index] = updatedMechanicData;
        }
      },
      error: (error) => console.error('Error updating mechanic:', error)
    });
  }
}
