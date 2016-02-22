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
    ref.advanced = "En förutsättning för att det skall fungera på både Chrome och Internet Explorer är att tjänsten använder sig av både Widevine Modular och Playready för skydda det rättighetsskyddade materialet. Använder du Mozilla Firefox så fungerar det inte då det saknas stöd för att hantera rättighettskyddat material.";
    return "Goda";
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
    ref.advanced = "Många webbläsare uppvisar bättre prestanda för videouppspelning när inte Flash- eller Silverlight-baserade videouppspelare används. Det är dock inte möjligt att spela upp rättighetsskyddat innehåll Flash eller Silverlight med din webbläsare.";
    return "Goda";
  } else if (matrix['isMobile'] == true &&
      matrix['supportsMSE'] == false &&
      matrix['supportsEME'] == false &&
      matrix['supportsFlash'] == false &&
      matrix['supportsNPAPI'] == false )
  {
    ref.summary = "Det finns mindre goda förutsättningar för att du skall kunna titta på strömmande video med den webbläsare du använder. Du kan uppleva problem hos vissa tjänster med att titta på live video även om du har en bra Internetanslutning.";
    ref.advanced = "En förutsättning är att tjänsten tillhandahåller streamingformatet HLS och att din mobil har stöd för formatet. Vissa äldre modeller av Android har inte stöd för detta. Har du en äldre modell av Android så krävs det att tjänsten tillhandahåller RTSP och att nätverket du sitter på tillåter trafik på den porten."
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
  var media_source = new MediaSource();
  if (media_source) {
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
  test_matrix['supportsNPAPI'] = _hasNPAPI();
  return test_matrix;
}

function _isMobile() {
    var isMobile = (/iphone|ipod|android|ie|blackberry|fennec/).test
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
