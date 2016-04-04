$(function() {
  console.log("jquery!");

  $('button').on("click", function(){
    // Gets input and replaces spaces with +
    search = $('input').val();

    // console.log(search);
    addMovie(search);
  });

  $('input').keypress(function(e) {
    // Gets what key was pressed
    var code = e.keyCode || e.which;

    // Checks to see if the enter key was pressed
    if (code == 13) {
      // Get input from text box
      search = $('input').val();

      // Change placeholder
      var placeholder = $("input").val();
      if(placeholder != "") {
        $('input').attr("placeholder", placeholder);
      }

      // Clear textbox
      $('input').val("");

      // Get the gifs
      addMovie(search);
    }
  });

  // Initial three movies
  addMovie("Star Wars: Episode I: The Phantom Menace");
  addMovie("Interstellar");
  addMovie("Mad Max Fury Road");

  $("#movies").on("click", ".movie",function() {
    $(this).find(".info").show().animate({"margin-left": "0"}, 500);
    console.log("Hover!");
  });
  $("#movies").on("mouseleave", ".movie", function() {
    $(this).find(".info").animate({"margin-left": "-270px"}, 500);
    $(this).find(".info").hide("fast");
  });
});

// Gets information
function addMovie(title) {
  var movie = "http://www.omdbapi.com/?t=" + title.replace(/ /g,"+") + "&y=&plot=short&r=json";
  $.get(movie).done(function(response){
    // HTML Blocks
    var divStart = "<div class=\"movie\">";
    var divEnd = "</div>";
    var infoStart = "<div class=\"info\">";
    var poster = "<img class=\"poster\"src=\"" + response.Poster +"\" />";
    var title = "<h1>" + response.Title + "</h1>";
    var year = "<p><span>Year: </span>" + response.Year + "</p>";
    var runtime = "<p><span>Runtime: </span>" + response.Runtime + "</p>";
    var genre = "<p><span>Genre: </span>" + response.Genre + "</p>";
    var director = "<p><span>Director: </span>" + response.Director + "</p>";
    var actors = "<p><span>Actors: </span>" + response.Actors + "</p>";
    var plot = "<p><span>Plot: </span>" + response.Plot + "</p>";

    var html = divStart + poster + infoStart + title + year + runtime + genre + director + actors + plot + divEnd + divEnd;

    $("#movies").hide().append(html).fadeIn();
  }).fail(function() {
    console.log("No movie found");
  });
}
