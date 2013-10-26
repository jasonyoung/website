$( document ).ready(function() {
    $("#alert").hide();

    $( "#saveNewPool" ).click(function() {

        var pool = convertFormToJson("newPoolForm");

        $.post( "newPool", pool, function( data ) {
            $("#alert").show();
        });
    });
});


