/******************************************************************/
//Show
$(document).ready(function () {
  var $nameuser = $('#nameuser');
  var $namesong = $('#namesong');
  var $feeling = $('#feeling');
  var $picture = $('#picture');
  var url = "http://172.19.237.43:3000/posts"
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
  $("#addfeeling").click(function () {
    var url = "http://localhost:3000/posts"
    console.log($("#nameuser").val());
    $.post(url, {
      nameuser: $("#nameuser").val(),
      namesong: $("#namesong").val(),
      feeling: $("#feeling").val(),
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
function editpost(id,namesong,nameuser,picture,feeling) {
    console.log(id);
    var url = "http://localhost:3000/posts";
    $("#feeling" + id).hide();
    $("#feelingedit" + id).prop('type', "text");
}
/******************************************************************/
//savepsot
function savepost(id,namesong,nameuser,picture,feeling) {

    var feelingedit = feelingedit;
    var namesong = namesong;
    var nameuser = nameuser;
    var picture = picture;
    var newposts = {};

     newposts.id = id;
     newposts.nameuser = $("#nameuser"+id).val();
     newposts.namesong = $("#namesong"+id).val();
     newposts.feeling = $("#feelingedit"+id).val();
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
