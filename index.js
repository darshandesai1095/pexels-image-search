
// pexels API Key:
// 563492ad6f91700001000001e83e9e705bd84b9db7559bffdbe9d6f0
// pexels API endpoint: https://api.pexels.com/v1/

async function renderHeader() {
    const randomNumber1 = Math.floor(Math.random()*10) //rendom munber between 0-9
    const response = await fetch(`https://api.pexels.com/v1/curated?page=${randomNumber1}`, {
        method: "GET",
        headers: {
            Authorization: "563492ad6f91700001000001e83e9e705bd84b9db7559bffdbe9d6f0"
        }
    });
    const data = await response.json();
    const randomNumber2 = Math.floor(Math.random()*15) //15 default images per page
    const photoURL = JSON.stringify(data.photos[randomNumber2].src.landscape)
    const photographer = data.photos[randomNumber2].photographer;
    document.querySelector(".bkg-image").style.backgroundImage = `url(${photoURL})`
    document.querySelector(".artist-name").innerHTML = photographer
}; 

async function loadArtboard() {
    const randomNumber = Math.floor(Math.random()*10) + 10 //random number between 10-19
    const response = await fetch(`https://api.pexels.com/v1/curated?page=${randomNumber}&per_page=15`, {
        method: "GET",
        headers: {
            Authorization: "563492ad6f91700001000001e83e9e705bd84b9db7559bffdbe9d6f0"
        }
    });
    const data = await response.json();
    const photosObj = data.photos
    const photosArr = photosObj.map(obj => obj.src.original)
    //obj.photographer, obj.avg_color
    const artboardHTML = photosArr.map(url => {
        return `<img src="${url}"/>`
    }).join("")
    document.querySelector(".artboard").innerHTML = artboardHTML
}; 

async function renderSearch(searchQuery) {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${searchQuery}&size=large&per_page=24`, {
        method: "GET",
        headers: {
            Authorization: "563492ad6f91700001000001e83e9e705bd84b9db7559bffdbe9d6f0"
        }
    });

    const data = await response.json();
    const photosObj = data.photos
    const photosArr = photosObj.map(obj => obj.src.original)
    const artboardHTML = photosArr.map(url => {
        return `<img src="${url}"/>`
    }).join("")
    console.log(searchQuery)
    document.querySelector(".artboard").innerHTML = artboardHTML
}; 

window.onload = function() {
    renderHeader()
    loadArtboard()
}

document.getElementById("search-form").addEventListener("keydown", function(e) {
    if (e.code === "Enter") {
        e.preventDefault()
        //console.log("it worked")
        //console.log(typeof document.getElementById("search-box").value)
        let query = document.getElementById("search-box").value
        document.getElementById("search-box").value = ""
        document.querySelector(".search-results").innerHTML = `
            <p>
                Showing search results for ${query}
            </p>
        `
        //document.getElementById("search-box").selected = false;

        renderSearch(query)

        document.activeElement.blur()

        document.querySelector(".search-results")
        .scrollIntoView(align=true, behaviour="smooth", block="start")
    }
})