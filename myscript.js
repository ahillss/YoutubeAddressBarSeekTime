(()=>{
    var checkExist = null;
    
    function go() {
        clearInterval(checkExist);
        
        if(!location.pathname.startsWith('/watch')) {
            return;
        }

        checkExist = setInterval(() => {
            var v = document.querySelector("video");
            var p = v.parentNode.parentNode;
            
            if(p.getPlayerState()==1) {
                var old_url = window.location.href;
                var pl_id_from_url = old_url.match('[&?]list=([^&]+)');
                var pl_ind_from_url = old_url.match('[&?]index=([^&]+)');
                
                var vid=p.getVideoData().video_id;
                var t=p.getCurrentTime();
                var pl_id = pl_id_from_url?pl_id_from_url[1]:null; //p.getPlaylistId();
                var pl_ind = pl_ind_from_url?pl_ind_from_url[1]:-1; //p.getPlaylistIndex();
                
                var url = 'watch?v='+vid;                
                url+= pl_id?('&list='+pl_id+'&index='+pl_ind):'';                
                url+='&t='+t.toFixed()+'s';
                
                history.replaceState(null, '', url);
            }
        }, 10000);
    }

    document.addEventListener('yt-navigate-finish', go);
})();