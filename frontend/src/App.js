import { RouterProvider } from 'react-router-dom';
import router from './routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <RouterProvider router={router} />
      </main>
      <Footer />
    </div>
  );
}

export default App;