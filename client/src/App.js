import {BrowserRouter,Routes,Route} from 'react-router-dom'
import NewPet from './components/NewPet';
import PetStore from './components/PetStore';
function App(){
  return(
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route element={<PetStore/>} path="/pets" />
          <Route element={<NewPet/>} path="/pets/new" />
        </Routes>
      </BrowserRouter>
      {/* hii therey */}

    </div>
  )
}

export default App;