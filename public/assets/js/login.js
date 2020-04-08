$(document).ready(function() {
//   $('.message a').click(function(){
//     $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
//  });

  // Getting references to our form and inputs
  // var loginForm = $("form.login");
  var emailInput = $(".emailInput").value;
  var passwordInput = $(".passwordInput").value;

  // When the form is submitted, we validate there's an email and password entered
  $(".loginbutton").on("click", function(event) {
    event.preventDefault();
    var emailInput = $("#emailInput").val();
    var passwordInput = $("#passwordInput").val();
    console.log(emailInput)


    var userData = {
      email: emailInput.trim(),
      password: passwordInput.trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
