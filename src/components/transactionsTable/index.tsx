import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./style";

export function TransactionsTable() {
    const { transactions } = useTransactions();   

    return(

        <Container>
            <table>

            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Valor</th>
                    <th>Categoria</th>
                    <th>Data</th>
                </tr>
            </thead>
            
            <tbody>
            
            {transactions.map(transaction => {
                return (
                    //toda vez q fizer um map o primeiro elemento precisa de uma key
                    <tr key={transaction.id}>
                        <td>{transaction.title}</td>
                        <td className={transaction.type}>
                           {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                           }).format(transaction.amount)}
                        </td>
                        <td>{transaction.category}</td>
                        <td>
                        {new Intl.DateTimeFormat('pt-BR')
                            //convertendo string em date para poder converter
                            .format(new Date(transaction.createdAt))}
                        </td>
                    </tr>
                )
            })}

            </tbody>

            </table>
        </Container>

    );
}