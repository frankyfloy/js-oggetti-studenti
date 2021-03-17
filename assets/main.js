$(document).ready(function (){
    controller_User();
});


function controller_User(){

    var studente = {}
    var studenti  = new Array();


    // Click on Registra attiva il form
    var btn_Registra_$ = $("#btn_Registra_Studente");

    btn_Registra_$.click( function(){

        var cont_Registra_$ = $("#cont_Registra");
        var my_Form_$ = $("#my_Form");
        cambiaItems(cont_Registra_$,my_Form_$);

        // TODO:  Cambio eventi click sui bottoni input per passare il focus al successivo
    })


    // FORM Attivo
    var myForm_$ = $("form#my_Form");
    console.log(myForm_$);
    myForm_$.submit(function( event ) {
        // Annullamento invio dati server
        event.preventDefault();

        var my_btn_Input_$ = $("form#my_Form > button > input");
        // Creazione proprietà OGGETTO con input form
        studente.nome = $(my_btn_Input_$).eq(0).val();
        studente.cognome = $(my_btn_Input_$).eq(1).val();
        studente.età = $(my_btn_Input_$).eq(2).val();

        studenti.push(studente);

        // Variabili gestione input
        var cont_Console_Res_$ = $("#cont_Console_Res");
        var isRegistrato = false;

        var cont_Registrato_$ = $("#cont_YouAreRegistered");
        var cont_Not_Registered_$ = $("#cont_Not_Registered");

        if (isRegistrato) {
            cont_Not_Registered_$.removeClass("d-none");
            cambiaItems(myForm_$,cont_Not_Registered_$);

        }else {
            cont_Console_Res_$.removeClass("d-none");
            cambiaItems(myForm_$,cont_Registrato_$);
        }


        $("#dati_Studente > .nome").text("Nome : " + $(my_btn_Input_$).eq(0).val());

        $("#dati_Studente > .cognome").text("Cognome : " + $(my_btn_Input_$).eq(1).val());

        $("#dati_Studente > .età").text("Età : " + $(my_btn_Input_$).eq(2).val());

        setTimeout(mostra_Dati,1000);

        var btn_Home_$ = $(".btn_Home");

        // torna alla home
        btn_Home_$.click( function(){
            var cont_Registra_$ = $("#cont_Registra");
            var my_Form_$ = $("#my_Form");
            cambiaItems(cont_Registrato_$,cont_Registra_$);
        })

        // Div contenente i dati dell'utente in fase di registrazione
        function mostra_Dati(){
            cont_Console_Res_$.removeClass("d-none")
            setTimeout(function(){
                cont_Console_Res_$.addClass("d-none")
            },3000);
        };
    })



    // Funzione cambia l'elemento vecchio con il nuovo (d-none). Con animazione e ritardo.
    function cambiaItems(oldItem,newItem){
        setTimeout(function (){
            oldItem.removeClass("animate__animated animate__lightSpeedOutLeft");
            oldItem.addClass("d-none");
        },1200);

        oldItem.addClass("animate__animated animate__lightSpeedOutLeft");

        setTimeout(function (){
            newItem.addClass("animate__animated animate__lightSpeedInRight");
            newItem.removeClass("d-none");
        },1200);
    }
}
