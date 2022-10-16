function traerInformacion() {

    $.ajax({
        url: "http://localhost:8080/api/Score/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            //Acá se puede validar la respuesta.
            console.log(respuesta);
            $("#resultado").empty();
            $("#idScore").val("");
            $("#messageText").val("");
            $("#stars").val("");
            $("#reservation").val("");
                pintarRespuesta(respuesta);

        }
    });
}

function pintarRespuesta(items) {
    let mytable ='<table class="table table-sm table-re table-success table-hover">' ;
    mytable += '<thead>'+
    '<tr>'+
      '<th scope="col">ID</th>'+
      '<th scope="col">messageText</th>'+
      '<th scope="col">Contraseña</th>'+
      '<th scope="col">Nombre</th>'+
      '<th scope="col">Acciones</th>'+
    '</tr>'+
  '</thead>';
    for (i = 0; i < items.length; i++) {
        mytable += "<tr>";
        mytable += "<td>" + items[i].idScore + "</td>";
        mytable += "<td>" + items[i].messageText + "</td>";
        mytable += "<td>" + items[i].stars + "</td>";
        mytable += "<td>" + items[i].reservation + "</td>";


        mytable+="<td> <button onclick='borrarElemento("+items[i].idScore+")' type='button' class='btn btn-sm btn-danger'>Borrar</button>";
        mytable+=" <button onclick='editarElemento("+items[i].idScore+")' type='button' class='btn btn-sm btn-warning'>Editar</button>"+"</td>";

        mytable += "</tr>";
    }
    mytable += "</table>";
    $("#resultado").append(mytable);

}
function guardarInformacion() {
    let myData = {
        idScore: $("#idScore").val(),
        messageText: $("#messageText").val(),
        stars: $("#stars").val(),
        reservation: $("#reservation").val(),

    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        url: "http://localhost:8080/api/Score/save",
        type: "POST",
        data: dataToSend,
        datatype: "JSON",
        success: function (respuesta) {
            traerInformacion();
            alert("Se ha guardado")
        }
    });
}

function editarElemento(idElemento) {

    $.ajax({
        url: "http://localhost:8080/api/Score/"+idElemento,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let array = respuesta.items
            $("#idScore").val(array[0].idScore);
            $("#messageText").val(array[0].messageText);
            $("#stars").val(array[0].stars);
            $("#reservation").val(array[0].reservation);

            alert("accion realizada")
        }
    });
}


function actualizarInformacion() {
    let myData = {
        idScore: $("#idScore").val(),
        messageText: $("#messageText").val(),
        stars: $("#stars").val(),
        reservation: $("#reservation").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/api/Score/update",
        type: "PUT",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            traerInformacion();
            alert("Se ha Actualizado")
        }
    });
}

function borrarElemento(idElemento) {
    let myData = {
        idScore: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/api/Score",
        type: "DELETE",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            traerInformacion();
            alert("Se ha Eliminado")
        }
    });
}
