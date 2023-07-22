var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const keyApi = "571f6cb60c9a4b5de970f551";
const baseURL = "https://v6.exchangerate-api.com/v6/";
const currenciesEl = document.querySelector('[data-js="currency-container"]');
const getErrormessage = (errorType) => ({
    'unsupported-code': 'a moeda não existe em nosso banco de dados',
    'malformed-request': ' when some part of your request doesnt follow the structure shown above.',
    'invalid-key': ' when your API key is not valid.',
    'inactive-account': 'if your email address wasnt confirmed.',
    'quota-reached': 'when your account has reached the the number of requests allowed by your plan.'
})[errorType] || 'nao foi possivel exibir os dados';
const errorMessageCreate = ({ message }) => {
    const div = document.createElement('div');
    const button = document.createElement('button');
    div.textContent = message;
    div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show');
    button.classList.add('btn-close');
    div.setAttribute('role', 'alert');
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', 'close');
    button.addEventListener('click', () => { div.remove(); });
    div.appendChild(button);
    currenciesEl.insertAdjacentElement('afterend', div);
};
const fetchData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error('Sua conexao falhou. Nao foi possivel exibir dados');
        }
        const exchangeRateData = yield response.json();
        if (exchangeRateData.result === 'error') {
            throw new Error(getErrormessage(exchangeRateData['erro-type']));
        }
        return exchangeRateData;
    }
    catch (err) {
        errorMessageCreate(err);
        return null;
    }
});
const isSupportedCodes = (value) => value && typeof value === 'object' && 'supported_codes' in value
    ? true
    : false;
const isValueAPIConvert = (value) => value && typeof value === 'object' && 'base_code' in value && 'target_code' in value && 'conversion_result' in value
    ? true
    : false;
const requestCoins = () => __awaiter(void 0, void 0, void 0, function* () {
    const coins = yield fetchData(`${baseURL}${keyApi}/codes`);
    if (isSupportedCodes(coins)) {
        return coins;
    }
    return null;
});
const requestConvertCoins = ([coinOne, coinTwo, value]) => __awaiter(void 0, void 0, void 0, function* () {
    const convertedCoin = yield fetchData(`${baseURL}${keyApi}/pair/${coinOne}/${coinTwo}/${value}`);
    if (isValueAPIConvert(convertedCoin)) {
        return convertedCoin;
    }
    return null;
});
export { requestCoins, requestConvertCoins };
