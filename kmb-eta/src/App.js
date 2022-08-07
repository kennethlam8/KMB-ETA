import Home from './components/Home';
import Error from './components/Error';
import './styles/App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import BusDetail from './components/BusDetail';
import CwkBusDetail from './components/CwkBusDetail';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bus-detail" element={<BusDetail />} >
          <Route path=":id" element={<BusDetail />} />
        </Route>
        <Route path="/cwk-bus-detail" element={<CwkBusDetail />} >
          <Route path=":id" element={<CwkBusDetail />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
