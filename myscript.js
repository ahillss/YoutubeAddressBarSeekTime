(()=>{
    var checkExist = null;
    
    function update_url() {
        var m = document.evaluate(
            '//ytd-playlist-panel-renderer[@id="playlist" and contains(@class,"ytd-watch-flexy")]//span[@id="index" and .="\u25b6"]/parent::*/parent::*//a/@href',
            document,null,XPathResult.STRING_TYPE,null).stringValue.match('list=([^&]+)&index=([^&]+)');

        var url = 'watch?v=' + movie_player.getVideoData().video_id;
        url+= m?('&list=' + m[1] + '&index=' + m[2]):'';
        url+= '&t=' + movie_player.getCurrentTime().toFixed() + 's';
        
        history.replaceState(null, '', url);
    }
    
    //~ function playerEvent(event) {
        //~ if (event.data==2) { //pause
            //~ update_url();
        //~ }
    //~ }
    
    function go() {
        clearInterval(checkExist);
        
        if(!location.pathname.startsWith('/watch')) {
            return;
        }
        
        //~ setTimeout(function(){
        
            //~ movie_player.addEventListener("onStateChange", playerEvent);
        //~ }, 10000);
        
        checkExist = setInterval(() => {
            if(typeof movie_player !== 'undefined' && movie_player && movie_player.getPlayerState() == 1) {
                update_url();
            }
        }, 10000);
    }

    document.addEventListener('yt-navigate-finish', go);
})();