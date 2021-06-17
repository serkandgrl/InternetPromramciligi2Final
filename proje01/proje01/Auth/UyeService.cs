using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using proje01.Models;
using proje01.ViewModel;

namespace proje01.Auth
{
    public class UyeService
    {
        DB01Entities db = new DB01Entities();

        public UyeModel UyeOturumAc(string kadi, string parola)
        {
            UyeModel uye = db.Uye.Where(s => s.uyeKullaniciAdi == kadi && s.uyeSifre == parola).Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                uyeKullaniciAdi = x.uyeKullaniciAdi,
                uyeEmail = x.uyeEmail,
                uyeSifre = x.uyeSifre,
                uyeAdSoyad = x.uyeAdSoyad,
                uyeAdmin = x.uyeAdmin
            }).SingleOrDefault();

            return uye;
        }
    }
}