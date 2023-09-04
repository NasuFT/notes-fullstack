import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "./theme";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </QueryClientProvider>
);

export default Providers;
