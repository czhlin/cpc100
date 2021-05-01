function Mymusic(audio,path,lyricPath){
	this.audio=audio;
	this.musicArray=[];
	this.playStyle=[true,false,false];
	this.path=path;
	this.lyricPath=lyricPath;
	this.musicIndex=0;
	this.musicCount=0;
	this.playFlag=1;
	this.isPlay=false;
	this.lrcArray=[];
	this.lrcline=0;
	this.isLoadLrc=false;
	this.doPlay=function(){
		
	}
	this.doPause=function(){
		
	}
	this.doPlayStyle=function(){
		
	}
	this.doNextMusic=function(data){
		
	}
	this.doShowMassage=function(data){
		
	}
	this.doUpdataTime=function(data){
		
	} 
	this.doPlayMusic=function(data){
		
	}
	this.doLastMusic=function(data){
		
	}
	this.doClickMusic=function(data){
		
	}
	this.doLoadLrc=function(data){
		
	}
}
function getTextDoc(url){
	var xhr;
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else{
		xhr=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open("GET",url,false);
	xhr.send();
	var textDoc=xhr.responseText;
	return textDoc;
}
Mymusic.prototype.showMassage=function(){
	const curmusic=(this.musicIndex+1)+"/"+this.musicCount;
	const musicname=this.musicArray[this.musicIndex]+".mp3";
	this.doShowMassage({"cur":curmusic,"name":musicname});
}
Mymusic.prototype.loadMusic=function(musicArray){
	this.musicCount=musicArray.length;
	this.audio.src=this.path+"src/"+musicArray[this.musicIndex]+".mp3";
	this.musicArray=musicArray;
	this.audio.addEventListener("ended",()=>{this.nextMusic();},true);
	this.audio.addEventListener("timeupdate",()=>{this.updataTime();},true);
	this.audio.addEventListener("durationchange",()=>{
		this.loadLrc(this.musicIndex);
		this.updataTime();
	},true);
	this.audio.addEventListener("play",()=>{
		this.doPlay();
		if(this.isPlay){
			this.playMusic(true);
		}
		this.isPlay=true;
	},true);
	this.audio.addEventListener("pause",()=>{
		this.doPause();
		if(this.isPlay){
			this.playMusic(true);
		}
		this.isPlay=true;
	},true);
	this.showMassage();
}
Mymusic.prototype.getFormatTime=function(time){
	let m=parseInt(time%3600/60),
		s=parseInt(time%60);
	m=m<10?"0"+m:m;
	s=s<10?"0"+s:s;
	return m+":"+s;
}
Mymusic.prototype.updataTime=function(){
	const audio=this.audio;
	const ct=audio.currentTime;
	const dt=audio.duration;
	for(let i=0;i<this.lrcArray.length;i++){
		if (ct>this.lrcArray[i][0]) {
			this.lrcline=i;
		} else if(ct<=this.lrcArray[i][0]){
			this.lrcline=i-1;
			break;
		}
	}
	this.updateLrc(this.lrcline);
	const data= {
		"timeStr":this.getFormatTime(ct)+"/"+this.getFormatTime(dt),
		"ct":ct,
		"dt":dt
	};
	this.doUpdataTime(data);
}
Mymusic.prototype.playMusic=function(){
	if(this.playFlag){
		if(!this.isplay){
			this.isPlay=false;
			this.audio.pause();
		}
		this.playFlag=0;
	}else{
		if(!this.isplay){
			this.isPlay=false;
			this.audio.play();
		}
		this.playFlag=1;
	}
	this.doPlayMusic({"playStr":this.playFlag===0?false:true});
}
Mymusic.prototype.nextMusic=function(){
	this.doPlayStyle();
	if(this.playStyle[0]){
		this.musicIndex++;
	}else if(this.playStyle[1]){
		if(this.audio.currentTime!=this.audio.duration){
			this.musicIndex++;
		}
	}else if(this.playStyle[2]){
		this.musicIndex=Math.floor(Math.random()*this.musicCount);
	}
	if(this.musicIndex>=this.musicCount){
		this.musicIndex=0;
	}
	this.audio.src=this.path+"src/"+this.musicArray[this.musicIndex]+".mp3";
	if(this.playFlag==1){
		this.playFlag=0;
	}
	this.showMassage();
	this.doNextMusic({"musicIndex":this.musicIndex});
}
Mymusic.prototype.lastMusic=function(){
	this.doPlayStyle();
	if(this.playStyle[0]){
		this.musicIndex--;
	}else if(this.playStyle[1]){
		if(this.audio.currentTime!=this.audio.duration){
			this.musicIndex--;
		}
	}else if(this.playStyle[2]){
		this.musicIndex=Math.floor(Math.random()*this.musicCount);
	}
	if(this.musicIndex<0){
		this.musicIndex=this.musicCount-1;
	}
	this.audio.src=this.path+"src/"+musicArray[this.musicIndex]+".mp3";
	if(this.playFlag==1){
		this.playFlag=0;
	}
	this.showMassage();
	this.doLastMusic({"musicIndex":this.musicIndex})
}
Mymusic.prototype.clickMusic=function(selectedIndex){
	this.musicIndex=selectedIndex;
	this.audio.src=this.path+"src/"+this.musicArray[this.musicIndex]+".mp3";
	if(this.playFlag==1){
		this.playFlag=0;
	}
	this.showMassage();
	this.doClickMusic({"musicIndex":this.musicIndex});
}
Mymusic.prototype.loadLrc=function(index){
	this.lrcline=0;
	let res=true;
	try{
		const lrcdoc=getTextDoc(this.lyricPath+this.musicArray[index]+".lrc");
		this.lrcArray=this.parseLyric(lrcdoc);
		this.isLoadLrc=true;
	}catch(e){
		this.lrcArray=[];
		res=false;
		this.isLoadLrc=false;
	}
	console.log(this);
	this.doLoadLrc(res);
}
Mymusic.prototype.updateLrc=function(line){
	if(this.isLoadLrc){
		const lrcshowArray=new Array(
			$("#lrc1"),$("#lrc2"),$("#lrc3"),$("#lrc4"),$("#lrc5")
		);
		for(let i=0;i<5;i++){
			if(!this.lrcArray[line+i-2]||this.lrcArray[line+i-2][1]===''){
				lrcshowArray[i].html("......");
			}else{
				lrcshowArray[i].html("<b>"+this.lrcArray[line+i-2][1]+"</b>");
			}
		}
	}
}
Mymusic.prototype.setVolume=function(val){
	let v=val/100;
	if(v>1){
		v=1;
	}else if(v<0){
		v=0;
	}
	this.audio.volume=v;
}
Mymusic.prototype.getVolume=function(){
	return this.audio.volume*100;
}
Mymusic.prototype.parseLyric=function(text){
	//将文本分隔成一行一行，存入数组
	var lines = text.split('\n'),
	    //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
	    pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
	    //保存最终结果的数组
	    result = [];
	//去掉不含时间的行
	
	while (!pattern.test(lines[0])) {
		if(lines.length==0)break;
	    lines = lines.slice(1);
	};
	
	//上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
	lines[lines.length - 1].length === 0 && lines.pop();
	lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
	    //提取出时间[xx:xx.xx]
	    var time = v.match(pattern),
	        //提取歌词
	        value = v.replace(pattern, '');
	    //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
	    time.forEach(function(v1, i1, a1) {
	        //去掉时间里的中括号得到xx:xx.xx
	        var t = v1.slice(1, -1).split(':');
	        //将结果压入最终数组
	        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
	    });
	});
	//最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
	result.sort(function(a, b) {
	    return a[0] - b[0];
	});
	return result;
}