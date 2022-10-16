function traerInformacion() {

    $.ajax({
        url: "http://localhost:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            //Acá se puede validar la respuesta.
            console.log(respuesta);
            $("#resultado").empty();
            $("#idReservation").val("");
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#status").val("");
            $("#cinema").val("");
            $("#client").val("");
            $("#score").val("");
                pintarRespuesta(respuesta);

        }
    });
}

function pintarRespuesta(items) {
    let mytable ='<table class="table table-sm table-re table-success table-hover">' ;
    mytable += '<thead>'+
    '<tr>'+
      '<th scope="col">ID</th>'+
      '<th scope="col">Fecha devolucion</th>'+
      '<th scope="col">Fecha inicio</th>'+
      '<th scope="col">Estado</th>'+
      '<th scope="col">Cinema</th>'+
      '<th scope="col">Cliente</th>'+
      '<th scope="col">Calificacion</th>'+
      '<th scope="col">Acciones</th>'+
    '</tr>'+
  '</thead>';
    for (i = 0; i < items.length; i++) {
        mytable += "<tr>";
        mytable += "<td>" + items[i].idReservation + "</td>";
        mytable += "<td>" + items[i].startDate + "</td>";
        mytable += "<td>" + items[i].devolutionDate + "</td>";
        mytable += "<td>" + items[i].status + "</td>";
        mytable += "<td>" + items[i].cinema.name + "</td>";
        mytable += "<td>" + items[i].client.name + "</td>";
        mytable += "<td>" + items[i].score.stars + "</td>";

        mytable+="<td> <button onclick='borrarElemento("+items[i].idReservation+")' type='button' class='btn btn-sm btn-danger'>Borrar</button>";
        mytable+=" <button onclick='editarElemento("+items[i].idReservation+")' type='button' class='btn btn-sm btn-warning'>Editar</button>"+"</td>";

        mytable += "</tr>";
    }
    mytable += "</table>";
    $("#resultado").append(mytable);

}
function guardarInformacion() {
    let myData = {
        idReservation: $("#idReservation").val(),
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        status: $("#status").val(),
        cinema: {id:$("#cinema").val()},
        client: {idClient:$("#client").val()},
        score: {idScore:$("#score").val()},
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        url: "http://localhost:8080/api/Reservation/save",
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
        url: "http://localhost:8080/api/Reservation/"+idElemento,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let array = respuesta.items
            $("#idReservation").val(array[0].idReservation);
            $("#startDate").val(array[0].startDate);
            $("#devolutionDate").val(array[0].devolutionDate);
            $("#status").val(array[0].status.id);
            $("#cinema").val(array[0].cinema.id);
            $("#client").val(array[0].client.idClient);
            $("#score").val(array[0].client.idScore);
            alert("accion realizada")
        }
    });
}


function actualizarInformacion() {
    let myData = {
        idReservation: $("#idReservation").val(),
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        status: $("#status").val(),
        cinema: {id:$("#cinema").val()},
        client: {idClient:$("#client").val()},
        score: {idScore:$("#score").val()},
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/api/Reservation/update",
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
        idReservation: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/api/Reservation",
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
