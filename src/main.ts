import { requestCoins, requestConvertCoins } from "./coinAPI.js"

const currentOne = document.querySelector('[data-js="currency-one"]') as HTMLSelectElement
const currentTwo = document.querySelector('[data-js="currency-two"]') as HTMLSelectElement
const containerSelectCoins = document.querySelector('.container-selects') as HTMLElement
const valueConverted = document.querySelector('[data-js="converted-value"]') as HTMLElement
const currencyValueToConvert = document.querySelector('[data-js="currency-one-times"]') as HTMLInputElement
const conversionPrecicionValue = document.querySelector('[data-js="conversion-precision"]') as HTMLElement

const coinData = async (): Promise<string[] | null> => {
  const coinCodes = await requestCoins() 
  if(coinCodes){
    return coinCodes?.supported_codes
  }
  return null
} 

const insertCoins = async (): Promise<void> => {
  const coinCodes = await coinData()
  if(coinCodes){
    const coinCodesFilter = coinCodes.filter( ( [acronymCoin]: string): boolean => acronymCoin !== "USD" && acronymCoin !== "BRL")
    coinCodesFilter.forEach( ( [acronymCoin, nameCoin]: string ): void => {
      currentOne.innerHTML += `<option value="${acronymCoin}">${nameCoin}</option>`
      currentTwo.innerHTML += `<option value="${acronymCoin}">${nameCoin}</option>` 
    })
  }
}

const convertedCoins = async (...parameters: string[]): Promise<void> => {
  const [ _coinOne, _coinTwo, value ] = parameters
  const coinConvert = await requestConvertCoins(parameters)
  if(coinConvert){
    const { base_code: coinBase, target_code: coinTarget, conversion_result: coinConversionResult } = coinConvert

    valueConverted.textContent = coinConversionResult.toFixed(2)
    conversionPrecicionValue.textContent = `${value} ${coinBase} = ${coinConversionResult} ${coinTarget}`
  }
}

const showConvertedCoin = (): void => {
  const value: string = currencyValueToConvert.value.length !== 0 ? currencyValueToConvert.value : '0'
  const coinOne: string = currentOne.value
  const coinTwo: string = currentTwo.value

  convertedCoins(coinOne, coinTwo, value)
}

insertCoins()
containerSelectCoins.addEventListener('change', showConvertedCoin)
currencyValueToConvert.addEventListener('input', showConvertedCoin)