
/**
 * Mascara para CPF
 * @param {String} value
 * @returns {String} Valor convertido
 */
const cpfMask = (value) => {
    return value
        .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");

};

/**
 * Mascara para dolar
 * @param {String} value
 * @returns {String} Valor convertido
 */
const money = (value) => {
    const cleanValue = +value.replace(/\D+/g, '') // substitui qualquer caracter que nao seja numero por nada
    const options = { style: 'currency', currency: 'BRL' }
    return new Intl.NumberFormat('pt-br', options).format(cleanValue / 100)

};



/**
 * Mascara para CNPJ
 * @param {String} value
 * @returns {String} Valor convertido
 */
const cpnjMask = (value) => {
    return value
        .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
};


/**
* Mascara para CEP
* @param {String} value
* @returns {String} Valor convertido
*/
const cep = (value) => {
    return value
        .replace(/\D+/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
};


/**
* Mascara para PIS
* @param {String} value
* @returns {String} Valor convertido
*/
const pis = (value) => {
    return value
        .replace(/\D+/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{5})(\d)/, '$1.$2')
        .replace(/(\d{5}\.)(\d{2})(\d)/, '$1$2-$3')
        .replace(/(-\d)\d+?$/, '$1')
};



/**
 * Mascara para CPF e CNPJ no mesmo input
 * @param {String} value
 * @returns {String} Valor convertido
 */
const cpf_cnpj_mask = (value) => {
    if (value.replace(/[^0-9 ]/g, "").length <= 11) {
        return value
            .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    } else {
        return value
            .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{2})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    }
};


/**
 * Formata input para MM/AAAA
 * @param {String} value
 * @returns {String} Valor convertido
 */
const monthYearMask = (value) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\/\d{4})\d+?$/, "$1")
};


/**
 * Formata input para DD/MM/AAAA
 * @param {String} value
 * @returns {String} Valor convertido
 */
const dayMonthYearMask = (value) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\/\d{4})\d+?$/, "$1")
};


/**
 * Formata input para (xx) xxxx-xxxx
 * @param {String} value
 * @returns {String} Valor convertido
 */
const phoneBrMask = (value) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1")
};


/**
 * Formata input para (xx) x xxxx-xxxx
 * @param {String} value
 * @returns {String} Valor convertido
 */
const cellphoneBrMask = (value) => {
    if (value.length < 3) {
        return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2");
    } else {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)(\d)/, "($1) $2 $3")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .replace(/(-\d{4})\d+?$/, "$1");
    }
};


// document.querySelectorAll('.money').forEach(input => {
//     const field = input.dataset.js

//     input.addEventListener('input', e => {
//         e.target.value = masks[field](e.target.value)
//     }, false)
// })


function category(c) {
    let item = document.getElementById('item-'+c).innerHTML;
    document.getElementsByTagName('input')[3].value = item;
}

function dropdown(p) {
    let e = document.getElementsByClassName('dropDown')[0];
    let d = ['block', 'none'];

    e.style.display = d[p];
    setTimeout(function(){
        e.style.transform = 'translate(0px)';
    }, 0)
};

