var userFormEl = document.querySelector("#form");
	var inputEl = document.querySelector("#input");
		var resultsEl = document.querySelector("#results");
			var modalEl = document.querySelector("#modal");
				var closeEl = document.querySelector("#close");
					var clearEl = document.querySelector("#clear");
						var storageEl = [];

// First input //

var inputHandler = function(event) {
    event.preventDefault();
    	var inputVal = inputEl.value.trim();
    		if (inputVal) {
        		api(inputVal);
        			inputEl.value = "";
	
    } 				 	else {modalEl.classList.add("is-active");}
};

// Deezer API //

var api = function(val) {
	fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + val, {
		"method": "GET",
			"headers": {
				"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
					"x-rapidapi-key": "71e7eceec26159c1d5ef41e8f1e55657755aa4fdc94fa71bc0d46a3fd9c15785393e5ee20bab4be123a34e0810b84b12cbf97dbcfdaef980e701e56825608672c69076785bb28d0fd8a37e7b780f03e3b5ac96dcdacace7a63e6e9408b8e38cb"
		}
	})
	.then(function(response) {
		
		// console.log(response); //
		
		if (response.ok) {
    		response.json().then(function(apiData) {
				console.log(apiData);
					if (apiData.data.length != 0) {
						if (document.querySelector("#resList")) {
							document.querySelector("#resList").remove();
					}
							if (document.querySelector("#reList")) {
								document.querySelector("#reList").remove();
					}
								save(val);
									load();
										displayRes(apiData);
				}							 else {modalEl.classList.add("is-active");}
			})
		} 										else {modalEl.classList.add("is-active");}
	})
};

// Exhibition of display //

var displayRes = function(apiData) {
		var list = document.createElement("div");
				list.setAttribute("id", "resList");
    				resultsEl.append(list);

						for (var i = 0; i < apiData.data.length; i++) {
							var resItem = document.createElement("a");
								resItem.innerHTML = apiData.data[i].title + " - " + apiData.data[i].album.title + " - " + apiData.data[i].artist.name;
    								resItem.className = "res";
    									resItem.setAttribute("href", apiData.data[i].preview);
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