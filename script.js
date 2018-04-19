let res = "";
let textSearch = "";

$(document).ready(function() {
    $('.tfbutton').on('click', function () {

     
      textSearch = document.getElementById('tftextinput').value;

        //Switch SPACE by - for the API Research
      res = textSearch.replace(/ /g, "+");
      console.log(res);
      // requete AJax simple mais qui limite
      $.get('http://openlibrary.org/search.json?q=' + res, function (response) {
      debugger;
        // it's for clear the main when you're make à new request
        document.querySelector('main').innerHTML = ""

        // Define our Dom/Var Element
        let nameC = document.createElement('h1');
        let textC = document.createElement('p');
        let imgC = document.createElement('img');

        // Appli the way to load the data
        nameC.innerHTML = response.docs[0].language.fre;
        //textC.innerHTML = response[0].summary;
        //imgC.src = response[0].cover.url;

        // Appli some Css to make a better view
       // nameC.classList.add("heightH");
        //imgC.classList.add("imageSize");

        // Append ( fr : Attache ) the element to the main ( En disant que c'est les enfants)
        document.querySelector('.flex-row-alternate ').appendChild(nameC);
        //document.querySelector('#resultList').appendChild(textC);
        //document.querySelector('#resultList').appendChild(imgC);
      })
      }); 
    });


  // it's he same à the Top but we want a random number with all the game
    /*$('#a').on('click', function () {
      $.ajax({
        // we take all the games
          url: "http://openlibrary.org/search.json?q=",
          type: "GET",
            success: function (games) {
              let gameCount = games.count;
              let gameNumber = Math.floor((Math.random() * gameCount) + 1);


              $.ajax({
                  url: "https://api-2445582011268.apicast.io/games/" + gameNumber,
                  type: "GET",
                  headers: {
                    'user-key': apiKey,
                    'Accept': 'application/json',
                  },
                  success: function (response) {
                      displayPlateformsRequest(response);
                      displayGenresRequest (response);
                    // it's for clear the main when you're make à new request
                    document.querySelector('main').innerHTML = ""

                    // Define our Dom/Var Element
                    let nameC = document.createElement('h1');
                    let textC = document.createElement('p');
                    let imgC = document.createElement('img');
                    //let titreC = document.createElement('')


                    // Appli the way to load the data
                    if (response[0].cover == undefined) {
                      //if we are no à img
                      console.log('no-image');
                    }else {
                      // if we are à imae
                      imgC.src = response[0].cover.url;
                    }
                    if (response[0].name == undefined) {
                      //if we are no à img
                      nameC.innerHTML = "No Title";
                    }else {
                      // if we are à imae
                      nameC.innerHTML = response[0].name;
                    }
                    if (response[0].summary == undefined) {
                      //if we are no à img
                      textC.innerHTML = "No summary for this game";
                    }else {
                      // if we are à imae
                      textC.innerHTML = response[0].summary;
                    }

                    // Appli some Css to make a better view
                    nameC.classList.add("heightH");
                    imgC.classList.add("imageSize");

                    // Append ( fr : Attache ) the element to the main ( En disant que ces les enfants)
                    document.querySelector('.loading-container').classList.add('hidden');
                    document.querySelector('#resultList').appendChild(nameC);
                    document.querySelector('#resultList').appendChild(textC);
                    document.querySelector('#resultList').appendChild(imgC);
                  //  document.querySelector()
                  }
                });
              }
            })
          })*/
//});

function displayPlateformsRequest (response) {
  if (response[0].platforms !== undefined) {
    let platforms = response[0].platforms;
    for (let i = 0; i < platforms.length; i++) {
      $.ajax({
        url: "https://api-2445582011268.apicast.io/platforms/" + platforms[i],
        type: "GET",
        headers: {
          'user-key': apiKey,
          'Accept': 'application/json',
        },
        success: function(response) {
          displayPlateforms(response)
        }
      })
    }
  }
}

function displayPlateforms(response) {
  let platforName = response[0].name;
  let platforLogo = response[0].logo.url;

  let containerPlat = document.createElement('div');
  let name = document.createElement('h3');

  name.innerHTML = platforName;
  document.querySelector('#resultList').appendChild(name);
}

function displayGenresRequest (response) {
  if (response[0].genres !== undefined) {
    let genres = response[0].genres;
    for (let i = 0; i < genres.length; i++) {
      $.ajax({
        url: "https://api-2445582011268.apicast.io/genres/" + genres[i],
        type: "GET",
        headers: {
          'user-key': apiKey,
          'Accept': 'application/json',
        },
        success: function(response) {
          displayGenres(response)
        }
      })
    }
  }
}

function displayGenres (response) {
  let genreforName = response[0].name;

  let genre = document.createElement('h4');
  genre.innerHTML = genreforName;
  
  containerGenre.append(genre);

  

  document.querySelector('#resultList').appendChild(containerGenre);
}
