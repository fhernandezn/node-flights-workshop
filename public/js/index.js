$(document).ready(function(){
  $('.calendar').fdatepicker({
    format: 'yyyy-mm-dd',
    disableDblClickSelection: true
  });

  $("#search-form").submit(function(event) {

    event.preventDefault();

    var data = $(this).serialize();
    var loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 300, easingIn : mina.easeinout } );
    loader.show();

    $.ajax({
      url: "search",
      method: 'POST',
      data: data,
      dataType: 'json',
      success: function(data, text, xhr) {
        var source   = $("#air_avail").html();
        var template = Handlebars.compile(source);
        var html = template({data});
        $("#result-table").html("").append(html);
        loader.hide();
      }
    })
  });



});
