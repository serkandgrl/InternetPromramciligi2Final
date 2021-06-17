import { Ogrenciler } from 'src/app/models/Ogrenciler';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.css']
})
export class UyeComponent implements OnInit {
  
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    
  }
 

}
