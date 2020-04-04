$(document).ready(function() {

    let newTitle = $("#title")
    let newBody = $("#body")
    var updating = false;
    var noteId;
        var url = window.location.search;
        if (url.indexOf("?id=") !== -1) {
        noteId = url.split("=")[1];
        getNoteData(noteId);
        }
    $(".submit").on("click", function(event){
        event.preventDefault();
        let newNote = {
            title: newTitle.val(),
            body: newBody.val()
        };
        if (updating) {
            newNote.id = noteId
            updateNote(newNote)

        }else{
            newNoteNow(newNote)

        }



       

        
    })

    function newNoteNow(newNote){
        console.log(newNote)
        $.post("/api/addNote", {
            title: newNote.title,
            body: newNote.body
        }).then(function(){
            window.location.replace("/members")
        })


    }
    

    function getNoteData(id){
        $.get("/api/addNote/" + id, function(data){
            if (data) {
                console.log("data:")
                console.log(data)
                newTitle.val(data.title);
                newBody.val(data.body)
                updating = true;

            }
        })
    }  


    function updateNote(newNote){
        $.ajax({
            method: "PUT",
            url: "/api/addNote",
            data: newNote
        }).then(function(){
            window.location.href = "/members"
        })
    }









          

})
  
  
//  var newNote = {
//               title: $("#title").val(),
//               body: $("#body").val()
//           } 
  
  
