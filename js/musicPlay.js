var musicArray=new Array(),musicIndex=0,musicCount=0,playFlag=1,fl=true,isPlay=false;
var path="./";
var lyricPath="lyric/";
var audio=document.getElementById("audio");
var curmusic=document.getElementById("cur_music");
var musicname=document.getElementById("music_name");
var musiclist=document.getElementById("list");
var playStyle=document.getElementById("playStyle");
var playStyleIndex=0;
var musiclist=document.getElementById("list");
var time_text=document.getElementById("time");
var range=document.getElementById("rag2");
var btn=document.getElementById("btn");
var musiclist=document.getElementById("list");
var lrc3=document.getElementById('lrc3');
var range1=document.getElementById("rag");
var range=document.getElementById("rag2");
var myMusic=new Mymusic(audio,path,lyricPath);
var myBar=document.querySelector('.mybar');
var barflag=false;
myMusic.doPlay=function(){
	$("#record").addClass("record");
	$("#record").attr('src',"img/m"+(this.musicIndex+1)+".jpg");
	$("#pointer").removeClass("pointer-pause");
	$("#pointer").addClass("pointer-play");
}
myMusic.doPause=function(){
	$("#record").removeClass("record");
	$("#pointer").removeClass("pointer-play");
	$("#pointer").addClass("pointer-pause");
}
myMusic.doPlayStyle=function(){
	this.playStyle.forEach(function(v,i,a){
		a[i]=false;
	})
	this.playStyle[playStyleIndex]=true;
}
myMusic.doNextMusic=function(data){
	musiclist.selectedIndex=data.musicIndex;
}
myMusic.doShowMassage=function(data){
	curmusic.innerHTML=data.cur;
	musicname.innerHTML=data.name;
}
myMusic.doUpdataTime=function(data){
	if(fl){
		// range.value=data.ct/data.dt*100;
		setBar(data.ct/data.dt*100);
		// document.querySelector("#rag2").style.cssText="background-size: "+data.ct/data.dt*100+"% 100%;";
	}
	time_text.innerHTML=data.timeStr;
} 
myMusic.doPlayMusic=function(data){
	
	btn.innerHTML=data.playStr?'&#xe616;':'&#xe61a;';
}
myMusic.doLastMusic=function(data){
	
	musiclist.selectedIndex=data.musicIndex;
}
myMusic.doClickMusic=function(data){
	
}
myMusic.doLoadLrc=function(data){
	if(!data){
		$("tr>td>div").html("");
		lrc3.innerHTML="<b>未找到歌词</b>";
	}else{
		console.log("歌词加载成功！");
	}
}
function setBar(val){
	let tip=document.querySelector('.percent-tip')
	document.styleSheets[0].addRule('div.progress-wrapper div.fill::before',"width:"+val*myBar.offsetWidth/100+'px');
	tip.style.left=val*myBar.offsetWidth/100-60+'px';
}
function changeStyle(){
	playStyleIndex=(playStyleIndex+1)%3;
	switch(playStyleIndex){
		case 0:
			playStyle.innerHTML='&#xe6a1;';
			break;
		case 1:
			playStyle.innerHTML='&#xe612;';
			break;
		case 2:
			playStyle.innerHTML='&#xe603;';
			break;
		 default:
			playStyle.innerHTML='出错了！';
	}
}
function loadMusic(){
	var musicXml=getXmlDoc("src/music.xml");
	var musics=musicXml.getElementsByTagName("name");
	for(var i=0;i<musics.length;i++){
		musicArray.push(musics[i].childNodes[0].nodeValue);
	}
	if(window.ActiveXObject!==undefined){
		$("#rag2").removeClass("range");
		$("#rag2").addClass("rang");
	}
	for(var i=0;i<musicArray.length;i++){
		musiclist.options[i]=new Option(musicArray[i]);//+".mp3"
		musiclist.options[i].setAttribute('value',musicArray[i]);
	}
	musiclist.selectedIndex=musicIndex;
	myMusic.loadMusic(musicArray);
	range1.value=myMusic.getVolume();
}
loadMusic();
function playMusic(isplay){
	myMusic.playMusic(isplay);
}
function nextMusic(){
	myMusic.nextMusic();
}
function lastMusic(){
	myMusic.lastMusic();
}
function clickMusic(){
	myMusic.clickMusic(musiclist.selectedIndex);
}
function openVideo(){
	myMusic.audio.pause();
	$('#myVideo').removeClass("none");
	$('#music').addClass("none");
	document.getElementById('video').play();
}
myBar.onclick=function(event){
	fl=true;
	let x=event.clientX;
	let ox=this.offsetLeft;
	let val=(x-ox)/this.offsetWidth;
	myMusic.audio.currentTime=myMusic.audio.duration*val;
}
// myBar.onmousemove=function(event){
// 	if(barflag){
// 		fl=false;
// 		let x=event.clientX;
// 		let ox=this.offsetLeft;
// 		let val=(x-ox)/this.offsetWidth*100;
// 		setBar(val);
// 	}
// }
// myBar.onmousedown=function(event){
// 	barflag=true;
// }
// myBar.onmouseup=function(event){
// 	barflag=false;
// 	console.log(barflag);
// }
// myBar.onmouseover=function(event){
// 	barflag=false;
// 	console.log(barflag);
// }
range1.oninput=function(event){
	var val=event.target.value;
	document.querySelector("#rag").style.cssText="background-size: "+val+"% 100%;";
}
range1.onclick=function(event){
	var val=event.target.value;
	if(val==='0'){
		$('.music-volume .iconfont').html('&#xe613;');
	}else {
		$('.music-volume .iconfont').html('&#xeb5f;');
	}
	myMusic.setVolume(val);
}
range1.onmouseup=function(event){
	var val=event.target.value;
	if(val==='0'){
		$('.music-volume .iconfont').html('&#xe613;');
	}else {
		$('.music-volume .iconfont').html('&#xeb5f;');
	}
	myMusic.setVolume(val);
}