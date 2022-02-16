import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import { createServer, Model } from 'miragejs';


createServer({
  //DB do MirajeJS
  models: {
    transaction: Model  
  },

  //pre cadastrando alguns dados no DB para deixar
  //interface inicial mais amigavel
  seeds(server) {
    server.db.loadData({
      //nome do model no plural
      transactions: [
        {
          id: 1,
          title: 'Freelancer de website',
          type: 'deposit',
          category: 'dev',
          amount: 6000,
          createdAt: new Date('2021-02-12')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-02-12')
        }

      ],
    })
  },

  routes(){
    this.namespace = 'api';

    //schema = DB
    this.get('transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('transactions', (schema, request) => {

      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)

    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);