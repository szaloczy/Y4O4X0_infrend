import { Component, OnInit } from '@angular/core';
import { Part } from '../../types';
import { PartService } from '../../services/part.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parts-list',
  imports: [
    CommonModule
  ],
  templateUrl: './parts-list.component.html',
  styleUrl: './parts-list.component.scss'
})
export class PartsListComponent implements OnInit{
  parts: Part[] = [];

  constructor(private partService: PartService) {}

  ngOnInit(): void {
    this.loadParts();
  }

  loadParts(): void {
    this.partService.getAllParts().subscribe(
      (parts) => {
        this.parts = parts;
      },
      (error) => {
        console.error('Hiba az alkatrészek lekérésekor:', error);
      }
    );
  }

  deletePart(id: number): void {
    this.partService.deletePart(id).subscribe(
      () => {
        this.loadParts(); // Frissítjük a listát a törlés után
      },
      (error) => {
        console.error('Hiba az alkatrész törlésekor:', error);
      }
    );
  }
}
