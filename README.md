# Controle de Fluxo de Caixa

Este é um aplicativo simples para controle de fluxo de caixa pessoal, desenvolvido em React Native, onde você pode adicionar, visualizar e excluir transações (receitas e despesas), além de acompanhar o saldo atual. O app também permite visualizar os gastos por mês e a data de cada transação.

## Funcionalidades

- **Adicionar transações**: Você pode adicionar transações, informando a descrição, o valor (positivo para receitas e negativo para despesas), e a data.
- **Exibir transações**: O app lista todas as transações com a descrição, valor e data.
- **Calcular saldo**: O saldo total é calculado automaticamente com base nas transações.
- **Remover transações**: As transações podem ser removidas da lista.
- **Salvar os dados**: Todos os dados são salvos localmente utilizando o `AsyncStorage`.

## Tecnologias Utilizadas

- **React Native**: Para desenvolvimento mobile.
- **Expo**: Framework para facilitar o desenvolvimento com React Native.
- **AsyncStorage**: Para armazenar as transações localmente.
- **React Navigation**: Para navegação entre as telas do app.
- **DateTimePicker**: Para selecionar a data das transações.

## Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [React Native](https://reactnative.dev/docs/environment-setup)

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/SEU_USUARIO/controlefluxo.git
