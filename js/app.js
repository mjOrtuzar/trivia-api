// link api https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple

$(document).ready(function() {
    let contenedor = $("#contenedorQuiz");
    $.ajax({
        url:`https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple`,
        datatype: 'json',
        type:'GET',
    })
    .done(function(response) {
        console.log(response);
        showQuestion(response);
        showAnswers(response);
        
    })
    .fail(function(error) {
        console.log('error al cargar la api');
    })
    function showQuestion(data){
        $.each(data.results,function(index,preguntita) {
            var getPregunta = preguntita.question.toUpperCase();// se presenta la pregunta
            var par = $("<p>").html("la pregunta no. "+(index+1)+ " es: "+" <span>" + getPregunta + "</span>"); //se muestran las preguntas
            par.appendTo(".pregunta");
            //se ordenan y se muestran las preguntas
            var preguntas = $(".pregunta p").length;
            $(".pregunta p").hide();
            $(".pregunta p:first").show();
            //console.log(preguntas)

        })
        
        
    }
    let correct_answer=0;
    let counter = 0;
    function showAnswers(data){
        $.each(data.results,function(index,respuestita) {
            var respuestaCorrecta = respuestita.correct_answer;
            var respuestaMala = respuestita.incorrect_answers[0];
            var respuestaMala2 = respuestita.incorrect_answers[1];
            var respuestaMala3 = respuestita.incorrect_answers[2];
            //se meten todas las respuestas en un array nuevo:
            let respuestas=[respuestaCorrecta, respuestaMala, respuestaMala2, respuestaMala3];
            //del array anterior se desordena:
            shuffle(respuestas);
            
            //se añaden las alternativas al html:
            $("<ul class = alternatives>").html("<li class='boton' type='submit'> " + shuffle(respuestas[0])+ "</li>" +
            "<li class='boton' type='submit'>"+ shuffle(respuestas[1]) + "</li>" +
            "<li class='boton' type='submit'>"+ shuffle(respuestas[2])+ "</li>" +
            "<li class='boton' type='submit'>"+ shuffle(respuestas[3]) + "</li>").appendTo("#alternativas");
           
            //se muestras las primeras 4 respuestas de la pregunta:
            
            var largoRespuestas =$("#alternativas .alternatives").length;
            for(i=largoRespuestas ; i <=10 ; i++){
                $("#alternativas .alternatives").hide();
                $("#alternativas .alternatives:nth-child(1)").show(); //muestra la primera lista.
            }
            
            
            
            //funcion alternativa
            $(" .boton").one('click',function() { //se comprueba que la opcion clickeada es correcta
                if($(".boton")===respuestaCorrecta){
                    console.log("correcto!");
                }
            });

            
           
            
            console.log(respuestas)
            
        })
    }

    //funcion para desordenar array con las respuestas
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // Mientras queden elementos a mezclar
        while (0 !== currentIndex) {
      
          // Seleccionar un elemento sin mezclar
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // E intercambiarlo con el elemento actual
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
        select(array);
      }

    
    
    
    
    
    
    
    
})

