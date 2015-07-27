function grabURL(document_root) {
    var video = [];
    var documentVideo = document_root.getElementsByTagName('video');

    for (var j = 0; j < documentVideo.length; j++) {
                    video.push(documentVideo[j]);
                }

                

    if (video.length == 0){
        var iframes = document_root.getElementsByTagName('iframe');
         if (iframes.length == 0){
            return "No video found";
         }

         for(var i=0; i< iframes.length; i++){
            try{
                var item = iframes[i];
                var itemDoc = item.contentDocument || item.contentWindow.document;
                var iframeVideos = itemDoc.getElementsByTagName('video');
                for (var j = 0; j < iframeVideos.length; j++) {
                    video.push(iframeVideos[j]);
                }
            }catch(exception){
              console.log(exception);
            }    
            
         }
    }
    if (video.length == 0){
       return "No video found";
    }

    var response = "";
         for(var i in video){
                     var sources = video[i].getElementsByTagName('source');
                     for (var j = 0; j < sources.length; j++) {
                            response+=sources[j].src+"#t="+ video[i].currentTime+" ";  
                     }
                      
         }
    
    return response;
}

chrome.extension.sendMessage({
    action: "getSource",
    source: grabURL(document)
});