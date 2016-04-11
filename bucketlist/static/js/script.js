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
// Showing all bucketlists
$(document).ready(function(){
  var pathname = window.location.pathname
  
  // only run on account page
  if(pathname == "/account/"){
    $.ajax({
      type: "GET",
      beforeSend: function (request)
            {
                request.setRequestHeader("Authorization", localStorage.getItem("token"));
            },
      url: "/api/bucketlists/",
      async: true,
      contentType: "application/json",
      complete: function (data, status) {
        html = "";

        json_data = JSON.parse(data.responseText);

        console.log(json_data);
        
        $("#bucketlists").html("<h1>Hi</h1>");
      }
    });
  }
});
// *****************************************************************************//

// *****************************************************************************//
// Logging out
$(document).ready(function(){
  $('#bs-example-navbar-collapse-1').on('click','#logout', function(e) {   
    e.preventDefault();
    e.stopPropagation();
    console.log("You clicked foo! good work");
    console.log(e);
    localStorage.removeItem("token");
    window.location = "/";
  });
});
// *****************************************************************************//
