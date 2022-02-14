var userFormEl = document.querySelector("#form");
var inputEl = document.querySelector("#input");
var resultsEl = document.querySelector("#results");
var modalEl = document.querySelector("#modal");
var closeEl = document.querySelector("#close");
var clearEl = document.querySelector("#clear");
var storageEl = [];

// Variable to input //

var inputHandler = function(event) {
    event.preventDefault();
    var inputVal = inputEl.value.trim();
    if (inputVal) {
        api(inputVal);
        inputEl.value = "";
	
    } else {modalEl.classList.add("is-active");}
};

// Genius API //

var api = function(val) {
	fetch("https://genius.p.rapidapi.com/search?q=" + val, {
	    "method": "GET",
	        "headers": {
		        "x-rapidapi-host": "genius.p.rapidapi.com",
		            "x-rapidapi-key": "qlRKjCC1Ug35HnHw6HEXbjbSzLaRrK71BPFMTbv%2FpQE%3D"
	}
})
	.then(function(response) {
		
        // console.log(response); //

		if (response.ok) {
    	    response.json().then(function(apiData) {
			    console.log(apiData);
			        console.log(apiData.response);
				        if (apiData.response.hits.length != 0) {
					        if (document.querySelector("#resList")) {
						        document.querySelector("#resList").remove();
					}
					                if (document.querySelector("#reList")) {
						             document.querySelector("#reList").remove();
					}
					                    save(val);
					                        load();
					                            displayRes(apiData);
				}                                   else {modalEl.classList.add("is-active");}
			})
		}                                               else {modalEl.classList.add("is-active");}
	})
};

// Exhibition of display //

var displayRes = function(apiData) {
	var list = document.createElement("div");
	list.setAttribute("id", "resList");
    resultsEl.append(list);

    for (var i = 0; i < apiData.response.hits.length; i++) {
        var resItem = document.createElement("a");
        console.log(apiData.response.hits[i]);
        resItem.innerHTML = apiData.response.hits[i].result.title 
        resItem.className = "res";
        resItem.setAttribute("href", apiData.response.hits[i].result.url);
        resItem.setAttribute("target", "_blank");
        list.append(resItem);
    }
};

// Handler //
var modalHandler = function(event) {
    modalEl.classList.remove("is-active");
	    if (document.querySelector("#resList")) {
		    document.querySelector("#resList").remove();
	}
}

// Saving function //

var save = function(song) {

    // Resulting to no duplicates //

        for (var i = 0; i < storageEl.length; i++) {
            if (song === storageEl[i]) {
                
            // Splice storage //
                
                storageEl.splice(i, 1);
        }
    }
    
    // Formatting to local storage //

        storageEl.push(song);
            localStorage.setItem("songs", JSON.stringify(storageEl));
	            console.log(localStorage);
};

// Stacking function //

var load = function() {
    storageEl = JSON.parse(localStorage.getItem("songs")) || [];
        var recentEl = document.querySelector("#recent");
            var reList = document.createElement("div");
                reList.setAttribute("id", "reList");
                    recentEl.append(reList);

    // Cycle loop //

    for (var i = 0; i < storageEl.length; i++) {
        var reItem = document.createElement("button");
            reItem.setAttribute("type", "button");
                reItem.setAttribute("name", storageEl[i]);
                    reItem.innerHTML = storageEl[i];
                        reItem.className = "button is-white";
       
        // Prepend //

        reList.prepend(reItem);
    }
	        var reClick = document.querySelector("#reList");
                reClick.addEventListener("click", searchRe);
};

// Recent searches //

var searchRe = function(event) {
    var clicked = event.target.getAttribute("name");
        api(clicked);
};

// Wiping function //

var clear = function(event) {
    localStorage.clear();
        location.reload();
};

load();
    userFormEl.addEventListener("submit", inputHandler);
        closeEl.addEventListener("click", modalHandler);
            clearEl.addEventListener("click", clear);