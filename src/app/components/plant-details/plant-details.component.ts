import { Component, Input, OnInit } from '@angular/core';
import { PlantService } from 'src/app/_services/plant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Plant } from 'src/app/models/plant.model';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.css']
})
export class PlantDetailsComponent implements OnInit {

  isLoggedIn = false;
  private roles: string[] = [];
  showAdminBoard = false;
  @Input() viewMode = false;

  @Input() currentPlant: Plant = {
    title: '',
    description: '',
    published: false
  };
  
  message = '';

  constructor(
    private plantService: PlantService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getPlant(this.route.snapshot.params["id"]);
    }
    const user = this.storageService.getUser();
    this.roles = user.roles;
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
  }

  getPlant(id: string): void {
    this.plantService.get(id)
      .subscribe({
        next: (data) => {
          this.currentPlant = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentPlant.title,
      description: this.currentPlant.description,
      published: status
    };

    this.message = '';

    this.plantService.update(this.currentPlant.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentPlant.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updatePlant(): void {
    this.message = '';

    this.plantService.update(this.currentPlant.id, this.currentPlant)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Plant was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deletePlant(): void {
    this.plantService.delete(this.currentPlant.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/plants']);
        },
        error: (e) => console.error(e)
      });
  }

}
