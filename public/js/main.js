var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { requestCoins, requestConvertCoins } from "./coinAPI.js";
const currentOne = document.querySelector('[data-js="currency-one"]');
const currentTwo = document.querySelector('[data-js="currency-two"]');
const containerSelectCoins = document.querySelector('.container-selects');
const valueConverted = document.querySelector('[data-js="converted-value"]');
const currencyValueToConvert = document.querySelector('[data-js="currency-one-times"]');
const conversionPrecicionValue = document.querySelector('[data-js="conversion-precision"]');
const coinData = () => __awaiter(void 0, void 0, void 0, function* () {
    const coinCodes = yield requestCoins();
    if (coinCodes) {
        return coinCodes === null || coinCodes === void 0 ? void 0 : coinCodes.supported_codes;
    }
    return null;
});
const insertCoins = () => __awaiter(void 0, void 0, void 0, function* () {
    const coinCodes = yield coinData();
    if (coinCodes) {
        const coinCodesFilter = coinCodes.filter(([acronymCoin]) => acronymCoin !== "USD" && acronymCoin !== "BRL");
        coinCodesFilter.forEach(([acronymCoin, nameCoin]) => {
            currentOne.innerHTML += `<option value="${acronymCoin}">${nameCoin}</option>`;
            currentTwo.innerHTML += `<option value="${acronymCoin}">${nameCoin}</option>`;
        });
    }
});
const convertedCoins = (...parameters) => __awaiter(void 0, void 0, void 0, function* () {
    const [_coinOne, _coinTwo, value] = parameters;
    const coinConvert = yield requestConvertCoins(parameters);
    if (coinConvert) {
        const { base_code: coinBase, target_code: coinTarget, conversion_result: coinConversionResult } = coinConvert;
        valueConverted.textContent = coinConversionResult.toFixed(2);
        conversionPrecicionValue.textContent = `${value} ${coinBase} = ${coinConversionResult} ${coinTarget}`;
    }
});
const showConvertedCoin = () => {
    const value = currencyValueToConvert.value.length !== 0 ? currencyValueToConvert.value : '0';
    const coinOne = currentOne.value;
    const coinTwo = currentTwo.value;
    convertedCoins(coinOne, coinTwo, value);
};
insertCoins();
containerSelectCoins.addEventListener('change', showConvertedCoin);
currencyValueToConvert.addEventListener('input', showConvertedCoin);
