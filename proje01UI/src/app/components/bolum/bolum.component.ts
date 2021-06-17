import { ApiService } from 'src/app/services/api.service';
import { Bolumler } from './../../models/Bolumler';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bolum',
  templateUrl: './bolum.component.html',
  styleUrls: ['./bolum.component.css']
})
export class BolumComponent implements OnInit {
  bolumler: Bolumler[];
  displayedColumns = ['bolumKodu', 'bolumAdi', 'bolumAdres', 'bolumTelefon'];
  dataSource: any;
  constructor(
    public apiServis: ApiService,
  ) { }

  ngOnInit() {
    this.BolumListele();
  }
  BolumListele() {
    this.apiServis.BolumListe().subscribe((d: Bolumler[]) => {
      this.bolumler = d;
      this.dataSource = new MatTableDataSource(this.bolumler);
    });
  }
}
