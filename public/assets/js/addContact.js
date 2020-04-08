$(document).ready(function() {
    let newName = $("#name")
    let newPhone = $("#phone")
    let newEmail = $("#email")
    let newAddress = $("#address")
    var updating = false;
    var ContactId;
        var url = window.location.search;
        if (url.indexOf("?id=") !== -1) {
        ContactId = url.split("=")[1];
        getContactData(ContactId);
        }
    $(".submit").on("click", function(event){
        event.preventDefault();
        console.log("you just pushed me.")
        let newContact = {
            name: newName.val(),
            phone: newPhone.val(),
            email: newEmail.val(),
            address: newAddress.val(),
        };
        if (updating) {
            newContact.id = ContactId
            updateContact(newContact)
        }else{
            newContactNow(newContact)
        }
    })
    function newContactNow(newContact){
        console.log(newContact)
        $.post("/api/addContact", {
            name: newContact.name,
            phone: newContact.phone,
            email: newContact.email,
            address: newContact.address,
        }).then(function(){
            window.location.replace("/contacts")
        })
    }
    function getContactData(id){
        $.get("/api/addContact/" + id, function(data){
            console.log(data)
            if (data) {
                newName.val(data.name);
                newPhone.val(data.phoneNumber);
                newEmail.val(data.email);
                newAddress.val(data.address);
                updating = true;
            }
        })
    }  
    function updateContact(newContact){
        $.ajax({
            method: "PUT",
            url: "/api/addContact",
            data: newContact
        }).then(function(){
            window.location.href = "/contacts"
        })
    }
})