import { createContext, useContext, useState } from 'react'

const BranchContext = createContext(null)

export function BranchProvider({ children }) {
  const [activeBranch, setActiveBranch] = useState(null) // null = all branches
  return (
    <BranchContext.Provider value={{ activeBranch, setActiveBranch }}>
      {children}
    </BranchContext.Provider>
  )
}

export function useBranch() {
  return useContext(BranchContext) || { activeBranch: null, setActiveBranch: () => {} }
}
