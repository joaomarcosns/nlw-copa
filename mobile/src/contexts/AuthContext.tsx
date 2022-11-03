import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();


interface IUser {
  name: string
  avatarUrl: string
}


export interface IAuthContextData {
  user: IUser
  isUserLoading: boolean
  signIn: () => Promise<void>
}

interface IAuthContextProvider {
  children: ReactNode
}

export const AuthContext = createContext({} as IAuthContextData)

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [user, setUser] = useState<IUser>({} as IUser)
  const [isUserLoading, setIsUserLoading] = useState(false)

  const [request, response, prompAsync] = Google.useAuthRequest({
    clientId: '795602759703-vhe8v1u1eplngls3hpgrgp34avacsu0e.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })


  async function signIn() {
    try {
      setIsUserLoading(true)
      await prompAsync()
    } catch (error) {
      console.log(error);
      throw error
    }
    finally {
      setIsUserLoading(true)
    }
  }

  async function signInWithGoogle(access_token: String) {
    console.log(access_token);
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}