import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface TransactionInput {
    title: string;
    amount: number;
    type: string;
    category: string;
}

interface TransactionsProviderProps{
    children: ReactNode; //aceita qqr tipo de conteudo valido pro React
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
    );



export function TransactionsProvider({ children }: TransactionsProviderProps) {

     //useState armazenando uma array de Transaction
     const [transactions, setTransactions] = useState<Transaction[]>([]);      

     useEffect(() => {
         api.get('transactions')        
         .then(response => setTransactions(response.data.transactions))
     }, []);


     
     async function createTransaction(transactionInput: TransactionInput){        

       const response = await api.post('/transactions', {
           ...transactionInput,
            createdAt: new Date()
        })

       const { transaction } = response.data; 

       setTransactions([
           ...transactions,
           transaction
       ]);
     }

     return (

        <TransactionsContext.Provider value={{ transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>

     );
}

export function useTransactions() {

    const context = useContext(TransactionsContext)

    return context;
}