# Conversor de Moedas utilizando Exchange Rate API (TypeScript)

## Descrição do Projeto

O Conversor de Moedas é um projeto desenvolvido em TypeScript que utiliza a Exchange Rate API para converter valores entre diferentes moedas. A aplicação permite que os usuários informem o valor a ser convertido, a moeda de origem e a moeda de destino, retornando o valor convertido com base nas taxas de câmbio fornecidas pela API.

## Funcionalidades

- Conversão de valores entre moedas.
- Atualização automática das taxas de câmbio através da Exchange Rate API.
- Interface simples e intuitiva para facilitar o uso.

## Tecnologias Utilizadas

- TypeScript
- HTML5
- CSS3
- JavaScript (para consumo da API)
- Exchange Rate API

## Configuração da API

O Conversor de Moedas utiliza a Exchange Rate API para obter as taxas de câmbio atualizadas. Para utilizar a API, você precisará obter uma chave de acesso (API key) seguindo os seguintes passos:

1. Acesse o site da Exchange Rate API: https://www.exchangerate-api.com/

2. Crie uma conta ou faça login, se já tiver uma conta.

3. Na dashboard, você encontrará sua chave de acesso (API key).

4. Coloque sua key no arquivo coinApi.ts em keyApi:

```typescript
const keyApi = [SUA KEY]

