import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  url: "/api/trpc",
});

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient}>
        <Component {...pageProps} />
      </trpc.Provider>
    </QueryClientProvider>
  );
}
