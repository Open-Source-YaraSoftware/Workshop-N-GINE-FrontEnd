import { Component, computed, effect, signal } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import { NgForOf } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { Vehicle } from "../../model/vehicle.entity";
import { WorkshopService } from "../../services/workshop.service";
import { ProfileService } from "../../../profiles/services/profile.service";
import { VehicleService } from "../../services/vehicle.service";
import { Profile } from "../../../profiles/model/profile.entity";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-new-intervention-dialog',
  templateUrl: './new-intervention-dialog.component.html',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgForOf,
    MatButton,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  standalone: true,
})
export class NewInterventionDialogComponent {
  // Señales reactivas
  clientDni = signal<number | null>(null); // DNI del cliente ingresado
  profile = signal<Profile | null>(null); // Perfil del cliente obtenido
  clientVehicles = signal<Vehicle[]>([]); // Vehículos del cliente
  isLoadingVehicles = signal(false); // Indicador de carga de vehículos

  // Derivación para validar si el DNI ingresado es válido
  isValidClientDni = computed(() => {
    const dni = this.clientDni();
    return dni !== null && dni > 10000000 && dni < 100000000;
  });

  // Derivación para controlar si se permite enviar el formulario
  canSubmit = computed(() => {
    const intervention = this.newIntervention();
    return (
      intervention.clientId !== null &&
      intervention.vehicleId !== null &&
      intervention.mechanicLeaderId !== null &&
      intervention.scheduledAt !== null
    );
  });

  // Objeto reactivo para la nueva intervención
  newIntervention = signal({
    clientId: 0,
    vehicleId: 0,
    mechanicLeaderId: 0,
    scheduledAt: '',
    description: '',
  });

  // Opciones de mecánicos
  mechanicOptions = signal<Profile[]>([]);

  constructor(
    private workshopService: WorkshopService,
    private profileService: ProfileService,
    private vehicleService: VehicleService,
    public dialogRef: MatDialogRef<NewInterventionDialogComponent>
  ) {
    // Obtiene los mecánicos disponibles
    this.getMechanics();
    // Efecto para reaccionar a cambios en el DNI del cliente
    effect(() => {
      if (this.isValidClientDni()) {
        this.getProfileByDni(this.clientDni()!);
      } else {
        this.profile.set(null);
        this.clientVehicles.set([]);
      }
    }, { allowSignalWrites: true });
  }

  // Cierra el diálogo
  closeDialog(): void {
    this.dialogRef.close();
  }

  // Envía el formulario con los datos de la nueva intervención
  submitForm(): void {
    if (this.canSubmit()) {
      this.dialogRef.close(this.newIntervention());
    } else {
      console.error('Formulario incompleto');
    }
  }

  // Obtiene el perfil del cliente por DNI
  getProfileByDni(dni: number): void {
    this.profileService.getByDNI(dni).subscribe({
      next: (profile) => {
        this.profile.set(profile);
        this.newIntervention.set({ ...this.newIntervention(), clientId: profile.userId });
        this.getVehiclesByUserId(profile.userId);
      },
      error: (error) => {
        console.error('Error al obtener el perfil:', error);
        this.profile.set(null);
        this.clientVehicles.set([]);
      }
    });
  }

  // Obtiene los vehículos asociados al usuario
  getVehiclesByUserId(userId: number): void {
    this.isLoadingVehicles.set(true);
    this.vehicleService.getAllByClientId(userId).subscribe({
      next: (vehicles) => {
        this.clientVehicles.set(vehicles);
        this.isLoadingVehicles.set(false);
      },
      error: (error) => {
        console.error('Error al obtener vehículos:', error);
        this.clientVehicles.set([]);
        this.isLoadingVehicles.set(false);
      }
    });
  }

  // Obtiene los mecánicos disponibles
  getMechanics(): void {
    this.isLoadingVehicles.set(true); // Opcional: Indicador de carga
    this.workshopService.getMechanicsIdsByWorkshopId(1).subscribe({
      next: (mechanicsIds: number[]) => {
        // Crea un array de observables para obtener los perfiles
        const profileRequests = mechanicsIds.map((id) => this.profileService.getProfileByUserId(id));

        // Combina todos los observables en uno
        forkJoin(profileRequests).subscribe({
          next: (profiles: Profile[]) => {
            this.mechanicOptions.set(profiles); // Actualiza las opciones con los perfiles
            this.isLoadingVehicles.set(false); // Desactiva el indicador de carga
          },
          error: (error) => {
            console.error('Error al obtener perfiles de mecánicos:', error);
            this.isLoadingVehicles.set(false);
          },
        });
      },
      error: (error) => {
        console.error('Error al obtener IDs de mecánicos:', error);
        this.isLoadingVehicles.set(false);
      },
    });
  }
}
