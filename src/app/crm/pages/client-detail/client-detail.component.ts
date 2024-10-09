import { WorkshopClientService } from '../../services/workshop-client.service';
import { VehicleService } from '../../services/vehicle.service';
import { WorkshopClient } from '../../model/workshop-client.entity';
import { Vehicle } from '../../../service/model/vehicle.entity';

export class ClientDetailComponent {
  private workshopClientService: WorkshopClientService = inject(WorkshopClientService);
  protected vehicleService: VehicleService = inject(VehicleService);

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
    this.searchQueryParams();
    this.getClient();
    this.getVehicles();
  };

  private searchQueryParams() {
    this.route.params.subscribe(params => {
      this.clientId = params['id'] || 0;
    });
  }

  private getClient() {
    this.workshopClientService.getById(this.clientId)
      .subscribe((workshopClient: WorkshopClient) => {
        this.workshopClient = workshopClient;
      });
  }

  private getVehicles() {
    this.vehicleService.getByClientId(this.clientId)
      .subscribe((vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      });
  }
}
