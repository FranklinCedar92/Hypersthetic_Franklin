var idCounter = 0;
var searches = document.querySelector('#searchList')

//array for holding past searches
var listings = [];

// grabs search input to create object item
var pastHandler = function(event) {
    event.preventDefault();
    
    var pastArtist = document.getElementById("search").value;


    if (pastArtist === "") {
        console.log("empty fields");
        return false;
    }

    var listingObj = {
        artist: pastArtist
    };

    console.log(listingObj);
    createListingEl(listingObj);
    // all of this works
};

// adds search to side nav
var createListingEl = function(listingObj) {
    var listItemEl = document.createElement('li');
    listItemEl.className = "listing";
    listItemEl.setAttribute("list-id", idCounter);

    listItemEl.textContent = listingObj.artist;  
    console.log(listItemEl); //this works
    searches.appendChild(listItemEl); 

    listingObj.id = idCounter;

    listings.push(listingObj);

    saveListing();

    // gives each listing an id
    idCounter++;
};

// saves searches to local storage
var saveListing = function() {
    localStorage.setItem("listings", JSON.stringify(listings));
};

//retreives from storage
var loadListing = function() {
    var savedListings = localStorage.getItem("listings");
    
    //creates empty array if there are no saved searches
    if (!savedListings) {
        return false;
    }

    savedListings = JSON.parse(savedListings);

    for (var i = 0; i < savedListings.length; i++) {
        createListingEl(savedListings[i]);
    }
};

document.querySelector("#searchButton").addEventListener('click', pastHandler);

loadListing();