function toScore(grade) {
  var scoreMatrix = {
    "Mycket goda": 4,
    "Goda": 3,
    "Mindre goda": 2,
    "Dåliga": 1
  }
  return scoreMatrix[grade];
}

function scoreToHtml(score) {
  html = "";
  for(var i=0; i<score; i++) {
    html += '<img class="heart" src="/images/glyphicons-13-heart.png"/>';
  }
  for(var j=0; j<(4-score); j++) {
    html += '<img class="heart" src="/images/glyphicons-20-heart-empty.png"/>';
  }
  return html;
}

function evaluateMatrix(matrix, ref) {
  console.log(matrix);
  if (matrix['isMobile'] == false &&
      matrix['supportsMSE'] == true &&
      matrix['supportsEME'] == true &&
      matrix['supportsFlash'] == true &&
      matrix['supportsNPAPI'] == true )
  {
    ref.summary = "Det finns mycket goda förutsättningar för att du skall kunna titta på strömmande video med den webbläsare du använder. De flesta tjänsterna bör fungera bra för dig så länge du har en bra Internetanslutning.";
    ref.advanced = "";
    return "Mycket goda";
  } else if (matrix['isMobile'] == false &&
      matrix['supportsMSE'] == true &&
      matrix['supportsEME'] == true &&
      (matrix['supportsFlash'] == false || matrix['supportsFlash'] == true) &&
      matrix['supportsNPAPI'] == false )
  {
    ref.summary = "Det finns goda förutsättningar för att du skall kunna titta på strömmande video med den webbläsare du använder. Du kan däremot ha problem hos vissa tjänster som tillhandahåller innehåll med krav på rättighetsskydd.";
    ref.advanced = "En förutsättning för att det skall fungera på både Chrome och Internet Explorer är att tjänsten använder sig av både Widevine Modular (för Chrome) och Playready (för Internet Explorer) för att skydda det rättighetsskyddade materialet. Använder du Mozilla Firefox så fungerar det inte då det saknas stöd för att hantera rättighettskyddat material.";
    if (matrix['supportsFlash'] == false) {
      ref.howto = "För att öka sannolikheten att det fungerar med innehåll som har krav på rättighetsskydd så är det rekommenderat att installera Flash-plugin till din webbläsare. Vissa streamingtjänster som inte har EME-stöd kan också kräva att du har stöd för NPAPI vilket betyder att du behöver byta till Internet Explorer eller Mozilla Firefox.";
    } else {
      ref.howto = "Vissa streamingtjänster som inte har EME-stöd kan också kräva att du har stöd för NPAPI vilket betyder att du behöver byta till Internet Explorer eller Mozilla Firefox."
    }
    return "Goda";
  } else if (matrix['isMobile'] == true &&
      matrix['supportsMSE'] == true &&
      matrix['supportsEME'] == false &&
      matrix['supportsFlash'] == false &&
      matrix['supportsNPAPI'] == false )
  {
    ref.summary = "Det finns mindre goda förutsättningar för att du skall kunna titta på strömmande video med den webbläsare du använder. Du har inga möjligheter att titta på innehåll som har krav på rättighetsskydd.";
    ref.advanced = "En förutsättning för att du skall kunna konsumera innehåll är att tjänsten erbjuder en videospelare som bygger på MSE-tekniken och att innehållet inte är rättighetsskyddat";
    ref.howto = "Många streamingtjänster erbjuder en applikation till din mobil för att kunna ge dig möjlighet att titta på rättighetsskyddat innehåll.";
    return "Mindre goda";
  } else if (matrix['isMobile'] == false &&
      matrix['supportsMSE'] == true &&
      matrix['supportsEME'] == true &&
      matrix['supportsFlash'] == false &&
      matrix['supportsNPAPI'] == true )
  {
    ref.summary = "Det finns goda förutsättningar för att du skall kunna titta på strömmande video med den webbläsare du använder. Du kan råka ut för problem hos vissa tjänster som bara har Flash-baserad videouppspelning och inte erbjuder någotannat alternativ.";
    ref.advanced = "Streamingtjänster som har Flash-baserade reklamformat under videouppspelning kan kräva att du har Flash installerat och påslaget i webbläsaren för att kunna spela upp videoströmmarna";
    ref.howto = "Det enklaste sättet att förbättra dina förutsättningar är att installera Flash-plugin till din webbläsare.";
    return "Goda";
  } else if (matrix['isMobile'] == true &&
      matrix['supportsMSE'] == true &&
      matrix['supportsEME'] == true &&
      matrix['supportsFlash'] == false &&
      matrix['supportsNPAPI'] == false )
  {
    ref.summary = "Det finns mycket goda förutsättningar för att du skall kunna titta på strömmande video med den webbläsare du använder."
    ref.advanced = "En förutsättning för att kunna spela upp rättighetsskyddat material är att streamingtjänsten använder sig av både Widevine Modular (för Chrome) och Playready (för Internet Explorer) för att skydda det rättighetsskyddade materialet."
    return "Mycket goda";
  } else if (matrix['isMobile'] == false &&
      matrix['supportsMSE'] == true &&
      matrix['supportsEME'] == false &&
      matrix['supportsFlash'] == false &&
      matrix['supportsNPAPI'] == true )
  {
     ref.summary = "Det finns mindre goda förutsättningar för att du skall kunna titta på strömmande video med den webbläsare du använder. Du kan ha problem hos vissa tjänster som tillhandahåller innehåll med krav på rättighetsskydd eller vissa typer av reklamformat.";
     ref.advanced = "Enda förutsättningen för att kunna titta på rättighetsskyddat innehåll är att tjänsten har en Silverlight-baserad videospelare och att eventuella reklamformat i videon inte är baserade på Flash.";
     ref.howto = "Det enklaste sättet att förbättra dina förutsättningar är att installera Flash-plugin till din webbläsasre.";
     return "Mindre goda";
  } else if (matrix['isMobile'] == false &&
      matrix['supportsMSE'] == false &&
      matrix['supportsEME'] == false &&
      matrix['supportsFlash'] == true &&
      matrix['supportsNPAPI'] == true )
  {
    ref.summary = "Det finns goda förutsättningar för att du skall kunna titta på strömmande video med den webbläsare du använder. Dock kan det finnas tjänster som kräver att du har en modernare webbläsare än den du använder för att kunna uppleva en bättre videokvalitét.";
    ref.advanced = "Många webbläsare uppvisar bättre prestanda för videouppspelning när inte Flash- eller Silverlight-baserade videouppspelare används.";
    return "Goda";
  } else if (matrix['isMobile'] == false &&
      matrix['supportsMSE'] == true &&
      matrix['supportsEME'] == false &&
      matrix['supportsFlash'] == true &&
      matrix['supportsNPAPI'] == false )
  {
    ref.summary = "Det finns goda förutsättningar för att du skall kunna titta på strömmande video med den webbläsare du använder. Du kan däremot ha problem hos vissa tjänster som tillhandahåller innehåll med krav på rättighetsskydd.";
    ref.advanced = "En förutsättning för att det skall fungera på både Chrome och Internet Explorer är att tjänsten använder sig av både Widevine Modular och Playready för skydda det rättighetsskyddade materialet. Använder du Mozilla Firefox så behöver tjänsten även använda sig av Flash Access för rättighetsskydd.";
    return "Goda";
  } else if (matrix['isMobile'] == false &&
      matrix['supportsMSE'] == true &&
      matrix['supportsEME'] == false &&
      matrix['supportsFlash'] == true &&
      matrix['supportsNPAPI'] == true )
  {
    ref.summary = "Det finns goda förutsättningar för att du skall kunna titta på strömmande video med den webbläsare du använder. Dock kan det finnas tjänster som kräver att du har en modernare webbläsare än den du använder för att kunna uppleva en bättre videokvalitét för rättighetsskyddat material.";
    ref.advanced = "Många webbläsare uppvisar bättre prestanda för videouppspelning när inte Flash- eller Silverlight-baserade videouppspelare används. Det är dock inte möjligt att spela upp rättighetsskyddat innehåll utan Flash eller Silverlight med din webbläsare.";
    ref.howto = "Genom att installera en webbläsare som har stöd för EME kan du konsumera rättighetsskyddat innehåll i bättre videokvalitét om streamingtjänsten också har stöd för detta. Senaste versionen av Chrome och Internet Explorer (på Windows 8.1+) har stöd för detta.";
    return "Goda";
  } else if (matrix['isMobile'] == true &&
      matrix['supportsMSE'] == false &&
      matrix['supportsEME'] == false &&
      matrix['supportsFlash'] == false &&
      matrix['supportsNPAPI'] == false )
  {
    ref.summary = "Det finns mindre goda förutsättningar för att du skall kunna titta på strömmande video med den webbläsare du använder. Du kan uppleva problem hos vissa tjänster med att titta på live video även om du har en bra Internetanslutning.";
    ref.advanced = "En förutsättning är att tjänsten tillhandahåller streamingformatet HLS och att din mobil har stöd för formatet. Vissa äldre modeller av Android har inte stöd för detta. Har du en äldre modell av Android så krävs det att tjänsten tillhandahåller RTSP och att nätverket du sitter på tillåter trafik på den porten."
    ref.howto = "Många streamingtjänster erbjuder en applikation till din mobil för att kunna ge dig möjlighet att titta på rättighetsskyddat innehåll.";
    return "Mindre goda";
  } else if (matrix['isMobile'] == false &&
      matrix['supportsMSE'] == true &&
      matrix['supportsEME'] == false &&
      matrix['supportsFlash'] == false &&
      matrix['supportsNPAPI'] == false )
  {
    ref.summary = "Det finns mindre goda förutsättningar för att du skall kunna titta på strömmande video med den webbläsare du använder. Du har mycket troligt problem hos tjänster som tillhandahåller innehåll med krav på rättighetsskydd.";
    ref.advanced = "De flesta rättighetsskydd kräver antingen att webbläsaren har stöd för uppspelning av rättighetsskyddat innehåll eller baserar sig på insticksmoduler från tredje part. Din webbläsaren har inte stöd för varken insticksmoduler eller har inbyggt stöd för uppspelning av rättighetsskyddat innehåll.";
    return "Mindre goda";
  } else if (matrix['isMobile'] == false &&
      matrix['supportsMSE'] == false &&
      matrix['supportsEME'] == false &&
      matrix['supportsFlash'] == false &&
      matrix['supportsNPAPI'] == false )
  {
     ref.summary = "Det finns dåliga förutsättningar för att du skall kunna titta på strömmande video även om du har en bra Internetanslutning.";
     ref.advanced = "";
     return "Dåliga";
  }
 
  ref.summary = "N/A";
  ref.advanced = "N/A";
  return "Ej avgörbart"; 
}

