import Router from './router';
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useUser } from './stores/userStore';

// API_URL scheelt typwerk in alle requests naar de backend
const user = useUser();
export const API_URL = `http://localhost:8080/${user.id}`

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router/>
    </QueryClientProvider>
  )
}

export default App
