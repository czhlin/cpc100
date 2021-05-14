function typed(obj,texts,speed){
	 var textsIndex=0;
	 var s = texts[textsIndex];
	 var con = obj;
	 var index = 0;
	 var tId = null;
	 var steps=1;
	 var time=0;
	 var pauseTime=parseInt(3000/(speed?speed:400)) 
	 function start(){
	   con.text('');
	   tId=setInterval(function(){
		 con.text(s.substr(0, index));
			  index+=steps
		 if(index===s.length&&time===0||time===pauseTime){
				if(steps==1){
					steps*=0;
				}else{
					steps=1;
					index=0;
					time=0;
				}
				if(index===0){
					textsIndex=(textsIndex+1)%texts.length;
					s=texts[textsIndex];
				}
		 }
		 if(steps===0){
			 time++;
		 }
	   },speed?speed:400);
	 }
	 start();
 }