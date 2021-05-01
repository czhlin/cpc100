function Guohui(x,y,w,time){
	this.n=w/32;
	this.x=x;
	this.y=y;
	this.time=time;
	this.isDraw=false;
}
Guohui.prototype.drawFu=function(ctx,ox,oy,x1,y1,x2,y2,counterclockwise){
	const b=Math.sqrt(Math.pow(Math.abs(ox-x1),2)+Math.pow(Math.abs(oy-y1),2))
	const c=Math.sqrt(Math.pow(Math.abs(ox-x2),2)+Math.pow(Math.abs(oy-y2),2))
	const α=Math.atan2(y1-oy,x1-ox);
	const β=Math.atan2(y2-oy,x2-ox);
	if(α>β){
		if(counterclockwise){
			ctx.arc(ox,oy,b,α,β,true);
		}else{
			ctx.arc(ox,oy,b,β,α,false);
		}
	}else if(α<β){
		if(counterclockwise){
			ctx.arc(ox,oy,b,β,α,true);
		}else{
			ctx.arc(ox,oy,b,α,β,false);
		}
		
	}else{
		if(counterclockwise){
			ctx.arc(ox,oy,b,α+Math.PI*2,α,true);
		}else{
			ctx.arc(ox,oy,b,α,α+Math.PI*2,false);
		}
	}
}
Guohui.prototype.drawBg=function(ctx){
	const n=this.n;
	const x=this.x-160;
	const y=this.y-160;
	//画背景start
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+32*n,y);
	ctx.lineTo(x+32*n,y+32*n);
	ctx.lineTo(x,y+32*n);
	ctx.lineTo(x,y);
	ctx.closePath();
	ctx.fillStyle="red";
	ctx.fill();
	// 画背景end
}
Guohui.prototype.drawHammer=function(ctx){
	const n=this.n;
	const x=this.x-160;
	const y=this.y-160;
	const drawFu=this.drawFu;
	// 画锤子start
	ctx.beginPath();
	ctx.moveTo(28*n+x,32*n+y);
	ctx.lineTo(32*n+x,28*n+y);
	ctx.lineTo(14.5*n+x,10.5*n+y);
	ctx.lineTo(18.5*n+x,6.5*n+y);
	ctx.lineTo(16*n+x,4*n+y);
	drawFu(ctx,12.5*n+x,y,16*n+x,4*n+y,11*n+x,5*n+y);
	ctx.lineTo(3*n+x,13*n+y);
	ctx.lineTo(7.5*n+x,17.5*n+y);
	ctx.lineTo(10.5*n+x,14.5*n+y);
	ctx.lineTo(28*n+x,32*n+y);
	ctx.closePath();
	ctx.fillStyle="yellow";
	ctx.fill();
	// 画锤子end
}
Guohui.prototype.drawSickle=function(ctx){
	const n=this.n;
	const x=this.x-160;
	const y=this.y-160;
	const drawFu=this.drawFu;
	function drawRact(ctx){
		//刀把矩形部分start
		ctx.beginPath();
		ctx.moveTo(3*n+x,27*n+y);
		ctx.lineTo(4*n+x,26*n+y);
		ctx.lineTo(6*n+x,28*n+y);
		ctx.lineTo(5*n+x,29*n+y);
		ctx.lineTo(3*n+x,27*n+y);
		ctx.closePath();
		ctx.fillStyle="yellow";
		ctx.fill();
		//刀把矩形部分end
	}
	function drawBlade(ctx){
		//刀刃start
		ctx.beginPath();
		ctx.moveTo(16*n+x,y);
		drawFu(ctx,10*n+x,15.5*n+y,16*n+x,y,26.5*n+x,15.5*n+y);
		drawFu(ctx,15.5*n+x,15.5*n+y,26.6*n+x,15.5*n+y,15.5*n+x,26.6*n+y);
		drawFu(ctx,15.5*n+x,10*n+y,15.5*n+x,26.6*n+y,3.5*n+x,21.5*n+y);
		ctx.lineTo(1*n+x,24*n+y);
		drawFu(ctx,16*n+x,14*n+y,1*n+x,24*n+y,16*n+x,32*n+y,true);
		drawFu(ctx,16*n+x,16*n+y,16*n+x,32*n+y,16*n+x,y,true);
		ctx.closePath();
		ctx.fillStyle="yellow";
		ctx.fill();
		//刀刃end
	}
	function drawCirc(ctx){
		//刀把圆形部分start
		ctx.beginPath();
		ctx.moveTo(3*n+x,27*n+y);
		drawFu(ctx,2.5*n+x,29.5*n+y,3*n+x,27*n+y,3*n+x,27*n+y);
		ctx.closePath();
		ctx.fillStyle="yellow";
		ctx.fill();
		//刀把圆形部分end
	}
	// 画镰刀start
	//刀刃start
	drawBlade(ctx);
	//刀刃end
	//刀把start
	drawRact(ctx);
	drawCirc(ctx);
	//刀把end
	// 画镰刀end
}
//静态画国徽
Guohui.prototype.draw=function(ctx){
	//画国徽start
	this.drawBg(ctx);
	this.drawHammer(ctx);
	this.drawSickle(ctx);
	//画国徽end
}
//动态画国徽
Guohui.prototype.dynDraw=function(ctx){
	const n=this.n;
	const x=this.x-160;
	const y=this.y-160;
	const drawFu=this.drawFu;
	if(this.isDraw){
		return;
	}
	this.isDraw=true;
	const clear=()=>{
		ctx.canvas.width+=0;
	}
	const drawBg=(time)=>{
		clear();
		//画背景start
		setTimeout(()=>{ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+32*n,y);ctx.stroke();},time);
		setTimeout(()=>{ctx.moveTo(x,y);ctx.lineTo(x+32*n,y);},2*time);
		setTimeout(()=>{ctx.lineTo(x+32*n,y+32*n);ctx.stroke();},3*time);
		setTimeout(()=>{ctx.lineTo(x,y+32*n);ctx.stroke();},4*time);
		setTimeout(()=>{ctx.lineTo(x,y);ctx.stroke();},5*time);
		setTimeout(()=>{ctx.lineTo(x,y);ctx.stroke();},6*time);
		setTimeout(()=>{clear();this.drawBg(ctx);},7*time);
		//画背景end
		setTimeout(()=>{drawHammer(this.time);},8*time);
	}
	const drawHammer=(time)=>{
		setTimeout(()=>{
			ctx.beginPath();
			ctx.moveTo(28*n+x,32*n+y);
			ctx.lineTo(32*n+x,28*n+y);
			ctx.stroke();
		},time);
		setTimeout(()=>{
			ctx.lineTo(14.5*n+x,10.5*n+y);
			ctx.stroke();
		},2*time);
		setTimeout(()=>{
			ctx.lineTo(18.5*n+x,6.5*n+y);
			ctx.stroke();
		},3*time);
		setTimeout(()=>{
			ctx.lineTo(16*n+x,4*n+y);
			ctx.stroke();
		},4*time);
		setTimeout(()=>{
			drawFu(ctx,12.5*n+x,y,16*n+x,4*n+y,11*n+x,5*n+y);
			ctx.stroke();
		},5*time);
		setTimeout(()=>{
			ctx.lineTo(3*n+x,13*n+y);
			ctx.stroke();
		},6*time);
		setTimeout(()=>{
			ctx.lineTo(7.5*n+x,17.5*n+y);
			ctx.stroke();
		},7*time);
		setTimeout(()=>{
			ctx.lineTo(7.5*n+x,17.5*n+y);
			ctx.stroke();
		},8*time);
		setTimeout(()=>{
			ctx.lineTo(10.5*n+x,14.5*n+y);
			ctx.stroke();
		},9*time);
		setTimeout(()=>{
			ctx.lineTo(28*n+x,32*n+y);
			ctx.stroke();
		},10*time);
		setTimeout(()=>{
			clear();
			this.drawBg(ctx);
			this.drawHammer(ctx);
		},11*time);
		setTimeout(()=>{drawSickle(this.time);},12*time);
	}
	const drawSickle=(time)=>{
		const drawBlade=()=>{
			//刀刃start
			setTimeout(()=>{
				ctx.beginPath();
				ctx.moveTo(16*n+x,y);
				drawFu(ctx,10*n+x,15.5*n+y,16*n+x,y,26.5*n+x,15.5*n+y);
				ctx.stroke();
			},time);
			setTimeout(()=>{
				drawFu(ctx,15.5*n+x,15.5*n+y,26.6*n+x,15.5*n+y,15.5*n+x,26.6*n+y);
				ctx.stroke();
			},2*time);
			setTimeout(()=>{
				drawFu(ctx,15.5*n+x,10*n+y,15.5*n+x,26.6*n+y,3.5*n+x,21.5*n+y);
				ctx.stroke();
			},3*time);
			setTimeout(()=>{
				ctx.lineTo(1*n+x,24*n+y);
				ctx.stroke();
			},4*time);
			setTimeout(()=>{
				drawFu(ctx,16*n+x,14*n+y,1*n+x,24*n+y,16*n+x,32*n+y,true);
				ctx.stroke();
			},5*time);
			setTimeout(()=>{
				drawFu(ctx,16*n+x,16*n+y,16*n+x,32*n+y,16*n+x,y,true);
				ctx.closePath();
				ctx.stroke();
			},6*time);
			setTimeout(()=>{
				drawRact()
			},7*time);
		}
		const drawRact=()=>{
			//刀把矩形部分start
			setTimeout(()=>{
				ctx.beginPath();
				ctx.moveTo(3*n+x,27*n+y);
				ctx.lineTo(4*n+x,26*n+y);
				ctx.stroke();
			},time);
			setTimeout(()=>{
				ctx.lineTo(6*n+x,28*n+y);
				ctx.stroke();
			},2*time);
			setTimeout(()=>{
				ctx.lineTo(5*n+x,29*n+y);
				ctx.stroke();
			},3*time);
			setTimeout(()=>{
				ctx.lineTo(3*n+x,27*n+y);
				ctx.closePath();
				ctx.stroke();
			},4*time);
			//ctx.fillStyle="yellow";
			//ctx.fill();
			//刀把矩形部分end
			setTimeout(()=>{
				drawCirc()
			},5*time);
		}
		const drawCirc=()=>{
			//刀把圆形部分start
			setTimeout(()=>{
				ctx.beginPath();
				ctx.moveTo(3*n+x,27*n+y);
				drawFu(ctx,2.5*n+x,29.5*n+y,3*n+x,27*n+y,3*n+x,27*n+y);
				ctx.closePath();
				ctx.stroke();
			},time);
			//刀把圆形部分end
			setTimeout(()=>{
				clear();
				this.draw(ctx);
				this.isDraw=false;
			},2*time);
		}
		drawBlade();
	}
	drawBg(this.time);
}