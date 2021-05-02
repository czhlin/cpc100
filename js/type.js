function typed(obj,texts,speed){
	 var textsIndex=0;
	 var s = texts[textsIndex];
	 var con = obj;
	 var index = 0;
	 var tId = null;
	 var steps=1;
	 function start(){
	   con.text('');
	   tId=setInterval(function(){
		 con.text(s.substr(0, index));
			  index+=steps
		 if(index===s.length||index===0){
				steps*=-1;
				if(index===0){
					textsIndex=(textsIndex+1)%texts.length;
					s=texts[textsIndex];
				}
		 }
	   },speed?speed:400);
	 }
	 start();
 }