///javaScript/getGainersLosersData.js

var boolChange=false;
var changeTo="";
var gainers="Gainers1";
var losers="Losers1";
function gainer(type){
	getGainerLoser(type,gainers);
}
function loser(type){
	getGainerLoser(type,losers);
}
function getGainerLoser(type,gl)
{
	var fName= type+gl+".json";
	var topTime = document.getElementById('dataTime');
	//alert('/live_market/content/live_analysis/'+gl.toLowerCase()+'/'+fName);
	$.get('/live_market/dynaContent/live_analysis/'+gl.toLowerCase().substring(0,gl.length-1)+'/'+fName,
			function(html){
					if(gl==losers){
						var topTable = document.getElementById('topLosers');						
						fillInDivs(html,topTable, topTime);
						
						$("#tab8Content ul li a").each(function(){			
							id=this.id;	
							//alert(id+"::L"+type);
							if(id=="L"+type)
								$(this).addClass("sel");
							else
								$(this).removeClass("sel");					
							
						});	
						
					}
					else
					{
						var topTable = document.getElementById('topGainers');
						fillInDivs(html,topTable,topTime);
						
						$("#tab7Content ul li a").each(function(){			
							id=this.id;	
							//alert(id+"::L"+type);
							if(id=="G"+type)
								$(this).addClass("sel");
							else
								$(this).removeClass("sel");					
							
						});
					}
				}
		);
}

function getTopGainersData(){
	gainer("nifty");//gainer("allTop"); 
}

function getTopLosersData(){
	loser("nifty");//loser("allTop");
}

function fillInDivs(html, tableName, timeName){
	var rows = tableName.getElementsByTagName('tr');
	var dataTime=eval('('+html+')');
	var data = dataTime.data;
	var time = dataTime.time;
	var tblCsv = "Symbol,LTP,% Change,Traded Qty,Traded Value,Open,High,Low,Prev Close,Latest Ex Date,Corporate Action";
	tblCsv= tblCsv+":";
	for (i = 0; i < data.length; i++)
	{
	//pradyumna Started
		var obj = data[i];
		var caImg='';
		if(obj && (obj.lastCorpAnnouncement && obj.lastCorpAnnouncement!='-') && (obj.lastCorpAnnouncementDate && obj.lastCorpAnnouncementDate!='-')){			
			caImg = '<img style=float:right title="'+obj.lastCorpAnnouncement+'" src="/live_market/resources/images/note_ico.gif"></img>';			
		}
		//pradyumna ended
		var fieldIndex = 0;
		var cells = rows[i+1].getElementsByTagName('td'); 
		cells[fieldIndex++].innerHTML = !data[i]?'-':'<a href ="/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?symbol='+escape(data[i].symbol)+'" target="_blank">'+data[i].symbol+'</a>'; 
		cells[fieldIndex++].innerHTML = !data[i]?'-':data[i].ltp;
		cells[fieldIndex++].innerHTML = !data[i]?'-':data[i].netPrice;
		cells[fieldIndex++].innerHTML = !data[i]?'-':data[i].tradedQuantity;
		cells[fieldIndex++].innerHTML = !data[i]?'-':data[i].turnoverInLakhs;
		cells[fieldIndex++].innerHTML = !data[i]?'-':data[i].openPrice;
		cells[fieldIndex++].innerHTML = !data[i]?'-':data[i].highPrice;
		cells[fieldIndex++].innerHTML = !data[i]?'-':data[i].lowPrice;
		cells[fieldIndex++].innerHTML = !data[i]?'-':data[i].previousPrice;
		cells[fieldIndex++].innerHTML = !data[i]?'-':data[i].lastCorpAnnouncementDate;
		cells[fieldIndex++].innerHTML = caImg;
	
		tblCsv=tblCsv+"\""+data[i].symbol+"\",\""+data[i].ltp+"\",\""+data[i].netPrice+"\",\""+data[i].tradedQuantity+"\",\""+data[i].turnoverInLakhs+"\",\""+data[i].openPrice+"\",\""+data[i].highPrice+"\",\""+data[i].lowPrice+"\",\""+data[i].previousPrice+"\",\""+data[i].lastCorpAnnouncementDate+"\",\""+data[i].lastCorpAnnouncement+"\":";
	}
	timeName.innerHTML = 'As on '+time+' IST';
	$("#datacsv").val(tblCsv);


	var datalength = data.length;
	
	//alert("11>>>>>>>>>>>"+datalength);
	if (datalength<10){

		for (j = i; j < 10; j++){
		var fieldIndex = 0;
		var cells = rows[j+1].getElementsByTagName('td'); 
		cells[fieldIndex++].innerHTML = "-"; 
		cells[fieldIndex++].innerHTML = "-";
		cells[fieldIndex++].innerHTML = "-";
		cells[fieldIndex++].innerHTML ="-";
		cells[fieldIndex++].innerHTML = "-";
		cells[fieldIndex++].innerHTML ="-";
		cells[fieldIndex++].innerHTML = "-";
		cells[fieldIndex++].innerHTML ="-";
		cells[fieldIndex++].innerHTML = "-";
		cells[fieldIndex++].innerHTML = "-";
		cells[fieldIndex++].innerHTML = "-";
	}

	}
}