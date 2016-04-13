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
            $("#signUpMessage").html("")
          }, 1200);
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
          }, 1200);

          window.location = "/account/";
        }
      }
    });
  });
});
// *****************************************************************************//


// *****************************************************************************//
// Creating a bucketlist
$(document).ready(function(){
  var pathname = window.location.pathname
  
  // only run on account page
  if(pathname == "/account/"){
    $("#doBucketlistCreation").click(function(event){
      event.preventDefault();

      var data = $('#newBucketlistForm').serializeArray().reduce(function(obj, item) {
        obj[item.name] = String(item.value);
        return obj;
      }, {});

      $.ajax({
        type: "POST",
        beforeSend: function (request)
            {
                request.setRequestHeader("Authorization", localStorage.getItem("token"));
            },
        url: "/api/bucketlists/",
        async: true,
        data: JSON.stringify(data),
        contentType: "application/json",
        complete: function (data, status) {
          if (status == "error") {
            html = "<div class='alert alert-danger' role='alert'>Unable to create bucketlist</div>"
            $("#bucketlistCreationMessage").html(html)
          } else if(status == "success") {
            // create a message for user
            html = "<div class='alert alert-success' role='alert'>Bucketlist Created</div>"
            $("#bucketlistCreationMessage").html(html)

            setTimeout(function(){
              $("#createBucketlist").modal('toggle')
              $("#bucketlistCreationMessage").html("")
            }, 1200);

            showBucketLists();
          }
        }
      });
    });
  }
});
// *****************************************************************************//

// *****************************************************************************//
// Function to show bucketlists
function showBucketLists(){
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

        length_of_results = json_data.results.length;

        if(length_of_results === 0){
          html += "<div class='jumbotron'>";
          html += "<h3>You have nothing here.</h3>";
          html += "<button class='btn btn-primary' data-toggle='modal' data-target='#createBucketlist'>Create Bucketlist</a>";
          html += "</div>";
          $("#bucketlists").html(html);
        } else if(length_of_results > 0){
          html += "<div class='page-header'>";
          html += "<h1>Your bucketlists</h1>";
          html += "</div>";

          bucketlists = json_data.results;

          html += "<div class='flex-container'>";
          for(var i = 0; i < length_of_results; i++){ 
            html += "<div class='panel panel-info'>";
            html += "<div class='panel-heading'>" + bucketlists[i].name + "</div>";
            html += "<div class='panel-body'>";
            html += "<button id='" + bucketlists[i].id + "' class='btn btn-primary delete_bucket'>Delete</button>";
            html += "<button id='" + bucketlists[i].id + "' class='btn btn-primary update_bucket' data-toggle='modal' data-target='#updateBucketlist'>Edit</button>";
            html += "<button id='" + bucketlists[i].id + "' class='btn btn-primary bucket_items'>Items</button>";
            html += "</div>";
            html += "</div>";          
          }
          html += "</div>";    
          $("#bucketlists").html(html);
        }
      }
    });
  }
}
// *****************************************************************************//

// *****************************************************************************//
// Function to update a bucketlist
function updateBucketList(id, data){
  $.ajax({
    type: "PUT",
    beforeSend: function (request)
          {
              request.setRequestHeader("Authorization", localStorage.getItem("token"));
          },
    url: "/api/bucketlists/" + id,
    data: JSON.stringify(data),
    async: true,
    contentType: "application/json",
    complete: function (data, status) {
      if(status === "success"){
        // create a message for user
        html = "<div class='alert alert-success' role='alert'>Bucketlist Updated</div>";
        $("#bucketlistUpdateMessage").html(html);

        setTimeout(function(){
          $("#updateBucketlist").modal('toggle');
          $("#bucketlistUpdateMessage").html("");
        }, 1200);

        showBucketLists();
      } else if(status === "error"){
        // create a message for user
        html = "<div class='alert alert-danger' role='alert'>Error Updating Bucketlist</div>"
        $("#bucketlistUpdateMessage").html(html)
      }
    }
  });  
}
// *****************************************************************************//

// *****************************************************************************//
// Function to delete bucketlists
function deleteBucketList(id){
  var pathname = window.location.pathname
  
  // only run on account page
  if(pathname === "/account/"){
    $.ajax({
      type: "DELETE",
      beforeSend: function (request)
            {
                request.setRequestHeader("Authorization", localStorage.getItem("token"));
            },
      url: "/api/bucketlists/" + id,
      async: true,
      contentType: "application/json",
      complete: function (data, status) {
        console.log(status);
        if(status === "nocontent"){
          showBucketLists();
        }
      }
    });
  }
}
// *****************************************************************************//

// *****************************************************************************//
// Update a bucketlist
var updateId = 0
var updateData = {}
$(document).ready(function(){
  var pathname = window.location.pathname
  
  // only run on account page
  if(pathname == "/account/"){
    $(document).on('click', '.update_bucket', function(event){
      updateId = $(this).attr('id');
    });
    $(document).on('click', '#doBucketlistUpdate', function(event){
      event.preventDefault();

      updateData = $('#updateBucketlistForm').serializeArray().reduce(function(obj, item) {
        obj[item.name] = String(item.value);
        return obj;
      }, {});

      updateBucketList(updateId, updateData);
    });
  }
});
// *****************************************************************************//


// *****************************************************************************//
// Delete a bucketlist
$(document).ready(function(){
  $(document).on('click', '.delete_bucket', function(event){
    var id = $(this).attr('id');
    deleteBucketList(id);
  });
});
// *****************************************************************************//


// *****************************************************************************//
// Showing all bucketlists on account page load
$(document).ready(function(){
  showBucketLists();
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
