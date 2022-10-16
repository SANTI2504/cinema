function traerInformacion() {

    $.ajax({
        url: "http://localhost:8080/api/Cinema/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            //Acá se puede validar la respuesta.
            console.log(respuesta);
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#owner").val("");
            $("#capacity").val("");
            $("#description").val("");
            $("#category").val("");
            pintarRespuesta(respuesta);

        }
    });
}

function pintarRespuesta(items) {
    let mytable ='<table class="table table-sm table-re table-success table-hover">' ;
    mytable += '<thead>'+
    '<tr>'+
      '<th scope="col">ID</th>'+
      '<th scope="col">Nomnre</th>'+
      '<th scope="col">Empresa</th>'+
      '<th scope="col">Capacidad</th>'+
      '<th scope="col">Descripcion</th>'+
      '<th scope="col">Categoria</th>'+
      '<th scope="col">Acciones</th>'+
    '</tr>'+
  '</thead>';
    for (i = 0; i < items.length; i++) {
        mytable += "<tr>";
        mytable += "<td>" + items[i].id + "</td>";
        mytable += "<td>" + items[i].name + "</td>";
        mytable += "<td>" + items[i].owner + "</td>";
        mytable += "<td>" + items[i].capacity + "</td>";
        mytable += "<td>" + items[i].description + "</td>";
        mytable += "<td>" + items[i].category.name + "</td>";


        mytable+="<td> <button onclick='borrarElemento("+items[i].id+")' type='button' class='btn btn-sm btn-danger'>Borrar</button>";
        mytable+=" <button onclick='editarElemento("+items[i].id+")' type='button' class='btn btn-sm btn-warning'>Editar</button>"+"</td>";

        mytable += "</tr>";
    }
    mytable += "</table>";
    $("#resultado").append(mytable);

}
function guardarInformacion() {
    let myData = {
        id: $("#id").val(),
        name: $("#name").val(),
        owner: $("#owner").val(),
        capacity: $("#capacity").val(),
        description: $("#description").val(),
        category: {id: $("#category").val()},
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        url: "http://localhost:8080/api/Cinema/save",
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
        url: "http://localhost:8080/api/Cinema/"+idElemento,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let array = respuesta.items
            $("#id").val(array[0].id);
            $("#name").val(array[0].name);
            $("#owner").val(array[0].owner);
            $("#capacity").val(array[0].capacity);
            $("#description").val(array[0].description);
            $("#category").val(array[0].category.id);
            alert("accion realizada")
        }
    });
}


function actualizarInformacion() {
    let myData = {
        id: $("#id").val(),
        name: $("#name").val(),
        owner: $("#owner").val(),
        capacity: $("#capacity").val(),
        description: $("#description").val(),
        category: {id: $("#category").val()},
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/api/Cinema/update",
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
        id: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/api/Cinema",
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
