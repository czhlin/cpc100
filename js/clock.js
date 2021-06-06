var Flipper = /** @class */ (function() {
    function Flipper(node, currentTime, nextTime) {
        this.isFlipping = false;
        this.duration = 600;
        this.flipNode = node;
        this.frontNode = node.querySelector(".front");
        this.backNode = node.querySelector(".back");
        this.setFrontTime(currentTime);
        this.setBackTime(nextTime);
    }
    Flipper.prototype.setFrontTime = function(time) {
        this.frontNode.dataset.number = time;
    };
    Flipper.prototype.setBackTime = function(time) {
        this.backNode.dataset.number = time;
    };
    Flipper.prototype.flipDown = function(currentTime, nextTime) {
        var _this =this;
        if(this.isFlipping) {
            return false;
        }
        this.isFlipping = true;
        this.setFrontTime(currentTime);
        this.setBackTime(nextTime);
        this.flipNode.classList.add("running");
        setTimeout(function() {
            _this.flipNode.classList.remove("running");
            _this.isFlipping = false;
            _this.setFrontTime(nextTime);
        }, this.duration);
    };
    return Flipper;
}());

var getTimeFromDate = function(date) {
	date=Math.abs(date)
    var day=parseInt(date/60/60/24);
	if(day<100){
		if(day<10){
			day='00'+day
		}else{
			day='0'+day
		}
		
	}
	var hour=parseInt(date/60/60%24);
	if(hour<10){
		hour='0'+hour
	}
	var min=parseInt(date/60%60);
	if(min<10){
		min='0'+min
	}
	var sec=parseInt(date%60);
	if(sec<10){
		sec='0'+sec
	}
	return day+""+hour+""+min+""+sec;
};

var flips = document.querySelectorAll(".flip");
var now = new Date();
var endTime=new Date("2021/07/01 00:00:00");
var subTime=parseInt((endTime-now)/1000);
var text=document.querySelector('.clock .title')
var nowTimeStr;
var nextTimeStr;
nowTimeStr = getTimeFromDate(subTime);
nextTimeStr = getTimeFromDate(subTime-1);
var flippers = Array.from(flips).map(function(flip, i) {return new Flipper(flip, nowTimeStr[i], nextTimeStr[i]);});
setInterval(function() {
   var now =new Date();
   var subTime=parseInt((endTime-now)/1000);
   var nowTimeStr;
   var nextTimeStr;
   nowTimeStr = getTimeFromDate(subTime);
   nextTimeStr = getTimeFromDate(subTime-1);
   if(subTime<=0){
   	   text.innerHTML="离建党一百年过去了:"
	   if(subTime===0){
		   console.log(111);
		    return;
	   }
   }
   console.log(subTime);
 //   if(subTime>0&&subTime<=1){
	// 	nowTimeStr = getTimeFromDate(subTime);
	// 	nextTimeStr = getTimeFromDate(subTime+1);
	// }
    for(var i=0; i < flippers.length; i++) {
        if(nowTimeStr[i] === nextTimeStr[i]) {
            continue;
        }
        flippers[i].flipDown(nowTimeStr[i], nextTimeStr[i]);
    }
},1000);