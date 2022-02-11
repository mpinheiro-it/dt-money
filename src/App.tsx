import Modal from 'react-modal';
import { Dashboard } from "./components/dashboard";
import { Header } from "./components/header";
import { GlobalStyle } from "./styles/global";
import { NewTransactionModal } from "./components/newTransactionModal";
import { useState } from "react";

Modal.setAppElement('#root');

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

    function handleOpenNewTransactionModal(){
        setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal(){
        setIsNewTransactionModalOpen(false);
    }

  return ( 
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen} 
        onRequestClose={handleCloseNewTransactionModal} />

      <GlobalStyle />
    </>
  );
}