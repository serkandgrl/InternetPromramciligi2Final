import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Dersler } from 'src/app/models/Dersler';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.css']
})
export class DersComponent implements OnInit {
  dersler: Dersler[];
  displayedColumns = ['dersKodu', 'dersAdi', 'dersKredi'];
  dataSource: any;
  constructor(
    public apiServis: ApiService,
  ) { }

  ngOnInit() {
    this.DersListele();
  }
  DersListele() {
    this.apiServis.DersListe().subscribe((d: Dersler[]) => {
      this.dersler = d;
      this.dataSource = new MatTableDataSource(this.dersler);
    });
  }
}