// // context/AuthContext.tsx
// import React, { createContext, useContext, useEffect } from 'react';
// import { useAuthStore } from '../store/session.store';
// import supabase from '@/utils/supabaseClient';

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const setSession = useAuthStore((state) => state.setSession);

//     useEffect(() => {
//         supabase.auth.getSession().then(({ data: { session } }) => {
//             setSession(session)
//         })

//         const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
//             setSession(session);
//         });

//         return () => subscription?.subscription.unsubscribe()
        
//     }, [setSession]);

//     return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);
