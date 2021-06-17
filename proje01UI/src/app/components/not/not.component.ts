import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Notlar } from 'src/app/models/Notlar';

@Component({
  selector: 'app-not',
  templateUrl: './not.component.html',
  styleUrls: ['./not.component.css']
})
export class NotComponent implements OnInit {
  notlar: Notlar[];
  displayedColumns = ['notOgrenciNo', 'notDersKodu', 'notVize', 'notFinal', 'notOrtalama'];
  dataSource: any;
  constructor(
    public apiServis: ApiService,
  ) { }

  ngOnInit() {
    this.NotListele();
  }
  NotListele() {
    this.apiServis.NotListe().subscribe((d: Notlar[]) => {
      this.notlar = d;
      this.dataSource = new MatTableDataSource(this.notlar);
    });
  }
}
