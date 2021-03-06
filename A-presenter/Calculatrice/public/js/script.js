addOrUpdate = () => {
    const num1 = $('#number1').val();
    const num2 = $('#number2').val();
    let operator = $('#operator').val();
    const postBtn = $('form button[type="submit"] .text');
    const id = $('#hidden-id').val();
    let actionForm = '';
    let params = '';

    if (!num1 || !num2 || !operator){
        return
    }

    // Bascule entre ajouté un calcule et une édition d'après le texte du bouton 
    postBtn.text() == 'Modifier' ? actionForm = 'update' : actionForm = 'save';
    params = {
        number1: num1,
        operator: operator,
        number2: num2,
        id: id
    };
    
    if (actionForm == 'save'){
        $(".text").html('Ajout...');
        $(".spinner-border").show();
    }
    $(".fa-plus").hide();

    $.post({
        url: actionForm == 'save' ? `calcul/save` : `calcul/update/${id}`,
        data: params,
        beforeSend: () => $(".spinner-border").show(),
        complete: (calcul)=> {
            // reloadCalculs();
            $(".spinner-border").hide();
            $(".text").html('Ajouter');
            $(".fa-plus").show();
            if (actionForm == 'save'){
                calcul = JSON.parse(calcul.responseText)
                const html = (function (calculs) {
                    calcul.enabled == true ? isDisable = '' : isDisable = 'disabled';
                    calcul.enabled == false ? textEnabl = 'Activer' : textEnabl = 'Désactiver';
                    calcul.result == null ? calcul.result = '' : '';
                    return cardCalcul(calcul)
                });
                const element = $('#container-list-calcul');
                $(element).prepend(html);
                $('#container-list-calcul > div').first().hide().show('slow');
            };
        },
    })
        
    if (actionForm == 'update'){
        switch (operator){
            case '0': operator = '+'; break
            case '1': operator = '-'; break
            case '2': operator = '*'; break
            case '3': operator = '/'; break
        };
        $(`[data-id='${id}'] [data-number1]`).text(num1).hide().show('slow');
        $(`[data-id='${id}'] [data-number2]`).text(num2).hide().show('slow');
        $(`[data-id='${id}'] [data-operator]`).text(operator).hide().show('slow');
        $(`[data-id='${id}'] [data-result]`).text('').hide().show('slow');
    }
    
    document.querySelector("#calcul-form").reset(); // Remet tous les champs du formulaire à l'état initiale
};

editCalcul = (id) => {
    if (checkIfEnable(id) === false) {
        return;
    }

    const num1 = Number($(`[data-id='${id}'] [data-number1]`).text());
    const num2 = Number($(`[data-id='${id}'] [data-number2]`).text());
    const op = $(`[data-id='${id}'] [data-operator]`).text().trim();

    console.log(op);
    if ((op && num1 && num2) || num1 == 0 || num2 == 0) {
        switch (op) {
            case '+': $('#operator').val('0');break
            case '-': $('#operator').val('1');break
            case '*': $('#operator').val('2');break
            case '/': $('#operator').val('3');break
            default:console.log('error');
                return
        }

        $('#number1').val(num1);
        $('#number2').val(num2);
        $('calcul-form').attr('action' , '/calcul/update/' + id);
        $('#hidden-id').val(id);
        $('form button[type="submit"] .text').text('Modifier');
        window.location.replace("#"); // Permet de revenir en haut de la page pour afficher le formulaire de modification
    }
}


resultCalcul = (id) => {
    if (checkIfEnable(id) === false) { // Verifie si le calculs est désactivé
        return;
    }
    if (document.querySelector(`[data-id='${id}'] [data-result]`).innerText != ''){
        return
    }

    reqAjax(action = 'resultat', id) // Utilisation de Ajax pour obtenir le résultat d'une opération

    // Met à jour le DOM avec la réponse retournée pas le serveur 
    resAjax = (res) => {
        const resultat = res.resultat;
        $(`[data-id='${id}'] [data-result]`).hide().html(resultat).show('slow');
    };
}

deleteCalcul = (id) => {
    if (checkIfEnable(id) === false) {
        return;
    }
    reqAjax(action = 'delete', id);
    const el = $(`[data-id='${id}']`);
    $(el).hide('slow', ()=> $(this).remove());

}

