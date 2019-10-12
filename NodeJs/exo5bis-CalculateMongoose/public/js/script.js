editFunction =(id) =>{
    var operationEdit = Array.from(document.querySelectorAll('td[data-id="'+id+'"]'));
    operationEdit.forEach(item => {
        if(item.dataset.number1){
            document.querySelector('#number1').value = Number(item.dataset.number1);
        };
        if(item.dataset.number2){
            document.querySelector('#number2').value = Number(item.dataset.number2);
        };
        if(item.dataset.operator){
            switch (item.dataset.operator){
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
                
            }
            document.getElementById('calcul-form').action = '/calculate/update/'+id;    
            document.querySelector('#hidden-id').value = id;
            document.querySelector('form button[type="submit"]').innerText = 'Modifier';
        };
    });

}