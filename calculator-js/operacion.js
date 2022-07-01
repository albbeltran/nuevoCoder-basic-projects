function operacion() {
    let input_valor = document.getElementById('campo_valor');
    let valor = parseInt(input_valor.value);
   let dato = [];
    let resultado;
    dato[1] = prompt(`Elemento ${1} a ingresar:`);
    resultado= parseInt(dato[1]);
    for (let i = 2; i <= valor; i++){
            let op = prompt("1)Suma  2)Resta  3)Multiplicacion  4)Division  5)Salir");
            op= parseInt(op);
            if (op == 1){
                dato[i] = prompt(`Elemento ${i} a ingresar:`);
                resultado += parseInt(dato[i]);
            }
            else if (op == 2){
                dato[i] = prompt(`Elemento ${i} a ingresar:`);
                resultado -= parseInt(dato[i]);
            }
            else if (op == 3){
                dato[i] = prompt(`Elemento ${i} a ingresar:`);
                resultado *= parseInt(dato[i]);
            }
            else if (op == 4){
                dato[i] = prompt(`Elemento ${i} a ingresar:`);
                resultado /= parseInt(dato[i]);
            }
            else if (op == 5){
                break;
            }
            else {
                prompt("Ya superaste tú límite de valores.")
            }
    }
    alert("El resultado de la operación es: " + resultado);
}