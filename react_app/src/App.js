import './App.css';
import Footer from './components/Footer';
import AppRouter from './routes/AppRouter';

const App = () => {
  return (
  <>
    <div className="h-auto" style={{backgroundColor : "#508bfc"}}>
      <AppRouter />
    </div>
    <Footer />
  </>  
    );
}

export default App;
