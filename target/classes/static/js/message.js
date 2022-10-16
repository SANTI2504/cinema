function traerInformacion() {

    $.ajax({
        url: "http://localhost:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            //Acá se puede validar la respuesta.
            console.log(respuesta);
            $("#resultado").empty();
            $("#idMessage").val("");
            $("#messageText").val("");
            $("#cinema").val("");
            $("#client").val("");
            pintarRespuesta(respuesta);

        }
    });
}

function pintarRespuesta(items) {
    let mytable ='<table class="table table-sm table-re table-success table-hover">' ;
    mytable += '<thead>'+
    '<tr>'+
      '<th scope="col">ID</th>'+
      '<th scope="col">Mensaje</th>'+
      '<th scope="col">Cinema</th>'+
      '<th scope="col">Cliente</th>'+
      '<th scope="col">Acciones</th>'+
    '</tr>'+
  '</thead>';
    for (i = 0; i < items.length; i++) {
        mytable += "<tr>";
        mytable += "<td>" + items[i].idMessage + "</td>";
        mytable += "<td>" + items[i].messageText + "</td>";
        mytable += "<td>" + items[i].cinema.name + "</td>";
        mytable += "<td>" + items[i].client.name + "</td>";

        mytable+="<td> <button onclick='borrarElemento("+items[i].idMessage+")' type='button' class='btn btn-sm btn-danger'>Borrar</button>";
        mytable+=" <button onclick='editarElemento("+items[i].idMessage+")' type='button' class='btn btn-sm btn-warning'>Editar</button>"+"</td>";

        mytable += "</tr>";
    }
    mytable += "</table>";
    $("#resultado").append(mytable);

}
function guardarInformacion() {
    let myData = {
        idMessage: $("#idMessage").val(),
        messageText: $("#messageText").val(),
        cinema:{ id: $("#cinema").val()},
        client:{ idClient: $("#client").val()},
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        url: "http://localhost:8080/api/Message/save",
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
        url: "http://localhost:8080/api/Message/"+idElemento,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let array = respuesta.items
            $("#idMessage").val(array[0].idMessage);
            $("#messageText").val(array[0].messageText);
            $("#cinema").val(array[0].cinema.id);
            $("#client").val(array[0].client.idClient);
            alert("accion realizada")
        }
    });
}


function actualizarInformacion() {
    let myData = {
        idMessage: $("#idMessage").val(),
        messageText: $("#messageText").val(),
        messageText: $("#messageText").val(),
        cinema:{ id: $("#cinema").val()},
        client:{ idClient: $("#client").val()},
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/api/Message/update",
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
        idMessage: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/api/Message",
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
