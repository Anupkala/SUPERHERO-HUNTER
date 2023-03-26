console.log("Superhero Hunter");

// getting our elements
let search = document.getElementById("search");
const ul = document.getElementById("auto-complete");

// declaring array
let hero = [];
let favarray = [];
var heroid = 0;
var favid =0;

// fetching the data
search.onkeyup = function () {
  var searchname = search.value;
  if (searchname !== "") {
    fetch(
      "https://superheroapi.com/api.php/ 3328323083897178/search/" +
        searchname.trim()
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        function showhero() {
          var heronames = data.results;
          console.log(data.results);
          ul.innerText = " ";
          for (var i of heronames) {
            var li = document.createElement("li");
            li.innerHTML = i.name;
            li.id = i.id;

            li.addEventListener("click", function () {
              heroid = this.id;
              console.log(heroid + "this is id");
              loadDetails(heroid);
              ul.innerText = " ";
            });
            li.setAttribute("style", "display: block;"); // remove the bullets.
            ul.appendChild(li); // append li to ul
          }
        }

        showhero();
      })
      .catch((err) => console.log(err));
  }
};

// displaying the hero details on screen 
function loadDetails(heroid) {
  fetch(`https://superheroapi.com/api.php/ 3328323083897178/${heroid}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      var details = document.getElementById('details');
      details.setAttribute("style","background-color:rgba(0,0,0,0.8);")

      var img = document.getElementById("img");
      img.setAttribute("src", data.image.url);

      var name = document.getElementById("name");
      name.innerHTML = data.name;

      var bio = document.getElementById("bio");
      bio.innerHTML =   " RELATIVES :" +  data.connections.relatives ;

        var good = document.getElementById("good");
        good.innerText = "NATURE :" + data.biography.alignment;

      var base = document.getElementById("base");
      base.innerHTML = "WORK :" + data.work.base;

      var occ = document.getElementById("occupation");
      occ.innerHTML = "OCCUPATION :" + data.work.occupation;

      var powestat = document.getElementById("powerstats");
      powestat.innerHTML =
        "INTELLIGENCE : " +
        data.powerstats.intelligence +"<br>"+
        "COMBAT : " +
        data.powerstats.combat +"<br>"+
        "POWER : " +
        data.powerstats.power +"<br>"+
        "SPEED : " +
        data.powerstats.speed +"<br>"+
        "STRENGTH : " +
        data.powerstats.strength;

        var favv= document.getElementById("favbtn");
        favv.setAttribute("style","display:flex;");
        favv.setAttribute('value',data.id)

    })
    .catch((error) => console.log(error));
}

// pushing data to favarray and setting it into localstorage.
function favpush (favid){ 
  console.log(favid);
  if (favarray.includes(favid)) {
    alert("Already Added to the Favourite List");
    return;
}
  favarray.push(favid);
 // console.log(data.id + data.name);
  console.log(favarray);
  localStorage.setItem('favlistarr', JSON.stringify(favarray));
}


