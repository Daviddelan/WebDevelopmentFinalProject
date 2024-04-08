import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { QueryClient } from '@tanstack/react-query';


const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: ReactNode }) => {
    return(
    <QueryClientProvider client = {queryClient}>
        {children}
    </QueryClientProvider>
    )

    
}