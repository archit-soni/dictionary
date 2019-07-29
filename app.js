var url;
async function getData()
{
	document.getElementById("result").style.display="none";
	document.getElementById("title").style.display="none";
	document.getElementById("def").style.display="none";
	document.getElementById("MeaningList").innerHTML="";
	document.getElementById("title").innerHTML="";
	document.getElementById("partOfSpeech").innerHTML="";
	document.getElementsByClassName("noRes")[0].innerHTML = "";
	var word = document.getElementById("searchBox").value;
	if(word=="" || word==null)
	{
		document.getElementsByClassName("errorMsg")[0].innerHTML='Please enter any word.';
	}
	else
	{
		url ="https://dictionaryapi.com/api/v3/references/thesaurus/json/"+word+
        "?key=b67d3a27-4708-43a2-b8fa-3556514e9029";
		const def = await fetch(url);
	 	const jsonobj = await def.json();
	 	console.log(jsonobj[0]);
	 	if(typeof(jsonobj[0])=="string")
	 	{
	 		var sugg = jsonobj[0];
			for (var i = 1; i < jsonobj.length ; i++) 
			{
			 	sugg = sugg + ', '+jsonobj[i];
			}
			console.log(sugg);
			var show = document.getElementsByClassName("noRes")[0];
			show.style.display="block";
	 		show.innerHTML = 'Sorry! No results found. Did you mean any of '+
	 		sugg+ '?';
	 	}
	 	else
	 	{
	 		var partOfSpeech = jsonobj[0].fl;
			 console.log(typeof(jsonobj[0]));
			var syn = jsonobj[0].meta.syns[0];
		 	var defs= [];
		 	defs=jsonobj[0].shortdef;
			 var output="";
			 var synoutput="";
			 for (var i = 0; i < defs.length; i++) 
				  output = output + '<li class="define">'+defs[i]+'</li>';
			for(var j = 0; j < syn.length; j++)
				synoutput = synoutput + '<li class="define">'+syn[j]+'</li>';
		    document.getElementById("partOfSpeech").innerHTML=partOfSpeech;
			document.getElementById("MeaningList").innerHTML=output;
			document.getElementById("SynonymList").innerHTML=synoutput;
	 	}
	 	
	    document.getElementById("result").style.display="flex";
	    document.getElementById("title").style.display="block";
	    document.getElementById("title").innerHTML=word;
	    document.getElementById("def").style.display="block";
	   
	}
	
	

}


window.addEventListener('load', async e => {
    console.log(navigator.onLine);
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceworker.js');
            console.log('SW registered');
        } catch (error) {
            console.log('SW failed');

        }
    }
});