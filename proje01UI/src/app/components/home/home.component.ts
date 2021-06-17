import { OgrencilerDialogComponent } from './../dialogs/ogrenciler-dialog/ogrenciler-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Ogrenciler } from 'src/app/models/Ogrenciler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(
    public apiServis: ApiService
  ) { }

  ngOnInit() {
  }

  
  
}
