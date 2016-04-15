// *****************************************************************************//
// Enable any tooltips
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
// *****************************************************************************//

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
          html += "<div class='jumbotron'>";
          html += "<h3>Your bucketlists</h3>";
          html += "<button class='btn btn-primary' data-toggle='modal' data-target='#createBucketlist'>Add Bucketlist</button>";
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
// Showing a bucketlist's items
var details = {}
$(document).ready(function(){
  $(document).on('click', '.bucket_items', function(event){
    var bucketlist_id = $(this).attr('id');

    // get all the bucketlist's details
    $.ajax({
      type: "GET",
      beforeSend: function (request)
            {
                request.setRequestHeader("Authorization", localStorage.getItem("token"));
            },
      url: "/api/bucketlists/" + bucketlist_id,
      async: true,
      contentType: "application/json",
      complete: function (data, status) {
        if(status === "success"){
          details = data;
          obj = JSON.parse(details.responseText);
          localStorage.setItem('details', JSON.stringify(obj));
          window.location = '/item/';
        }
      }
    });
  });
});

// showing on page load
$(document).ready(function(){
  var pathname = window.location.pathname

  if(pathname === "/item/"){
    showItems(localStorage.getItem('details'));
  }
});

// function to call to show items
function showItems(details_data){
  details = JSON.parse(details_data);
  var html = "";
  if(details.items.length === 0){
    html += "<div class='jumbotron'>";
    html += "<h3>Bucketlist <span style='color: blue;'>" + details.name + "</span> has no items</h3>";
    html += "<button class='btn btn-primary' data-toggle='modal' data-target='#newItemModal'>Create an item</a>";
    html += "</div>";
    $("#items_header").html(html);
    $("#items").html("");
  } else {
    html += "<div class='jumbotron'>";
    html += "<h3>Bucketlist <span style='color: blue;'>" + details.name + "</span> has the following items</h3>";
    html += "<button class='btn btn-primary' data-toggle='modal' data-target='#newItemModal'>Add an item</a>";
    html += "</div>";
    $("#items_header").html(html);

    html = "";
    html += "<table class='table'>";
    html += "<thead>";
    html += "<tr>";
    html += "<th>Name</th>";
    html += "<th>Date Created</th>";
    html += "<th>Date Updated</th>";
    html += "<th>Completed</th>";
    html += "<th>Actions</th>";
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";
    for(var i = 0; i < details.items.length; i++){
      item = details.items[i];

      html += "<tr>";
      html += "<td>" + item.name + "</td>";
      html += "<td>" + item.date_created + "</td>";
      html += "<td>" + item.date_updated + "</td>";
      html += "<td>" + item.done + "</td>";
      // actions
      html += "<td>";
      html += "<button data-toggle='tooltip' title='Mark as Done' class='btn' b='" + item.bucketlist + "' i='" + item.id + "' style='margin-left: 5px;' id='complete_item'><span class='glyphicon glyphicon-ok'></span></button>";
      html += "<button data-toggle='tooltip' title='Delete item' class='btn' b='" + item.bucketlist + "' i='" + item.id + "' style='margin-left: 5px;' id='do_item_delete'><span class='glyphicon glyphicon-remove'></span></button>";
      html += "</td>";
      // end actions
      html += "</tr>";
    }
    html += "</tbody>";
    html += "</table>";
    $("#items").html(html);
  }
}
// *****************************************************************************//

