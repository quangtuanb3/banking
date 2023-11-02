import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import store from './redux/store';
import { HomePage } from './pages/HomePage';
import { EditCustomer } from './pages/EditCustomer';
import { AddCustomer } from './pages/AddCustomer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DeleteCustomer } from './pages/DeleteCustomer';
import { Deposit } from './pages/Deposit';
import { Withdraw } from './pages/Withdraw';
import { Transfer } from './pages/Transfer';
import { HistoryComponent } from './pages/History';

function App() {
  return (
    <Provider store={store}>
      <Router> {/* Include the Router component here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddCustomer />} />
          <Route path="/delete/:customerId" element={<DeleteCustomer />} />
          <Route path="/edit/:customerId" element={<EditCustomer />} />
          <Route path="/deposit/:customerId" element={<Deposit />} />
          <Route path="/withdraw/:customerId" element={<Withdraw />} />
          <Route path="/transfer/:customerId" element={<Transfer />} />
          <Route path="/history" element={<HistoryComponent />} />
        </Routes>
      </Router> {/* Make sure to close the Router component */}
    </Provider>
  );
}

export default App;
