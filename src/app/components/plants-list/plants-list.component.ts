import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/models/plant.model';
import { PlantService } from 'src/app/_services/plant.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.css']
})
export class PlantsListComponent implements OnInit {

  plants: Plant[] = [];
  currentPlant: Plant = {};
  currentIndex = -1;
  isLoggedIn = false;
  private roles: string[] = [];
  showAdminBoard = false;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  title = '';
  constructor(private plantService: PlantService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.retrievePlants();
    const user = this.storageService.getUser();
    this.roles = user.roles;
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrievePlants(): void {

    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.plantService.getAll(params)
      .subscribe(
        response => {
          const{ plants, totalItems } = response;
          this.plants = plants;
          this.count = totalItems;
          console.log(response);
        },
        error  => {
          console.log(error);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrievePlants();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrievePlants();
  }

  refreshList(): void {
    this.retrievePlants();
    this.currentPlant = {};
    this.currentIndex = -1;
  }

  setActivePlant(plant: Plant, index: number): void {
    this.currentPlant = plant;
    this.currentIndex = index;
  }

  removeAllPlants(): void {
    this.plantService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentPlant = {};
   this.currentIndex = -1;
    this.page = 1;
    this.retrievePlants();
    this.plantService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.plants = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


}
