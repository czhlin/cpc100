function getXmlDoc(url){
	var xhr;
	if(window.ActiveXObject){
		try{
			xhr=new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				xhr= new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				alert("你的IE不正常!")
			}
			//TODO handle the exception
		}
	}else{
		xhr=new XMLHttpRequest();
	}
	xhr.open("GET",url,false);
	xhr.send();
	var xmlDoc=xhr.responseXML;
	return xmlDoc;
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
function parseLyric(text) {
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