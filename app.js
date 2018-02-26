// link api https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple

$(document).ready(function() {

    $.ajax({
        url:`https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple`,
        datatype: 'json',
        type:'GET',
    })
    .done(function(response) {
        showInfo(response);
    })
    .fail(function(error) {
        console.log('error al cargar la api');
    })
})
