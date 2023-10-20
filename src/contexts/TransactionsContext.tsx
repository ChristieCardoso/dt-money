import { ReactNode, createContext, useEffect, useState } from "react";

type Transaction = {
  id: number,
  description: string
  type: 'income' | 'outcome'
  price: number,
  category: string
  createdAt: string
}

interface TransactionContextType {
  transactions: Transaction[]
}

interface TransationsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionProvider({ children }: TransationsProviderProps) {

  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()

    setTransactions(data)
  }
  
  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions}}>
      { children }
    </TransactionsContext.Provider>
  )
}