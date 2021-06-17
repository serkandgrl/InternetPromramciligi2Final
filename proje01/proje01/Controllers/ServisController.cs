using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using proje01.Models;
using proje01.ViewModel;
using proje01.Controllers;

namespace proje01.Controllers
{
    
   

    public class ServisController : ApiController
    {
        DB01Entities db = new DB01Entities();
        SonucModel sonuc = new SonucModel();

        #region Uye

        [HttpGet]
        [Route("api/uyelistesi")]
        [Authorize]

        public List<UyeModel> UyeListe()
        {
            List<UyeModel> liste = db.Uye.Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                uyeKullaniciAdi = x.uyeKullaniciAdi,
                uyeEmail = x.uyeEmail,
                uyeSifre = x.uyeSifre,
                uyeAdSoyad = x.uyeAdSoyad,
                uyeAdmin = x.uyeAdmin
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/uyeyid/{uyeId}")]
        [Authorize]

        public UyeModel UyeById(int uyeId)
        {
            UyeModel kayit = db.Uye.Where(s => s.uyeId == uyeId).Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                uyeKullaniciAdi = x.uyeKullaniciAdi,
                uyeEmail = x.uyeEmail,
                uyeSifre = x.uyeSifre,
                uyeAdSoyad = x.uyeAdSoyad,
                uyeAdmin = x.uyeAdmin
            }).SingleOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/uyeekle")]
        [Authorize]

