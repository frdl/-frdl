define('dsgvo-adsense', ["webfan/hps/dsgvo-cookiechoices"], function(cookieChoices){
 return function(element){

	 var Webfan = global.require.main.Webfan;
	 
	 		

if(!Webfan.hps.ads.google.disable_adds && Webfan.defined("hps.ads.google.google_ad_client")){
	

cookieChoices.cb_add("adsbygoogle", function() {
(function(g, d){

//if(null===d.cookie.match(/personalisiert=(.*)/) || "y"===d.cookie.match(/personalisiert=(.*)/)[1] ){
if(cookieChoices.getModus() === cookieChoices.MODUS_PERSONALIZED ){	
	if("undefined"===typeof window.adsbygoogle){
	  var s = d.createElement("script");
	 // s.async=1;
	  s.onload=g;
	  s.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
	  d.head.append(s);
	}else{
		g();
   }
 }
}(function g(){
			     (adsbygoogle = window.adsbygoogle || []).push({
                      google_ad_client: Webfan.hps.ads.google.google_ad_client,
                      enable_page_level_ads: true 
                  });
}, document));
});
				
}

cookieChoices.showCookieConsentBar(Webfan.hps.dsgvo.question, Webfan.hps.dsgvo.confirm, Webfan.hps.dsgvo.hint, Webfan.hps.dsgvo.url);
	 
	 
 };
});