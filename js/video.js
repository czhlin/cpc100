		var video=document.getElementById('video');
		var playIconfont=document.querySelector('.video-play .iconfont');
		var timeSpan=document.getElementById('videoTime');
		var timeBar=document.querySelector('.videoBar .bar input');
		var volumeBar=document.querySelector('.video-volume input.volume-range');
		var PlayFlag=true;
		var videoIndex=0;
		var flVideo=true;
		var videolist=document.getElementById('videoList');
		var videos=[
			{
				name:'中国共产党为何能让旧中国面貌焕然一新 ',
				src:'http://flv4mp4.people.com.cn/videofile6/pvmsvideo/2020/9/30/SongHeLi_a5b06e962720df5c36d4e60b2ebb6f32_android_c.mp4'
			},
			{
				name:'中国共产党为什么能建立新中国',
				src:'http://flv4mp4.people.com.cn/videofile7/pvmsvideo/2020/12/25/SongHeLi_488c1b771d69704f8745972409f64528.mp4'
			},
			{
				name:'六大特质决定中国共产党取得现代化建设巨大成就',
				src:'http://flv4mp4.people.com.cn/videofile7/pvmsvideo/2020/12/25/SongHeLi_488c1b771d69704f8745972409f64528_android_c.mp4'
			},
			{
				name:'为什么说中国共产党在抗战中发挥了中流砥柱作用',
				src:'http://flv4mp4.people.com.cn/videofile6/pvmsvideo/2020/9/2/SongHeLi_616dc95320e7c80fb416eeb049df3ec6_android_c.mp4'
			},
			{
				name:'抗战胜利是全体中华儿女的荣光',
				src:'http://flv4mp4.people.com.cn/videofile6/pvmsvideo/2020/9/4/SongHeLi_9e780ed3976e97b749bdd4b87f8460ec_android_c.mp4'
			}
		];
		var videoCount=videos.length;
		for(var i=0;i<videos.length;i++){
			videolist.options[i]=new Option(videos[i].name);
			videolist.options[i].setAttribute('value',videos[i].name);
		}
		videolist.selectedIndex=0;
		video.src=videos[0].src;
		video.pause();
		video.addEventListener("timeupdate",function(){
			updataTime();
		},true);
		video.addEventListener("pause",function(){
			PlayFlag=false;
			playIconfont.innerHTML='&#xe62b;'
		},true);
		video.addEventListener("play",function(){
			PlayFlag=true;
			playIconfont.innerHTML='&#xe62a;'
		},true);
		video.addEventListener("ended",function(){
			nextVideo();
		},true);
		video.addEventListener('volumechange', function(e) {
			var val=video.volume*100;
			if(val===0){
				document.querySelector('.video-volume .iconfont').innerHTML='&#xe613;';
			}else {
				document.querySelector('.video-volume .iconfont').innerHTML='&#xeb5f;';
			}
			volumeBar.style.cssText="background-size: "+val+"% 100%;";
			volumeBar.value=val;
		},true)
		timeBar.oninput=function(event){
			var val=event.target.value;
			timeBar.style.cssText="background-size: "+val+"% 100%;";
		}
		timeBar.onchange=function(){
			video.currentTime=video.duration*(timeBar.value/timeBar.max);
			flVideo=true;
		}
		timeBar.onmouseover=function(envent){
			flVideo=false;
		}
		timeBar.onmouseout=function(){
			flVideo=true;
		}
		volumeBar.oninput=function(){
			var val=event.target.value;
			volumeBar.style.cssText="background-size: "+val+"% 100%;";
		}
		volumeBar.onclick=function(event){
			var val=event.target.value;
			if(val==='0'){
				document.querySelector('.video-volume .iconfont').innerHTML='&#xe613;';
			}else {
				document.querySelector('.video-volume .iconfont').innerHTML='&#xeb5f;';
			}
			video.volume=val/100;
		}
		volumeBar.onmouseup=function(event){
			var val=event.target.value;
			if(val==='0'){
				document.querySelector('.video-volume .iconfont').innerHTML='&#xe613;';
			}else {
				document.querySelector('.video-volume .iconfont').innerHTML='&#xeb5f;';
			}
			video.volume=val/100;
		}
		function opemMusic(){
			myMusic.playMusic(true);
			$('#myVideo').addClass("none");
			$('#music').removeClass("none");
			document.getElementById('video').pause();
		}
		function getFormatTime(time){
			var m=parseInt(time%3600/60),
				s=parseInt(time%60);
			m=m<10?"0"+m:m;
			s=s<10?"0"+s:s;
			return m+":"+s;
		}
		function updataTime(){
			timeSpan.innerHTML=getFormatTime(video.currentTime)+"/"+getFormatTime(video.duration);
			if(flVideo){
				timeBar.value=video.currentTime/video.duration*100;
				timeBar.style.cssText="background-size: "+timeBar.value+"% 100%;";
			}
		}
		function playVideo(){
			if(PlayFlag){
				video.pause();
				PlayFlag=false;
				playIconfont.innerHTML='&#xe62b;'
			}else{
				video.play();
				PlayFlag=true;
				playIconfont.innerHTML='&#xe62a;'
			}
		}
		function clickVideo(){
			videoIndex=videolist.selectedIndex;
			video.src=videos[videoIndex].src;
		}
		function lastVideo(){
			videoIndex=(videoIndex-1)%videoCount;
			videoIndex=videoIndex<0?videoCount-1:videoIndex;
			video.src=videos[videoIndex].src;
			videolist.selectedIndex=videoIndex;
		}
		function nextVideo(){
			videoIndex=(videoIndex+1)%videoCount;
			video.src=videos[videoIndex].src;
			videolist.selectedIndex=videoIndex;
		}
		function fillVideo(){
			video.requestFullscreen();
		}