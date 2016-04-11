// *****************************************************************************//
// Sending a create account request
$(document).ready(function(){
  $("#doSignUp").click(function(event){
    event.preventDefault();

    var data = $('#signUpForm').serializeArray().reduce(function(obj, item) {
      obj[item.name] = String(item.value);
      return obj;
    }, {});

    $.ajax({
      type: "POST",
      url: "/api/auth/register/",
      async: true,
      data: JSON.stringify(data),
      contentType: "application/json",
      complete: function (data, status) {
        if (status == "error") {
          html = "<div class='alert alert-danger' role='alert'>Oops! Unable to sign up.</div>"
          $("#signUpMessage").html(html)
        } else if(status == "success") {
          // create a message for user
          html = "<div class='alert alert-success' role='alert'>Sign up successful.</div>"
          $("#signUpMessage").html(html)

          setTimeout(function(){
            $("#signUpModal").modal('toggle')
          }, 2200);
        }
      }
    });
  });
});
// *****************************************************************************//


// *****************************************************************************//
// Sending a login request
$(document).ready(function(){
  $("#doLogin").click(function(event){
    event.preventDefault();

    var data = $('#loginForm').serializeArray().reduce(function(obj, item) {
      obj[item.name] = String(item.value);
      return obj;
    }, {});

    $.ajax({
      type: "POST",
      url: "/api/auth/login/",
      async: true,
      data: JSON.stringify(data),
      contentType: "application/json",
      complete: function (data, status) {
        if (status == "error") {
          html = "<div class='alert alert-danger' role='alert'>Unable to login with the credentials provided.</div>"
          $("#loginMessage").html(html)
        } else if(status == "success") {
          // create a message for user
          html = "<div class='alert alert-success' role='alert'>You are now logged in.</div>"
          $("#loginMessage").html(html)

          // save token to local storage
          parsed_data = JSON.parse(data.responseText)
          localStorage.setItem("token", "Token " + parsed_data.token);

          setTimeout(function(){
            $("#loginModal").modal('toggle')
          }, 2200);

          window.location = "/account/";
        }
      }
    });
  });
});
// *****************************************************************************//


// *****************************************************************************//
// Creating a bucketlist
// *****************************************************************************//

// *****************************************************************************//
// Logging out
// *****************************************************************************//
