$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user_data").then(function(data) {
  //   $(".member-name").text(data.email);
  // });
  // $.get("api/notes").then(function(data){
   
  //   $(".title").text(data[0].title)
  // })

  // delete button
    $(".delete-button").on("click", function(event){
      event.preventDefault();
      deleteNote(this.value)
      location.reload()
    })

  // edit button
    $(".edit-button").on("click", function(event){
      event.preventDefault();
      window.location.href= "/addNote?id=" + this.value
    })

    // This function does an API call to delete posts
  function deleteNote(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/members/" + id
    })
      .then(function() {
        console.log("done");
        location.reload()
      });
  }
});
