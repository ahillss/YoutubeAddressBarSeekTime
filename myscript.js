(()=>{
    var checkExist = null;
    
    function go() {
        clearInterval(checkExist);
        
        if(!location.pathname.startsWith('/watch')) {
            return;
        }
        
        checkExist = setInterval(() => {
            var v = document.querySelector("video");
            var p = v && v.parentNode.parentNode;
            
            if(p && p.getPlayerState() == 1) {
                var m = document.evaluate(
                    '//ytd-playlist-panel-renderer[@id="playlist" and contains(@class,"ytd-watch-flexy")]//span[@id="index" and .="\u25b6"]/parent::*/parent::*//a/@href',
                    document,null,XPathResult.STRING_TYPE,null).stringValue.match('list=([^&]+)&index=([^&]+)');

                var url = 'watch?v=' + p.getVideoData().video_id;
                url+= m?('&list=' + m[1] + '&index=' + m[2]):'';
                url+= '&t=' + p.getCurrentTime().toFixed() + 's';
                
                history.replaceState(null, '', url);
            }
        }, 5000);
    }

    document.addEventListener('yt-navigate-finish', go);
})();