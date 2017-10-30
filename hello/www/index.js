/******************************************************************/
//Show
$(document).ready(function () {
  var $postby = $('#postby');
  var $location = $('#location');
  var $comment = $('#comment');
  var $avatar = $('#avatar');
  var $picture =  $('#picture');
  var url = "http://localhost:3000/posts"
  $.ajax({
    url: url,
    method: "GET",
    success: function (data, status, xhr) {
      console.log(data);
      var template = $('#template').html();
      for (var i = 0; i < data.length; i++) {
        var rendered = Mustache.render(template, data[i]);
        $("#posts").append(rendered);
      }
    }
  })

//Insert
  $("#addlongpai").click(function () {
    var url = "http://localhost:3000/posts"
    console.log($("#postby").val());
    $.post(url, {
      postby: $("#postby").val(),
      location: $("#location").val(),
      comment: $("#comment").val(),
      avatar: $("#avatar").val(),
      picture: $("#picture").val(),
    });
    alert('Add Complete !');
    setTimeout(window.location.href = "index.html");
  });
});
/******************************************************************/
//Delete
function deletepost(id) {
  alert('Delete This Post ?');

  //Delete from back end
  $.ajax({
    url: "http://localhost:3000/posts/" + id, // post id
    type: "DELETE" // Use DELETE
  })
  alert('Delete Complete !');
  setTimeout(window.location.href = "index.html");
  //Delete from front end
  $("#post" + id).empty();

}
/******************************************************************/
//editpsot
function editpost(id,postby,location,comment,avatar,picture) {
    console.log(id);
    var url = "http://localhost:3000/posts";
    $("#location" + id).hide();
    $("#locationedit" + id).prop('type', "text");
    $("#postby" + id).hide();
    $("#postbyedit" + id).prop('type', "text");
    $("#comment" + id).hide();
    $("#commentedit" + id).prop('type', "text");
    $("#picture" + id)
    $("#avatar" + id)
}
/******************************************************************/
//savepsot
function savepost(id,postby,location,comment,avatar,picture) {

    var postbyedit = postbyedit;
    var locationedit = locationedit;
    var commentedit = commentedit;
    var avatar = avatar;
    var picture = picture;
    var newposts = {};

     newposts.id = id;
     newposts.postby = $("#postbyedit"+id).val();
     newposts.location = $("#locationedit"+id).val();
     newposts.comment = $("#commentedit"+id).val();
     newposts.avatar = $("#avatar"+id).val();
     newposts.picture = $("#picture"+id).val();
     var url = "http://localhost:3000/posts/"+id;
     $.ajax({

         type: 'PUT',
         data: newposts,
         url: url,
         success: function () {
             console.log(newposts);
         }
     });
     alert('Update Complete !');
     setTimeout(window.location.href = "index.html");
 }

/******************************************************************/
//picture to base 64
function readFile() {

  if (this.files && this.files[0]) {

    var FR= new FileReader();

    FR.addEventListener("load", function(e) {
      document.getElementById("img").src       = e.target.result;
      document.getElementById("b64").innerHTML = e.target.result;
    });

    FR.readAsDataURL( this.files[0] );
  }

}

document.getElementById("inp").addEventListener("change", readFile);
/******************************************************************/
//camera
$('#takephoto').click(function () {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    });

    function onSuccess(imageURI) {
        var image = $("#preview");
        image.attr("src", imageURI);
        img = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
});
