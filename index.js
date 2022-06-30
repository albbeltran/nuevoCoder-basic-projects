const form = document.querySelector('.formulario');
form.addEventListener('submit', enviarDatos);

function enviarDatos(e){
    e.preventDefault();
    let respuestas=document.getElementsByClassName("input-text");
    let contador=0;
    for(let i=0; i<respuestas.length;i++){
        if (respuestas[i].value===""){
            contador += 1;
        }
    }
    if (document.getElementsByClassName("check")[0].validity.valueMissing==true){
        contador++;
    }

    if(respuestas[5].value !== respuestas[6].value) {
      contador += 1;
    }

    if (contador!=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Completa todos los datos correctamente',
        footer: 'Es necesario para registrarse',
        width:'50%'
      })
    }else{
      form.reset();
      Swal.fire({
        icon: 'success',
        title:'Registro exitoso',
        text: 'Datos guardados exitosamente',
        time:20000
      })
    }
}
