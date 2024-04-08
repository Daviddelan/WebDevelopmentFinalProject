import { createContext, useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/appwrite/api';
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
    id: "", 
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: ""
};

const AuthContext = createContext({
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: (user: typeof INITIAL_USER) => {},
    setAuthenticated: (isAuthenticated: boolean) => {},
    checkAuthUser: async () => false as boolean,
});

const AuthProvider = ({ children } : { children: React.ReactNode}) => {
    const [user, setUser] = useState(INITIAL_USER);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setAuthenticated] = useState(false);

    const navigate = useNavigate();

    const checkAuthUser = async () => {
        try {
            const currentAuthUser = await getCurrentUser();

            if (currentAuthUser) {
                setUser({
                    id: currentAuthUser.$id,
                    name: currentAuthUser.name,
                    username: currentAuthUser.username,
                    email: currentAuthUser.email,
                    imageUrl: currentAuthUser.imageUrl,
                    bio: currentAuthUser.bio
                });
                setAuthenticated(true);

                return true;
            }
            return false;
        } catch (error) {
            console.error("Error checking auth user", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const cookieFallback = localStorage.getItem('cookieFallback');
        if (cookieFallback === '[]' || cookieFallback === null) {
            navigate('/signin');
        } else {
            checkAuthUser();
        }
    }, []);

    const value = {
        user,
        setUser,
        isAuthenticated,
        setAuthenticated,
        isLoading,
        checkAuthUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
