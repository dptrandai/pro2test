$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
  $.get("api/notes").then(function(data){
    console.log(data[0])
    console.log(data[0].body)
    console.log("length:" + data.length)
    // const noteArray = []
    // for(i=0; i < (data.length+1); i++){
    //   let title = data[i].title
    //   let body = data[i].body
    //   noteArray.push(title, body)

    // }
    // console.log(noteArray)
    $(".title").text(data[0].title)
  })

    $(".noteEdit").on("click", function(event){
        console.log("button Works")
    })





});
