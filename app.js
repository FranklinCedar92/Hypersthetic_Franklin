
const button = document.getElementById('searchButton')
const search = document.getElementById('search')
const result = document.getElementById('result')
const lyrics = document.getElementById('lyrics')


const apiURL = 'https://api.lyrics.ovh';

button.addEventListener('click', e=> {
    e.preventDefault();
    //console.log("this works"); //this works
    searchValue = search.value.trim();

    if(!searchValue){
        alert("There is nothing to search")
    }
    else{ 
        searchSong(searchValue)
        // console.log("this works"); //this works
    }
})

//const searchOnKeyUp =() =>{
  //  searchValue = search.value.trim();
    //searchSong(searchValue)
//}

async function searchSong(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();

    console.log(data);
    showData(data);
}


function showData(data){
    console.log("this works");
    result.innerHTML = `

    <ul class="song-list">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
  //document.getElementById('result').innerHTML = ''

  console.log(result.innerHTML);


}


result.addEventListener('click', e=>{
    const clickedElement = e.target;

    
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
    }
})


async function getLyrics(artist, songTitle) {
  
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);

    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = ` 
    <h4 style="margin-bottom:30px;"><strong>${artist}</strong> - ${songTitle}</h4><ul>
    <div data-artist="${artist}" data-songtitle="${songTitle}"> Lyrics: </div>
    <p style="margin-top:20px;">${lyrics}</p>
`    
    
}


result.addEventListener('click', e=>{
    const clickedElement = e.target;

    
    if (clickedElement.tagName === 'DIV'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        execute(artist, songTitle);
    }
    
})















