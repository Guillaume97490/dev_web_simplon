editCalcul = (id) => {
    if (checkIfEnable(id) === false) {
        return;
    }

    const num1 = Number(document.querySelector(`[data-id='${id}'] [data-number1]`).dataset.number1);
    const num2 = Number(document.querySelector(`[data-id='${id}'] [data-number2]`).dataset.number2);
    const op = document.querySelector(`[data-id='${id}'] [data-operator]`).dataset.operator;
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
    }
}
resultCalcul = (id) => {
    if (checkIfEnable(id) === false) {
        return;
    }
    reqAjax(id, action = 'resultat')
}

deleteCalcul = (id) => {
    if (checkIfEnable(id) === false) {
        return;
    }
    reqAjax(id, action = 'delete');
    const el = document.querySelector(`[data-id='${id}']`);
    el.remove();
}

toggleDisable = (id) => {
    reqAjax(id, action = 'disable');
    const calcul = document.querySelector(`[data-id='${id}']`);
    const enable = calcul.dataset.enabled;
    const btns = document.querySelectorAll(`[data-id='${id}'] [data-btn]`);
    const toggleDisable = document.querySelector(`[data-id='${id}'] [data-toggle-disable] span`);
    enable == 'true' ? calcul.dataset.enabled = 'false' : calcul.dataset.enabled = 'true';
    if (enable == 'true') {
        calcul.dataset.enabled = 'false';
        btns.forEach(btn => {
            btn.classList.add('disabled')
        });
    }
    if (enable == 'false') {
        calcul.dataset.enabled = 'true';
        btns.forEach(btn => {
            btn.classList.remove('disabled');
        });
    }
    toggleDisable.innerText == 'Désactiver' ? toggleDisable.innerText = 'Activer' : toggleDisable.innerText == 'Activer' ? toggleDisable.innerText = 'Désactiver' : '';
}

checkIfEnable = (id) => {
    const el = document.querySelector(`[data-id='${id}']`);
    const enable = el.dataset.enabled;
    if (enable === 'false') {
        return false
    }
}

reqAjax = (id, action) => {
    const req = new XMLHttpRequest(); // On instancie un nouvel objet XMLHttpRequest
    let res = ''; 
    req.onreadystatechange = function () {
        // Si tout c'est bien passé la requette est sera en readyState : 4, DONE et le status 200 = OK, aucun probleme
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) { 
            // console.log("Réponse reçue: %s", this.responseText);
            res = this.responseText;

            if (action = 'resultat') {
                const resultat = JSON.parse(res).resultat;
                document.querySelector(`[data-id='${id}'] [data-result]`).innerHTML = resultat;
            }
        } else {
            // console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
        }
    };
    req.open('GET', `/calcul/${action}/${id}`, true); // true pour asynchrone 
    req.send();
}