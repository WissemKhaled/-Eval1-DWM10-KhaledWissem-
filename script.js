

// Define our Dom/Var Element
let res = "";
let textSearch = "";


$(document).ready(function() {
    $('.tfbutton').on('click', function () {

      let listeName = document.createElement('ul');
      listeName.classList.add('list-style');
      let textC = document.createElement('p');
      let imgC = document.createElement('img');

      let textNone = document.createElement('p');

      // it's for clear the main when you're make à new request
      document.querySelector('#first-research').innerHTML = ""

      textSearch = document.getElementById('tftextinput').value;
        //Switch SPACE by - for the API Research
      res = textSearch.replace(/ /g, "+");
      // requete AJax simple mais qui limite
      $.get('http://api.tvmaze.com/search/shows?q=' + res, function (response) {

      // Appli the way to load the data
        if (response.length == 0) {
          textNone.innerHTML = "We have anything series with this name";
          document.querySelector('#first-research').appendChild(textNone);
        } else {
          for (let i = 0; i < response.length; i++) {
                if (response.length == 0) {
               //if we are nothing
                nameC.innerHTML = "Aucune série de ce nom là existe. Veuillez réessayer";
                 }else {
                 // if we are something
                 let nameC = document.createElement('li');
                 nameC.innerHTML = response[i].show.name;
                 listeName.append(nameC);

                  // This things is not finish, sorry for that
                  $('li').on('click', function () {

                    $.get('http://api.tvmaze.com/search/shows?q=' + $(this).html(), function () {
                      if (response.length == 0) {
                      //if we are nothing
                      textC.innerHTML = "Aucun résumé, désolé";
                      }else {
                      // if we are something
                      textC.innerHTML = response[i].show.summary;
                      }
                      if (response.length == 0) {
                       //if we are no à img
                       console.log("We don't have image for this series");
                      }else {
                      // if we are à image
                      imgC.src = response[i].show.image.medium;
                      }  
                    })
                  })
                }
          // Append ( fr : Attache ) the element to the main ( En disant que c'est les enfants)
          document.querySelector('#first-research').appendChild(listeName);
          document.querySelector('#first-research').appendChild(textC);
          document.querySelector('#first-research').appendChild(imgC); 
        }
      };
    }); 
  });
});

