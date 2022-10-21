
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Todo from './components/todo';
import Signup from './screens/signup';
import LoginUp from './screens/login';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
   <>
   <Routes>
    <Route path='/' element={<LoginUp/>} ></Route>
    <Route path='/signup' element={<Signup/>} ></Route>

    <Route element={<ProtectedRoute />}>

    <Route path='/todo' element={<Todo />} ></Route>

    </Route>
   </Routes>
   
   </>
  );
}

export default App;
