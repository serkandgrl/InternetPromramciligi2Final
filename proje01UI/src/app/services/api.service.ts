import { Notlar } from './../models/Notlar';
import { Bolumler } from './../models/Bolumler';
import { Ogrenciler } from './../models/Ogrenciler';
import { Dersler } from './../models/Dersler';
import { Uye } from './../models/Uye';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:11113/api/";

  constructor(
    public http: HttpClient
  ) { }
  /* Oturum İşlemleri */
  tokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  yetkiKontrol(yetkiler) {
    var sonuc: boolean = false;

    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));

    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
          return false;
        }
      });
    }

    return sonuc;
  }
  /* Oturum İşlemleri  Bitiş*/

  /* API */

  UyeListe() {
    return this.http.get(this.apiUrl + "/uyelistesi");
  }
  UyeById(uyeId: number) {
    return this.http.get(this.apiUrl + "/uyeyid/" + uyeId);
  }
  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + "/uyeekle", uye)
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + "/uyeduzenle", uye)
  }
  UyeSil(uyeId: number) {
    return this.http.delete(this.apiUrl + "/uyesil/" + uyeId)
  }

  DersListe() {
    return this.http.get(this.apiUrl + "/derslistesi");
  }
  DersByKod(dersKodu: string) {
    return this.http.get(this.apiUrl + "/dersbykod/" + dersKodu);
  }
  DersEkle(ders: Dersler) {
    return this.http.post(this.apiUrl + "/dersekle", ders);
  }
  DersDuzenle(ders: Dersler) {
    return this.http.put(this.apiUrl + "/dersduzenle", ders);
  }
  DersSil(dersKodu: string) {
    return this.http.delete(this.apiUrl + "/derssil/" + dersKodu);
  }

  OgrenciListe() {
    return this.http.get(this.apiUrl + "/ogrencilistesi");
  }
  OgrenciByNo(ogrNo: string) {
    return this.http.get(this.apiUrl + "/ogrencibyno/" + ogrNo);
  }
  OgrenciEkle(ogrenci: Ogrenciler) {
    return this.http.post(this.apiUrl + "/ogrenciekle", ogrenci);
  }
  OgrenciDuzenle(ogrenci: Ogrenciler) {
    return this.http.put(this.apiUrl + "/ogrenciduzenle", ogrenci);
  }
  OgrenciSil(ogrNo: string) {
    return this.http.delete(this.apiUrl + "/ogrencisil/" + ogrNo);
  }

  BolumListe() {
    return this.http.get(this.apiUrl + "/bolumlistesi");
  }
  BolumEkle(bolum: Bolumler) {
    return this.http.post(this.apiUrl + "/bolumekle", bolum);
  }
  BolumDuzenle(bolum: Bolumler) {
    return this.http.put(this.apiUrl + "/bolumduzenle", bolum);
  }
  BolumSil(bolumKodu: string) {
    return this.http.delete(this.apiUrl + "/bolumsil/" + bolumKodu);
  }

  NotListe() {
    return this.http.get(this.apiUrl + "/notlistesi");
  }
  NotEkle(not: Notlar) {
    return this.http.post(this.apiUrl + "/notekle", not);
  }
  NotDuzenle(not: Notlar) {
    return this.http.put(this.apiUrl + "/notduzenle", not);
  }
  NotSil(notOgrenciNo: string) {
    return this.http.delete(this.apiUrl + "/notsil/" + notOgrenciNo);
  }

}
