using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

[assembly: OwinStartup(typeof(proje01.Auth.Startup))]
namespace proje01.Auth
{
    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            appBuilder.UseCors(CorsOptions.AllowAll);

            HttpConfiguration httpConfiguration = new HttpConfiguration();

            ConfigureOAuth(appBuilder);

            WebApiConfig.Register(httpConfiguration);
            appBuilder.UseWebApi(httpConfiguration);
        }

        private void ConfigureOAuth(IAppBuilder appBuilder)
        {
            OAuthAuthorizationServerOptions oAuthAuthorizationServerOptions = new OAuthAuthorizationServerOptions()
            {
                TokenEndpointPath = new PathString("/api/token"), // token alacağımız pathi belirtiyoruz
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(12),
                AllowInsecureHttp = true,
                Provider = new AuthProvider()
            };

            // AppBuildera token üretimi gerçekleştirebilmek için ilgili authorization ayarlamamızı veriyoruz.
            appBuilder.UseOAuthAuthorizationServer(oAuthAuthorizationServerOptions);

            // Authentication type olarak ise Bearer Authenticationı kullanacağımızı belirtiyoruz.
            // Bearer token OAuth 2.0 ile gelen standartlaşmış token türüdür.
            // Herhangi kriptolu bir veriye ihtiyaç duymadan client tarafından token isteğinde bulunulur ve server belirli bir expire date'e sahip bir access_token üretir.
            // Bir diğer tip ise MAC tokendır. OAuth 1.0 da kullanımı oldukça yaygın, hem clienta hemde server tarafına implementasyonlardan dolayı ek maliyet çıkartmaktadır. Bu maliyetin yanı sıra ise Bearer tokena göre daha fazla güvenlidir kaynak alış verişi çünkü client her requestinde veriyi hmac ile imzalayıp verileyip kriptolu şekilde göndermeli.
            appBuilder.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        }
    }
}