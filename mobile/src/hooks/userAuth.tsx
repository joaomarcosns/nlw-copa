import { useContext } from 'react'

import { AuthContext, IAuthContextData } from "../contexts/AuthContext";


export const useAuth = (): IAuthContextData => {
  const context = useContext(AuthContext)

  return context
}