toggleDisable = (id) => {
    reqAjax(action = 'disable', id);
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

reloadCalculs = () => {

    reqAjax(action = 'getAll'); // Utilisation de Ajax pour avoir tous les calculs 
    resAjax = (res) => { // Le résultat est injecté dans le DOM
        const html = res.calculs.map(function (calcul) {
            calcul.enabled == true ? isDisable = '' : isDisable = 'disabled';
            calcul.enabled == false ? textEnabl = 'Activer' : textEnabl = 'Désactiver';

            calcul.result == null ? calcul.result = '' : '';

            return cardCalcul(calcul)
        }).join(''); // 'colle' les éléments entre eux. évite les bugs d'affichages... 

        const element = document.querySelector('#container-list-calcul');
        // element.innerHTML = html; // met les éléments dans une div
        // $(element).html(html).fadeIn();

        $(element).html(html);
        
    }
}
// var test =''
function reqAjax(action, id = null, params = null) {
    const req = new XMLHttpRequest(); // Instancie un nouvel objet XMLHttpRequest 
    let res = '';
    let dataReq = null;

    req.onreadystatechange = function () {
        // console.log(this.status)

        // DONE = 4 : XMLHttpRequest terminer, le status 200 = OK resource trouvé
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // console.log("Réponse reçue: %s", this.responseText);

            try {
                res = JSON.parse(this.responseText); // JSON.parse() transforme une chaîne de caractère en objet JSON
                resAjax(res);
            } catch (e) {
                return
            }
            // console.log(res)

        } else {
            // console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
        }
    };

    // Vérifie l'action de la requête Ajax et définis ses paramètres selon le cas
    switch (action) {
        case 'getAll':
            dataReq = {
                path: `/calcul/${action}`,
                method: 'GET',
                params: null
            }
            break
        case 'disable':
        case 'delete':
        case 'resultat':
            dataReq = {
                path: `/calcul/${action}/${id}`,
                method: 'GET',
                params: null
            }
            break
        default:
            return
    }
    req.open(dataReq.method, dataReq.path, true); // true pour asynchrone 
    if (dataReq.params != null) {
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    }
    req.send(dataReq.params);
}

cardCalcul = (calcul) =>{
    return `
    <div class="row justify-content-center">
    
    <div class="col-md-6">
        <div class="mb-2" data-id="${calcul._id}" data-enabled="${calcul.enabled}">
    
    
            <div class="row">
                <div class="col-12">
                    <div class="card border-0 rounded-50">
                        <div class="card-body">
                            <h3 class="card-title m-0">
                                <div class="row">
                                    <div class="col-md-12">
                                        <p class="d-inline" data-number1="${calcul.number1}" class="fs20">
                                                ${calcul.number1}
                                        </p>
                                        <p class="d-inline" data-operator="${calcul.operator}" class="fs20">
                                            ${calcul.operator}
                                        </p>
                                        <p class="d-inline" data-number2="${calcul.number2}" class="fs20">
                                            ${calcul.number2}
                                        </p>
                                        <p class="d-inline" class="fs20">=</p>
                                        <p class="d-inline" data-result="${calcul.result}" class="fs20">
                                            ${calcul.result}
                                        </p>
                                        <hr class="bt-042" >
                                    </div>
    
    
                                    <div class="col-md-12 text-center">
                                        <div class="d-inline">
    
    
                                            <button data-btn="${calcul._id}" aria-label="Calculer"
                                                onclick="resultCalcul('${calcul._id}'); return false" type="button"
                                                class="btn btn-primary ${isDisable}">
                                                <i class="fas fa-calculator mr-1"></i>
                                                <span class="d-none fs12 d-lg-inline">
                                                    Calculer
                                                </span>
                                            </button>
    
    
                                            <button data-btn="${calcul._id}" onclick="editCalcul('${calcul._id}')" aria-label="Modifier"
                                                type="button"
                                                class="btn btn-warning ${isDisable}"><i class="fas fa-pencil-alt mr-1"></i>
                                                <span class="d-none fs12 d-lg-inline">
                                                    Modifier
                                                </span>
                                            </button>
    
    
                                                <button data-toggle-disable class="btn btn-secondary" aria-label="Activer / Désactiver" onclick="toggleDisable('${calcul._id}')">
                                                    <i class="fas fa-lock mr-1"></i>
                                                    <span class="d-none fs12 d-lg-inline">
                                                        ${textEnabl}
                                                    </span>
                                                </button>
    
    
                                            <button data-btn="${calcul._id}" aria-label="Supprimer"
                                                onclick="deleteCalcul('${calcul._id}')"
                                                class="btn btn-danger ${isDisable}">
                                                <i class="far fa-trash-alt mr-1"></i>
                                                <span class="d-none fs12 d-lg-inline">
                                                    Supprimer
                                                </span>
                                            </button>
    
    
    
    
    
                                        </div>
                                    </div>
    
    
                                </div>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    </div>
    </div>`
}
