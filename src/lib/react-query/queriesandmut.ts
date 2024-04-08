import{ 
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from '@tanstack/react-query'
import { createUserAccount } from '@/lib/appwrite/api'
import { login } from '@/lib/appwrite/api'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();



type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
    username: string
}

type LoginUserAccount = {
    email: string;
    password: string;
}


export const useCreateUserAccountMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: CreateUserAccount) => {
            return createUserAccount(user);
        },
    });
};

export const useLogIn = () => {
    return useMutation({
        mutationFn: (user: LoginUserAccount) => {
            return login(user);
        }
    });
}


