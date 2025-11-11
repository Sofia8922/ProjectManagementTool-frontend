import Router from './router';
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createStore } from "@odemian/react-store";

// De momentele gebruiker, lekker hoog in App zodat ie overal berijkbaar is
export const [useUser, updateUser] = createStore({
  name: "",
  id: "",
});

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router/>
    </QueryClientProvider>
  )
}

export default App
