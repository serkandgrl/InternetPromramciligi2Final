import { Uye } from './../../models/Uye';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  kadi: string;
  uyeler: Uye[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiServis: ApiService
  ) { }
  ngOnInit(): void {
    this.UyeListele();
    if (this.apiServis.oturumKontrol) {
      this.kadi = localStorage.getItem("kadi");
    }
  }
  OturumKapat() {
    localStorage.clear();
    location.href = "/";
  }
  UyeListele() {
    this.apiServis.UyeListe().subscribe((d: Uye[]) => {
      this.uyeler = d;
    });
  }

}
