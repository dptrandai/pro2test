$(document).ready(function() {
    // This code can be used if we want to display the logged in user:
    // $.get("/api/user_data").then(function(data) {
    //   $(".member-name").text(data.email);
    // });

    // delete button
      $(".delete-button").on("click", function(event){
        event.preventDefault();
        
        deleteNote(this.value)
        location.reload()
      })
  
    // edit button
      $(".edit-button").on("click", function(event){
        event.preventDefault();
        window.location.href= "/addContact?id=" + this.value
      })
  
      // This function does an API call to delete posts
    function deleteNote(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/contact/" + id
      })
        .then(function() {
          console.log("done");
          location.reload()
        });
    }
  
  });