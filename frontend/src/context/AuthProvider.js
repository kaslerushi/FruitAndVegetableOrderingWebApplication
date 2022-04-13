import React, { createContext,useEffect,useLayoutEffect,useState } from 'react'

  const AuthContext=createContext({});

  export const AuthProvider=({children})=>{

    const [auth, setAuth] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [startVisit, setStartVisit] = useState(true);
    const [role, setRole] = useState('');
    const [cartLength, setCartLength] = useState(0);

    useLayoutEffect(()=>{
      console.log(auth,loggedIn,role,startVisit)
    },[auth,loggedIn,role,startVisit])

    return (
        <AuthContext.Provider value={{auth,setAuth,loggedIn, setLoggedIn,role,setRole,startVisit,setStartVisit}}>
          {children}
        </AuthContext.Provider>
    )
  }

export default AuthContext;