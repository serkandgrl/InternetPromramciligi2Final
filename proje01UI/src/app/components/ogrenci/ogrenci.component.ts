import { Component, OnInit } from '@angular/core';
import { Ogrenciler } from 'src/app/models/Ogrenciler';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ogrenci',
  templateUrl: './ogrenci.component.html',
  styleUrls: ['./ogrenci.component.css']
})
export class OgrenciComponent implements OnInit {
  ogrenciler: Ogrenciler[];
  displayedColumns = ['ogrNo', 'ogrTC', 'ogrAd', 'ogrSoyad', 'ogrCinsiyet', 'ogrTelefon', 'ogrMail', 'ogrBolumKodu'];
  dataSource: any;
  constructor(
    public apiServis: ApiService,
  ) { }

  ngOnInit() {
    this.Ogrenciistele();
  }
  Ogrenciistele() {
    this.apiServis.OgrenciListe().subscribe((d: Ogrenciler[]) => {
      this.ogrenciler = d;
      this.dataSource = new MatTableDataSource(this.ogrenciler);
    });
  }
}