// *****************************************************************************//
// create a new bucketlist item
$(document).ready(function(){
  var pathname = window.location.pathname

  if(pathname === "/item/"){
    $(document).on('click', '#doItemCreate', function(event){
      event.preventDefault();

      bucket = JSON.parse(localStorage.getItem('details'));
      bucket_id = bucket.id;

      var data = $('#newItemForm').serializeArray().reduce(function(obj, item) {
        obj[item.name] = String(item.value);
        return obj;
      }, {});

      $.ajax({
        type: "POST",
        beforeSend: function (request)
            {
                request.setRequestHeader("Authorization", localStorage.getItem("token"));
            },
        url: "/api/bucketlists/" + bucket_id + "/items/",
        async: true,
        data: JSON.stringify(data),
        contentType: "application/json",
        complete: function (data, status) {
          if (status == "error") {
            html = "<div class='alert alert-danger' role='alert'>Unable to create item</div>"
            $("#itemCreationMessage").html(html)
          } else if(status == "success") {
            // create a message for user
            html = "<div class='alert alert-success' role='alert'>Item Created</div>"
            $("#itemCreationMessage").html(html)

            setTimeout(function(){
              $("#newItemModal").modal('toggle')
              $("#itemCreationMessage").html("")
            }, 1200);

            $.ajax({
              type: "GET",
              beforeSend: function (request)
                    {
                        request.setRequestHeader("Authorization", localStorage.getItem("token"));
                    },
              url: "/api/bucketlists/" + bucket_id,
              async: true,
              contentType: "application/json",
              complete: function (data, status) {
                if(status === "success"){
                  details = data;
                  obj = JSON.parse(details.responseText);
                  localStorage.setItem('details', JSON.stringify(obj));
                  showItems(localStorage.getItem('details'));
                }
              }
            });

          }
        }
      });
    });
  }
});
// *****************************************************************************//

// *****************************************************************************//
// Mark a bucketlist item as done
$(document).on('click', '#complete_item', function(event){
  event.preventDefault();

  bucket = $(this).attr('b');
  item = $(this).attr('i');
  data = {"done": "True"};
  $.ajax({
    type: "PUT",
    beforeSend: function (request)
          {
              request.setRequestHeader("Authorization", localStorage.getItem("token"));
          },
    url: "/api/bucketlists/" + bucket + "/items/" + item,
    async: true,
    data: JSON.stringify(data),
    contentType: "application/json",
    complete: function (data, status) {
      if(status === "success"){
        $.ajax({
          type: "GET",
          beforeSend: function (request)
                {
                    request.setRequestHeader("Authorization", localStorage.getItem("token"));
                },
          url: "/api/bucketlists/" + bucket,
          async: true,
          contentType: "application/json",
          complete: function (data, status) {
            if(status === "success"){
              details = data;
              obj = JSON.parse(details.responseText);
              localStorage.setItem('details', JSON.stringify(obj));
              showItems(localStorage.getItem('details'));
            }
          }
        });
      }
    }
  });
});
// *****************************************************************************//

// *****************************************************************************//
// Delete a bucketlist item
$(document).on('click', '#do_item_delete', function(event){
  event.preventDefault();

  bucket = $(this).attr('b');
  item = $(this).attr('i');

  $.ajax({
    type: "DELETE",
    beforeSend: function (request)
          {
              request.setRequestHeader("Authorization", localStorage.getItem("token"));
          },
    url: "/api/bucketlists/" + bucket + "/items/" + item,
    async: true,
    contentType: "application/json",
    complete: function (data, status) {
      if(status === "nocontent"){
        $.ajax({
          type: "GET",
          beforeSend: function (request)
                {
                    request.setRequestHeader("Authorization", localStorage.getItem("token"));
                },
          url: "/api/bucketlists/" + bucket,
          async: true,
          contentType: "application/json",
          complete: function (data, status) {
            if(status === "success"){
              details = data;
              obj = JSON.parse(details.responseText);
              localStorage.setItem('details', JSON.stringify(obj));
              showItems(localStorage.getItem('details'));
            }
          }
        });
      }
    }
  });
});
// *****************************************************************************//

// *****************************************************************************//
// Logging out
$(document).ready(function(){
  $(document).on('click', '#logout_link', function(event){ 
    localStorage.removeItem("token");
    localStorage.removeItem("details");
    window.location = "/";
  });
});
// *****************************************************************************//
