const keyApi = "571f6cb60c9a4b5de970f551"
const baseURL = "https://v6.exchangerate-api.com/v6/"

const currenciesEl = document.querySelector('[data-js="currency-container"]') as HTMLElement

const getErrormessage = (errorType: string): string => ({
  'unsupported-code': 'a moeda não existe em nosso banco de dados',
  'malformed-request': ' when some part of your request doesnt follow the structure shown above.',
  'invalid-key': ' when your API key is not valid.',
  'inactive-account': 'if your email address wasnt confirmed.',
  'quota-reached': 'when your account has reached the the number of requests allowed by your plan.'
})[errorType] || 'nao foi possivel exibir os dados'


interface ErroAPI {
  message: string
}

const errorMessageCreate = ({ message }: ErroAPI): void => {
  const div: HTMLDivElement = document.createElement('div')
  const button: HTMLButtonElement = document.createElement('button')

  div.textContent = message 
  div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show')
  button.classList.add('btn-close')
  div.setAttribute('role', 'alert')
  button.setAttribute('type', 'button')
  button.setAttribute('aria-label', 'close')

  button.addEventListener('click', () => {div.remove()})

  div.appendChild(button)
  currenciesEl.insertAdjacentElement('afterend', div)
}

const fetchData = async <T>(url: string): Promise<T | null>=> {
  try{
    const response = await fetch(url)

    if(!response.ok){
      throw new Error('Sua conexao falhou. Nao foi possivel exibir dados')
    }
    
    const exchangeRateData = await response.json()
  
    if(exchangeRateData.result === 'error'){
      throw new Error(getErrormessage(exchangeRateData['erro-type']))
    }
    return exchangeRateData
  }catch(err){
    errorMessageCreate(err as ErroAPI)
    return null
  }
}

interface DataConversionAPI {
  base_code: string,
  target_code: string,
  conversion_result: number
}

interface SupportedCodes {
  supported_codes: string[]
}


const isSupportedCodes = (value: unknown): value is SupportedCodes => 
  value && typeof value === 'object' && 'supported_codes' in value 
  ? true 
  : false

const isValueAPIConvert = (value: unknown): value is DataConversionAPI  => 
  value && typeof value === 'object' && 'base_code' in value && 'target_code' in value && 'conversion_result' in value
  ? true
  : false

const requestCoins = async (): Promise<SupportedCodes | null> => {
  const coins = await fetchData(`${baseURL}${keyApi}/codes`)
  if(isSupportedCodes(coins)) {
    return coins
  }
  return null
}

const requestConvertCoins = async ([coinOne , coinTwo , value ]: string[]): Promise<DataConversionAPI | null> => {
  const convertedCoin = await fetchData(`${baseURL}${keyApi}/pair/${coinOne}/${coinTwo}/${value}`)
  if(isValueAPIConvert(convertedCoin)){
    return convertedCoin
  }
  return null
}

export {requestCoins, requestConvertCoins}

