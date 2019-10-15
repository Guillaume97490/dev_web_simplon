editFunction = (id) => {
    var num1 = Number(document.querySelector(`[data-id='${id}'] [data-number1]`).dataset.number1);
    var num2 = Number(document.querySelector(`[data-id='${id}'] [data-number2]`).dataset.number2);
    var op = document.querySelector(`[data-id='${id}'] [data-operator]`).dataset.operator;
    if (op) {
        switch (op) {
            case '+':
                document.querySelector('#operator').value = '0'
                break
            case '-':
                document.querySelector('#operator').value = '1'
                break
            case '*':
                document.querySelector('#operator').value = '2'
                break
            case '/':
                document.querySelector('#operator').value = '3'
                break
            default:
                console.log('error');
                return
        }
        if (num1) {
            document.querySelector('#number1').value = num1;
        };
        if (num2) {
            document.querySelector('#number2').value = num2;
        };
        document.getElementById('calcul-form').action = '/calcul/update/' + id;
        document.querySelector('#hidden-id').value = id;
        document.querySelector('form button[type="submit"]').innerText = 'Modifier';
        window.location.replace("#");
    }
}
calculFunction = (id) =>{
    var num1 = Number(document.querySelector(`[data-id='${id}'] [data-number1]`).dataset.number1);
    var num2 = Number(document.querySelector(`[data-id='${id}'] [data-number2]`).dataset.number2);
    var op = document.querySelector(`[data-id='${id}'] [data-operator]`).dataset.operator;
    if (op && num1 && num2) {
        switch (op) {
            case '+':
                result = num1 + num2;
                break
            case '-':
                result = num1 - num2;
                break
            case '*':
                result = num1 * num2;
                break
            case '/':
                result = num1 / num2;
                break
            default:
                console.log('error');
                return
        }
        document.querySelector(`[data-id='${id}'] [data-result]`).innerHTML = result;
        // window.location.replace("http://www.w3schools.com");

        // AJAX sauvegarde du résultat dans la base
        const req = new XMLHttpRequest();
        req.onreadystatechange = function(event) {
            // XMLHttpRequest.DONE === 4
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    // console.log("Réponse reçue: %s", this.responseText);
                } else {
                    // console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                }
            }
        };
        req.open('GET', `/calcul/resultat/${id}`, true);
        req.send(null); 


    }
}
