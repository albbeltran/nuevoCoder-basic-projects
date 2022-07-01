const form = document.querySelector('.formulario');
form.addEventListener('submit', enviarDatos);
const respuestas = document.getElementsByClassName("input-text"); // get the input just once and not every single time that ocurred the event
const passwords = Array.from(respuestas).filter(item => item.type === 'password');

// events to compare the passwords
passwords.forEach(input =>  {
  input.addEventListener('input', validatePass);
  input.addEventListener('blur', validatePass);
})

// Evaluate the passwords
function validatePass(){
  const [pass1, pass2] = passwords;
  if(pass1.value !== pass2.value) {
      pass1.classList.add('invalid-input')
      pass2.classList.add('invalid-input')
  }
  else {
    pass1.classList.remove('invalid-input')
    pass2.classList.remove('invalid-input')
  }
}

function enviarDatos(e){
  let contador=true;
    e.preventDefault();
    for(let i=0; i<respuestas.length;i++){
        if (respuestas[i].value===""){
            contador =false;
        }
    }
    if (document.getElementsByClassName("check")[0].validity.valueMissing==true) contador = false;
    if (contador==true){
      form.reset();
      Swal.fire({
        icon: 'success',
        title:'Registro exitoso',
        text: 'Datos guardados exitosamente',
      })
    }
}