function runTest() {
  var test_matrix = {
    "isMobile": "",
    "supportsMSE": "",
    "supportsEME": "",
    "supportsFlash": "",
    "supportsNPAPI": ""
  };

  test_matrix['isMobile'] = _isMobile();
  
  // MSE
  var video_element = $("#test_video").get()[0];
  var media_source;
  try {
    media_source = new MediaSource();
  } catch(e) {
    console.log("Unable to instatiate MediaSource object");
  }
  if (media_source === undefined) {
    try {
      media_source = new WebKitMediaSource();
    } catch(f) {
      console.log("Unable to instatiate WebKitMediaSource object");
    }
  }
  if (!(media_source === undefined)) {
    test_matrix['supportsMSE'] = true;
  } else {
    test_matrix['supportsMSE'] = false;
  }
  // EME
  if("mediaKeys" in video_element) {
    test_matrix['supportsEME'] = true;
  } else {
    test_matrix['supportsEME'] = false;
  }
  // Flash
  test_matrix['supportsFlash'] = swfobject.hasFlashPlayerVersion('1') ? true : false;
  // NPAPI
  if(test_matrix['isMobile'] == false) {
    test_matrix['supportsNPAPI'] = _hasNPAPI();
  } else {
    test_matrix['supportsNPAPI'] = false;
  }
  return test_matrix;
}

function _isMobile() {
    var isMobile = (/iphone|ipod|android|blackberry|fennec/).test
         (navigator.userAgent.toLowerCase());
    return isMobile;
}

function _hasNPAPI() {
  // This check needs to be updated once Firefox also deprecates NPAPI
  var chromeVersion = window.navigator.userAgent.match(/Chrome\/(\d+)\./);
  if (chromeVersion && chromeVersion[1]) {
    if (parseInt(chromeVersion[1], 10) >= 42) {
      return false;
    }
  }
  return true;
}
