editCalcul = (id) => {
    if (checkIfEnable(id) === false){return;}

    var num1 = Number(document.querySelector(`[data-id='${id}'] [data-number1]`).dataset.number1);
    var num2 = Number(document.querySelector(`[data-id='${id}'] [data-number2]`).dataset.number2);
    var op = document.querySelector(`[data-id='${id}'] [data-operator]`).dataset.operator;
    if (op && num1 && num2) {
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

        document.querySelector('#number1').value = num1;
        document.querySelector('#number2').value = num2;

        document.getElementById('calcul-form').action = '/calcul/update/' + id;
        document.querySelector('#hidden-id').value = id;
        document.querySelector('form button[type="submit"]').innerText = 'Modifier';
        window.location.replace("#"); // Permet de revenir en haut de la page pour afficher le formulaire de modification
        // console.log(bntSubmit);
        
    }
}
resultCalcul = (id) => {
    if (checkIfEnable(id) === false){return;}
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
        reqAjax(id,action = 'resultat');
    }
}
deleteCalcul = (id) => {
    if (checkIfEnable(id) === false){return;}

    reqAjax(id,action = 'delete');

    var el = document.querySelector(`[data-id='${id}']`);

    el.remove();
}

toggleDisable = (id) => {
    reqAjax(id,action = 'disable');

    var el = document.querySelector(`[data-id='${id}']`);
    var enable = el.dataset.enabled;
    enable == 'true' ? el.dataset.enabled = 'false' : el.dataset.enabled = 'true';

    if (enable == 'true') {
        el.dataset.enabled = 'false'
        var btns = document.querySelectorAll(`[data-id='${id}'] [data-btn]`);
            btns.forEach(btn => {
            btn.classList.add('disabled')
        });
    }
    if (enable == 'false') {
        el.dataset.enabled = 'true'
        var btns = document.querySelectorAll(`[data-id='${id}'] [data-btn]`);
            btns.forEach(btn => {
            btn.classList.remove('disabled')
        });
    }
    // console.log(btns)
}

checkIfEnable = (id) => {
    var el = document.querySelector(`[data-id='${id}']`);
    var enable = el.dataset.enabled;
    if (enable === 'false') {
        return false
    }
}

reqAjax = (id,action) => {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function (event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                // console.log("Réponse reçue: %s", this.responseText);
            } else {
                // console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    };
    req.open('GET', `/calcul/${action}/${id}`, true);
    req.send(null);
}