        public SonucModel UyeEkle(UyeModel model)
        {
            if (db.Uye.Count(s => s.uyeKullaniciAdi == model.uyeKullaniciAdi || s.uyeEmail == model.uyeEmail) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kullanıcı Adı veya E-Posta Kayıtlıdır";
                return sonuc;
            }

            Uye yeni = new Uye();
            yeni.uyeKullaniciAdi = model.uyeKullaniciAdi;
            yeni.uyeEmail = model.uyeEmail;
            yeni.uyeSifre = model.uyeSifre;
            yeni.uyeAdSoyad = model.uyeAdSoyad;
            yeni.uyeAdmin = model.uyeAdmin;

            db.Uye.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        [Authorize]

        public SonucModel UyeDuzenle(UyeModel model)
        {
            Uye kayit = db.Uye.Where(s => s.uyeId == model.uyeId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulanamadı";
                return sonuc;
            }

            kayit.uyeKullaniciAdi = model.uyeKullaniciAdi;
            kayit.uyeEmail = model.uyeEmail;
            kayit.uyeSifre = model.uyeSifre;
            kayit.uyeAdSoyad = model.uyeAdSoyad;
            kayit.uyeAdmin = model.uyeAdmin;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]
        [Authorize]

        public SonucModel UyeSil(int uyeId)
        {
            Uye kayit = db.Uye.Where(s => s.uyeId == uyeId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }

            if (db.Ogrenciler.Count(s => s.ogrUyeId == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Öğrenciye Ait Üye Silinemez";
                return sonuc;
            }

            if (db.Dersler.Count(s => s.dersUyeId == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye Dersle Kayıtlı Olduğu İçin Silinemez";
                return sonuc;
            }

            if (db.Bolumler.Count(s => s.bolumUyeId == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye Bölüme Kayıtlı Olduğu İçin Silinemez";
                return sonuc;
            }

            if (db.Notlar.Count(s => s.notUyeId == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye'ye Ait Not Blunduğu İçin Silinemez";
                return sonuc;
            }

            db.Uye.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi";

            return sonuc;
        }

        #endregion

        #region Dersler

        [HttpGet]
        [Route("api/derslistesi")]
        public List<DerslerModel> DersListesi()
        {
            List<DerslerModel> liste = db.Dersler.Select(x => new DerslerModel()
            {
                dersKodu = x.dersKodu,
                dersAdi = x.dersAdi,
                dersKredi = x.dersKredi,
                dersOgretimElemanı = x.dersOgretimElemanı,
                dersUyeId=x.dersUyeId

            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/dersbykod/{dersKodu}")]
        public DerslerModel DersById(string dersKodu)
        {
            DerslerModel kayit = db.Dersler.Where(s => s.dersKodu == dersKodu).Select(x => new DerslerModel()
            {
                dersKodu = x.dersKodu,
                dersAdi = x.dersAdi,
                dersKredi = x.dersKredi,
                dersOgretimElemanı = x.dersOgretimElemanı,
                dersUyeId=x.dersUyeId

            }).FirstOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/dersekle")]
        [Authorize]
        public SonucModel DersEkle(DerslerModel model)
        {
            if (db.Dersler.Count(s => s.dersKodu == model.dersKodu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Ders Kayıtlıdır!";
                return sonuc;
            }

            Dersler yeni = new Dersler();
            yeni.dersKodu = model.dersKodu;
            yeni.dersAdi = model.dersAdi;
            yeni.dersKredi = model.dersKredi;
            yeni.dersOgretimElemanı = model.dersOgretimElemanı;
            yeni.dersUyeId = model.dersUyeId;
            db.Dersler.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ders Eklendi";

            return sonuc;
        }

        [HttpPut]
        [Route("api/dersduzenle")]
        [Authorize]
        public SonucModel DersDuzenle(DerslerModel model)
        {
            Dersler kayit = db.Dersler.Where(s => s.dersKodu == model.dersKodu).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ders Bulunamadı";
                return sonuc;
            }

            kayit.dersAdi = model.dersAdi;
            kayit.dersKredi = model.dersKredi;
            kayit.dersOgretimElemanı = model.dersOgretimElemanı;
            kayit.dersUyeId = model.dersUyeId;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ders Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/derssil/{dersKodu}")]
        [Authorize]
        public SonucModel DersSil(string dersKodu)
        {
            Dersler kayit = db.Dersler.Where(s => s.dersKodu == dersKodu).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ders Bulunamadı";
                return sonuc;
            }

            if (db.Notlar.Count(s => s.notDersKodu == dersKodu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Derse Kayıtlı Öğrenci Olduğu İçin Ders Silinemez";
                return sonuc;
            }

            db.Dersler.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ders Silindi";
            return sonuc;
        }

        #endregion

        #region Ogrenciler

        [HttpGet]
        [Route("api/ogrencilistesi")]

        public List<OgrencilerModel> OgrenciListesi()
        {
            List<OgrencilerModel> liste = db.Ogrenciler.Select(x => new OgrencilerModel()
            {
                ogrNo = x.ogrNo,
                ogrTC = x.ogrTC,
                ogrAd = x.ogrAd,
                ogrSoyad = x.ogrSoyad,
                ogrCinsiyet = x.ogrCinsiyet,
                ogrTelefon = x.ogrTelefon,
                ogrMail = x.ogrMail,
                ogrBolumKodu = x.ogrBolumKodu,
                ogrUyeId=x.ogrUyeId
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/ogrencibyno/{ogrNo}")]

        public OgrencilerModel OgrenciById(string ogrNo)
        {
            OgrencilerModel kayit = db.Ogrenciler.Where(s => s.ogrNo == ogrNo).Select(x => new OgrencilerModel()
            {
                ogrNo = x.ogrNo,
                ogrTC = x.ogrTC,
                ogrAd = x.ogrAd,
                ogrSoyad = x.ogrSoyad,
                ogrCinsiyet = x.ogrCinsiyet,
                ogrTelefon = x.ogrTelefon,
                ogrMail = x.ogrMail,
                ogrBolumKodu = x.ogrBolumKodu,
                ogrUyeId=x.ogrUyeId
            }).SingleOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/ogrenciekle")]
        [Authorize]
        public SonucModel OgrenciEkle(OgrencilerModel model)
        {
            if (db.Ogrenciler.Count(s => s.ogrNo == model.ogrNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Öğrenci Numarası Kayıtlıdır!";
                return sonuc;
            }


            Ogrenciler yeni = new Ogrenciler();
            yeni.ogrNo = model.ogrNo;
            yeni.ogrTC = model.ogrTC;
            yeni.ogrAd = model.ogrAd;
            yeni.ogrSoyad = model.ogrSoyad;
            yeni.ogrCinsiyet = model.ogrCinsiyet;
            yeni.ogrTelefon = model.ogrTelefon;
            yeni.ogrMail = model.ogrMail;
            yeni.ogrBolumKodu = model.ogrBolumKodu;
            yeni.ogrUyeId = model.ogrUyeId;

            db.Ogrenciler.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/ogrenciduzenle")]
        [Authorize]
        public SonucModel OgrenciDuzenle(OgrencilerModel model)
        {
            Ogrenciler kayit = db.Ogrenciler.Where(s => s.ogrNo == model.ogrNo).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }


            kayit.ogrTC = model.ogrTC;
            kayit.ogrAd = model.ogrAd;
            kayit.ogrSoyad = model.ogrSoyad;
            kayit.ogrCinsiyet = model.ogrCinsiyet;
            kayit.ogrTelefon = model.ogrTelefon;
            kayit.ogrMail = model.ogrMail;
            kayit.ogrBolumKodu = model.ogrBolumKodu;
            kayit.ogrUyeId = model.ogrUyeId;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/ogrencisil/{ogrNo}")]
        [Authorize]
        public SonucModel OgrenciSil(string ogrNo)
        {
            Ogrenciler kayit = db.Ogrenciler.Where(s => s.ogrNo == ogrNo).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Notlar.Count(s => s.notOgrenciNo == ogrNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Öğrenciye Ait Not Bulunduğu İçin Öğrenci Silinemez";
                return sonuc;
            }

            db.Ogrenciler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Silindi";
            return sonuc;
        }

        #endregion

        #region Bolumler

        [HttpGet]
        [Route("api/bolumlistesi")]

        public List<BolumlerModel> BolumListe()
        {
            List<BolumlerModel> liste = db.Bolumler.Select(x => new BolumlerModel()
            {
                bolumKodu = x.bolumKodu,
                bolumAdi = x.bolumAdi,
                bolumAdres = x.bolumAdres,
                bolumTelefon = x.bolumTelefon,
                bolumUyeId = x.bolumUyeId
            }).ToList();

            return liste;
        }

        [HttpPost]
        [Route("api/bolumekle")]
        [Authorize]
        public SonucModel BolumEkle(BolumlerModel model)
        {
            if (db.Bolumler.Count(s => s.bolumKodu == model.bolumKodu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Bölüm Kodu Kayıtlıdır!";
                return sonuc;
            }


            Bolumler yeni = new Bolumler();
            yeni.bolumKodu = model.bolumKodu;
            yeni.bolumAdi = model.bolumAdi;
            yeni.bolumAdres = model.bolumAdres;
            yeni.bolumTelefon = model.bolumTelefon;
            yeni.bolumUyeId = model.bolumUyeId;
            db.Bolumler.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Bölüm Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/bolumduzenle")]
        [Authorize]
        public SonucModel BolumDuzenle(BolumlerModel model)
        {
            Bolumler kayit = db.Bolumler.Where(s => s.bolumKodu == model.bolumKodu).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }


            kayit.bolumAdi = model.bolumAdi;
            kayit.bolumAdres = model.bolumAdres;
            kayit.bolumTelefon = model.bolumTelefon;
            kayit.bolumUyeId = model.bolumUyeId;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Bölüm Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/bolumsil/{bolumKodu}")]
        [Authorize]
        public SonucModel BolumSil(string bolumKodu)
        {
            Bolumler kayit = db.Bolumler.Where(s => s.bolumKodu == bolumKodu).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Ogrenciler.Count(s => s.ogrBolumKodu == bolumKodu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bölüme Kayıtlı Öğrenci Olduğu İçin Bölüm Silinemez";
                return sonuc;
            }

            db.Bolumler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Bölüm Silindi";
            return sonuc;
        }

        #endregion

        #region Notlar

        [HttpGet]
        [Route("api/notlistesi")]

        public List<NotlarModel> NotListe()
        {
            List<NotlarModel> liste = db.Notlar.Select(x => new NotlarModel()
            {
                notOgrenciNo = x.notOgrenciNo,
                notDersKodu = x.notDersKodu,
                notVize = x.notVize,
                notFinal = x.notFinal,
                notOrtalama = x.notOrtalama,
                notUyeId = x.notUyeId
            }).ToList();

            return liste;
        }

        [HttpPost]
        [Route("api/notekle")]
        [Authorize]
        public SonucModel NotEkle(NotlarModel model)
        {

            if (db.Notlar.Count(s => s.notOgrenciNo == model.notOgrenciNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Öğrenci'ye Ait Not Bulunmaktadır";
                return sonuc;
            }


            Notlar yeni = new Notlar();
            yeni.notOgrenciNo = model.notOgrenciNo;
            yeni.notDersKodu = model.notDersKodu;
            yeni.notVize = model.notVize;
            yeni.notFinal = model.notFinal;
            yeni.notOrtalama = model.notOrtalama;
            yeni.notUyeId = model.notUyeId;
            db.Notlar.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Not Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/notduzenle")]
        [Authorize]
        public SonucModel NotDuzenle(NotlarModel model)
        {
            Notlar kayit = db.Notlar.Where(s => s.notOgrenciNo == model.notOgrenciNo).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }


            kayit.notDersKodu = model.notDersKodu;
            kayit.notVize = model.notVize;
            kayit.notFinal = model.notFinal;
            kayit.notOrtalama = model.notOrtalama;
            kayit.notUyeId = model.notUyeId;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Not Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/notsil/{notOgrenciNo}")]
        [Authorize]
        public SonucModel NotSil(string notOgrenciNo)
        {
            Notlar kayit = db.Notlar.Where(s => s.notOgrenciNo == notOgrenciNo).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Notlar.Count(s => s.notOgrenciNo == notOgrenciNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıtlı Öğrenci Olduğu İçin Not Silinemez";
                return sonuc;
            }

            db.Notlar.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Not Silindi";
            return sonuc;
        }

        #endregion
    }
}
