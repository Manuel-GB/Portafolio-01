$(function () {
    var btn = $('button');
    btn.click(function () {
        reset();
        var number = $("#number-pkmn").val();
        if ($.isNumeric(number) && number > 0 && number < 808) {
            var settings = {
                "url": `https://pokeapi.co/api/v2/pokemon/${number}`,
                "method": "GET",
                "timeout": 0,
            };
        } else {
            var error = $("#error");
            error.append('<h2><strong>Error... debe ingresar un numero valido!!!</strong></h2>');
        }
        $.ajax(settings).done( function (response) {
            createPkmnData(response);
            createType(response);
            crateGraphic(response);
        })
    });
});
function createPkmnData(response) {
    var name = $("#pkmn-name");
            name.append(`<h2><strong>${response.name}</strong></h2>`);
            var img = $("#pkmn-name");
            img.append(`<img src="${response.sprites.front_default}" style="padding: 1rem;"></mg>`);
            img.append(`<img src="${response.sprites.back_default}" style="padding: 1rem;"></mg>`);
            var weight = $("#pkmn-name");
            weight.append(`<p>weight : ${response.weight} KG</p>`);

};

function crateGraphic(response) {
    var list = response.stats;
    list.forEach(element => {
        var name = element.stat.name;
        console.log(name, ' : ', element.base_stat);  
    });
    var option = {
        title: { text: "Pokemon Basic Stat's"},
        data: [{
            type: "column",
            dataPoints: [
                { label: "HP", y: list[0].base_stat },
                { label: "ATTACK", y: list[1].base_stat },
                { label: "DEFENSE", y: list[2].base_stat },
                { label: "SP_ATTACK", y: list[3].base_stat },
                { label: "SP_DEFENSE", y: list[4].base_stat },
                { label: "SPEED", y: list[5].base_stat }
            ]
        }]
    }
    $("#chartContainer").CanvasJSChart(option);
};

function createType(response) {
    var titlePkmnType = $(".title-pkmn-type");
            titlePkmnType.append("<strong>Pokemon Type</strong>");
            var type = $("#pkmn-type");
            var pkmTypes = response.types;
            for (let i = 0; i < pkmTypes.length; i++) {
                type.append(`<li>${pkmTypes[i].type.name}</li>`);  
            }
};

function reset () {
   console.log("funcion para limpiar cuadro");
   $("#pkmn-name").empty();
   $("#pkmn-type").empty();
   $("#chartContainer").empty();
   $(".title-pkmn-type").empty();
   $("#error").empty();
};