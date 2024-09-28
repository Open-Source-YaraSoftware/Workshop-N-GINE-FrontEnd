import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonnelService } from '../../services/personnel.service';
import { Mechanic } from '../../model/mechanic.entity';
import { NewMechanicDialogComponent } from '../../components/new-mechanic-dialog/new-mechanic-dialog.component';
import { NgIf } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PersonnelListComponent } from '../../components/personnel-list/personnel-list.component';

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
    MatButton
  ],
  standalone: true
})
export class PersonnelComponent implements OnInit {
  isModalOpen = false;
  selectedMechanic: Mechanic | null = null;
  mechanics: Mechanic[] = [];
  noMechanics = false;
  searchQuery = '';

  constructor(
    private personnelService: PersonnelService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPersonnel();
  }

  getPersonnel(): void {
    this.personnelService.getByWorkshopId(1).subscribe({
      next: (data: Mechanic[]) => {
        this.mechanics = data;
        console.log('Mechanics:', this.mechanics);
        this.noMechanics = data.length === 0;
      },
      error: (error) => {
        console.error('Error fetching personnel:', error);
        this.noMechanics = true;
      }
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

  openUpdateModal(mechanic: Mechanic): void {
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

  createMechanic(newMechanicData: Mechanic): void {
    this.personnelService.postPersonnel(newMechanicData).subscribe({
      next: (data: Mechanic) => this.mechanics.push(data),
      error: (error) => console.error('Error creating mechanic:', error)
    });
  }

  updateMechanic(updatedMechanicData: Mechanic): void {
    this.personnelService.putMechanic(updatedMechanicData).subscribe({
      next: () => {
        const index = this.mechanics.findIndex(m => m.id === updatedMechanicData.id);
        if (index !== -1) {
          this.mechanics[index] = updatedMechanicData;
        }
      },
      error: (error) => console.error('Error updating mechanic:', error)
    });
  }

  deleteMechanic(id: number): void {
    this.personnelService.deleteMechanic(id).subscribe({
      next: () => {
        this.mechanics = this.mechanics.filter(m => m.id !== id);
      },
      error: (error) => console.error('Error deleting mechanic:', error)
    });
  }

  filteredMechanics(): Mechanic[] {
    if (!this.searchQuery) return this.mechanics;
    const query = this.searchQuery.toLowerCase();
    return this.mechanics.filter(mechanic =>
      mechanic.firstName.toLowerCase().includes(query) ||
      mechanic.lastName.toLowerCase().includes(query) ||
      mechanic.dni.includes(query) ||
      mechanic.email.toLowerCase().includes(query)
    );
  }
}
