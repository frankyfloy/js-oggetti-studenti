$(document).ready(function (){
    controller_User();
});


function controller_User(){

    // Variabili globali
    var studenti  = [];

    var studente = {}

    // Numero studenti registrati
    var numeroStudenti = studenti.length;

    // Contenitore principale
    var Create_Controller_$ = $("#Create_Controller");
    // Console visualizzazione dati
    var cont_Console_Res_$ = $("#cont_Console_Res");

    // Click on Registra attiva il form
    var btn_Registra_$ = $("#btn_Registra_Studente");
    // Click on Visualizza studenti
    var btn_View_Studenti_$ = $("#btn_View_Studenti");

    // Header visualizzazione lista
    var cont_Header_View_List_$ = $("#cont_Header_View_List");



    btn_View_Studenti_$.click( function(){
        visualizzaStudenti();
    })

    btn_Registra_$.click( function(){
        registra();
    })

    var btn_Home_$ = $(".btn_Home");

    btn_Home_$.click( function(){
        btn_Home_$.parent().prevAll().addClass("d-none");
        setTimeout(function (){
            Create_Controller_$.find("#cont_Registra").removeClass("d-none");
            cont_Console_Res_$.addClass("d-none");
        },1200);


    })



    function visualizzaStudenti(){
        var cont_Registra_$ = $("#cont_Registra");
        cambiaItems(cont_Registra_$,cont_Header_View_List_$);
        mostra_Dati(studenti);
    }


    function registra(){

        var isRegistrato = false;

        var cont_Registra_$ = $("#cont_Registra");
        var my_Form_$ = $("#my_Form");
        cambiaItems(cont_Registra_$,my_Form_$);

        // TODO:  Cambio eventi click sui bottoni input per passare il focus al successivo

        // FORM Attivo
        var myForm_$ = $("form#my_Form");

        myForm_$.submit(function( event ) {
            // Annullamento invio dati (Refresh page)
            event.preventDefault();

            var my_btn_Input_$ = $("form#my_Form > button > input");



            // Creazione proprietà OGGETTO con input form
            var nome = $(my_btn_Input_$).eq(0).val();
            var cognome =$(my_btn_Input_$).eq(1).val();
            var età = $(my_btn_Input_$).eq(2).val();

            //Oggetto studente
            studente = {
                "nome" : nome,
                "cognome" : cognome,
                "età" : età
            }

            for (var i = 0; i < studenti.length; i++) {
                console.log(studenti[i].nome);

                if (studente.nome == studenti[i].nome
                    && studente.cognome == studenti[i].cognome
                    && studente.età == studenti[i].età) {
                        isRegistrato = true;
                        console.log("------- esiste");
                        // Blocco
                        break
                }else if (nome.length == 0 && cognome.length == 0 && età.length == 0) {
                    break
                }else {
                    isRegistrato = false;

                }
            }

            // Dichiarazione variabili jquery Risultato registrazione
            var cont_Success_Reg_$ = $("#cont_Success_Reg");
            var cont_Failed_Reg_$ = $("#cont_Failed_Reg");

            if (isRegistrato == false) {
                // Aggiunta studente
                studenti.push(studente)

                // Creazione di un array con l'oggetto studente appena creato, per sfruttare il metodo mostra_Dati utilizzato per mostare i dati della registrazione e della lista completa di studenti
                var tempArr = [studente];

                // Visualizza la conferma della registrazione
                cambiaItems(my_Form_$,cont_Success_Reg_$);
                setTimeout(function (){
                    cambiaItems(cont_Success_Reg_$,cont_Registra_$);
                },3200);
                mostra_Dati(tempArr);
                // Ritardo annullamento visibilità del contenitore dati studente
                setTimeout(function(){
                    cont_Console_Res_$.addClass("d-none")
                },3200);

            }else {
                // Mostra il fallimento della registrazione
                cambiaItems(my_Form_$,cont_Failed_Reg_$);
                setTimeout(function (){
                    cambiaItems(cont_Failed_Reg_$,cont_Registra_$);
                },3200);
            }
        })
    }

    // FUNZIONI GLOBALI
    function mostra_Dati(array){
        // Visibilità del contenitore contente la tabella con i dati dello studente
        cont_Console_Res_$.removeClass("d-none");

        // Aggiunge i dati appena creati alla tabella
        add_Dati(array);

        // Visualizza l'array passato come parametro
        var strStudente;
        function add_Dati(array){
            for (var i = 0; i < array.length ; i++) {
                strStudente += "<tr class=\"studente\"><td class=\"cognome\">" + array[i].cognome +
                "</td><td class=\"nome\">" + array[i].nome +
                "</td></tr>"

                $("#tabellaPersone").html(strStudente);
            }
        };
    };

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
