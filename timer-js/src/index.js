const $horas = document.querySelector('#horas');
const $minutos = document.querySelector('#minutos');
const $segundos = document.querySelector('#segundos');

const $btnHorasSumar = document.querySelector('#btn-sumar-horas');
const $btnMinutosSumar = document.querySelector('#btn-sumar-minutos');
const $btnMegundosSumar = document.querySelector('#btn-sumar-segundos');


const $btnHorasRestar = document.querySelector('#btn-restar-horas');
const $btnMinutosRestar = document.querySelector('#btn-restar-minutos');
const $btnMegundosRestar = document.querySelector('#btn-restar-segundos');

const $btnPause = document.querySelector('#btn-pausa')
const $btnDetener = document.querySelector('#btn-detener')
const $stop = document.querySelector('#stop')
const $pause = document.querySelector('#pause')
const $popup = document.querySelector('.popup')

const $buttons = document.querySelector("#buttons")
const $buttonsFunctions = document.querySelector('.container-temporizador');
const $buttonPopup = document.querySelector('.btn-popup')

const $audio = new Audio('/static/alarma_2.mp3')

const main = () => {

  //! seteando las variables iniciales 

  //el boton detener por defecto esta desactivado
  // $btnDetener.disabled = true;
  let start = false;
  let temporizador;
  let horas = +$horas.value
  let minutos = +$minutos.value
  let segundos = +$segundos.value

  // validateTime(horas, segundos, minutos)


  const arr = [$minutos, $horas, $segundos];

  //! boton que deactiva y desaparece el popup
  $buttonPopup.addEventListener('click', function () {
    //desactiva el popup
    $popup.classList.add('popup_disable')
    //pausa le audio y lo resetea a 0 
    $audio.pause();
    $audio.currentTime = 0;
  })

  //! funcionalidad de los botones de sumar y restar
  $buttonsFunctions.addEventListener('click', ({ target }) => {
    switch (target) {
      case $btnHorasSumar:

        horas = horas + 1
        $horas.value = horas
        return validateTime(segundos, minutos, horas)

      case $btnHorasRestar:

        horas = Math.max(horas - 1, 0)
        $horas.value = horas
        return validateTime(segundos, minutos, horas)
      case $btnMinutosSumar:

        minutos = minutos + 1
        if (minutos == 60) {
          horas = horas + 1
          $horas.value = horas
          minutos = 0
        }

        $minutos.value = minutos
        return validateTime(segundos, minutos, horas)
      case $btnMinutosRestar:
        minutos = Math.max(minutos - 1, 0);
        $minutos.value = minutos
        return validateTime(segundos, minutos, horas)
      case $btnMegundosSumar:
        segundos = segundos + 1;
        if (segundos === 60) {
          minutos = minutos + 1;
          $minutos.value = minutos;
          segundos = 0
        }
        validateTime(segundos, minutos, horas)
        return $segundos.value = segundos

      case $btnMegundosRestar:

        segundos = Math.max(segundos - 1, 0);
        validateTime(segundos, minutos, horas)
        return $segundos.value = segundos;

      default:
        return null
    }
  })

  //! funcionalidad: cada que haces un cambio en el input, se agrega el valor que tiene ese input a los valores del timer, y hace validaciones que los minutos y seg no pasen de 60 y si pasan se suma uno al correspondiente valor sucesor

  arr.forEach((ele, i) => ele.addEventListener('blur', function (e) {
    horas = +$horas.value
    minutos = +$minutos.value
    segundos = +$segundos.value
    minutos = minutos > 59 ? 59 : minutos
    segundos = segundos > 59 ? 59 : minutos
    if (!segundos) {
      $segundos.value = 0
    }
    if (!minutos) {
      $segundos.value = 0
    }
    if (!horas) {
      $segundos.value = 0
    }
    $horas.value = horas;
    $minutos.value = minutos;
    $segundos.value = segundos
    return validateTime(segundos, minutos, horas)

  }))


  //! Inicia el contador 
  $buttons.addEventListener('click', (element) => {

    if (element.target == $btnPause) {
      //cambia el valor de la variable start
      start = !start;
    }
    if (element.target == $btnDetener) {
      start = false;
      //limpia el temporizador
      clearInterval(temporizador)
      //reseteando a cero los valores 
      horas = 0
      minutos = 0
      segundos = 0
      //reseteando los valores en el HTML
      resetValuesDOM($segundos, $minutos, $horas);
      //desactiva el boton detener
      validateTime(segundos, minutos, horas)
      $btnDetener.disabled = true;
      $btnDetener.classList.add('disable')
    }



    if (start) {

      $btnDetener.disabled = false;
      $btnDetener.classList.remove('disable')

      //cambia la leyenda 
      $btnPause.classList.add('pause')
      //inicial el temporizador
      temporizador = setInterval(() => {

        if (segundos !== 0) {
          segundos -= 1;
          $segundos.value = segundos

        } else {
          //los segundos son 0

          if (minutos !== 0) {

            segundos = 59;
            $segundos.value = segundos
            minutos -= 1
            $minutos.value = minutos

          } else {
            //los minutos son 0
            if (horas !== 0) {
              horas -= 1;
              $horas.value = horas
              minutos = 59;
              $minutos.value = minutos
            }
          }
        }

        validateTime(minutos, segundos, horas)
        //cuando el temporizador finalize
        if (segundos === 0 && minutos == 0 && horas === 0) {
          //inicia el audio
          $audio.play()
          //muestar el popup
          $popup.classList.remove('popup_disable')
          //Elimina el temporizador
          clearInterval(temporizador)

          validateTime(segundos, minutos, horas)

          $btnDetener.disabled = true;
          $btnDetener.classList.add('disable')


        }

      }, 1000)
    } else {

      //
      $btnPause.classList.remove('pause')
      //Elimina el temporizador
      clearInterval(temporizador)
    }

  })



}

//!valuda el valor de los minutos, segundos y horas, para asi activar o desactivar el boton de coninuat o pausar
const validateTime = (segundos, minutos, horas, button) => {
  if (segundos === 0 && minutos === 0 && horas === 0) {
    $btnPause.disabled = true;
    $btnPause.classList.add('disable')
  } else {
    $btnPause.disabled = false;
    $btnPause.classList.remove('disable')


  }
}

//reinicia los valores en el DOM a 0
const resetValuesDOM = (...values) => {
  for (const iterator of values) {
    iterator.value = 0;
  }
}

main()