import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Plant } from 'src/app/models/plant.model';
import { PlantService } from 'src/app/_services/plant.service';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent implements OnInit {

  plant: Plant = {
    title: '',
    description: '',
    type: '',
    price: '',
    published: false,
  };
  submitted = false;

  constructor(private plantService: PlantService) { }

  ngOnInit(): void {
  }

  savePlant(): void {
    const data = {
      title: this.plant.title,
      description: this.plant.description,
      type: this.plant.type,
      price: this.plant.price,
      published: true
    };

    this.plantService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newPlant(): void {
    this.submitted = false;
    this.plant = {
      title: '',
      description: '',
      type: '',
      price: '',
      published: false
    };
  }


}
