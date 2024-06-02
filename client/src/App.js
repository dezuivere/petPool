import {BrowserRouter,Routes,Route} from 'react-router-dom'
import EditPet from './components/EditPet';
import NewPet from './components/NewPet';
import PetDetails from './components/PetDetails';
import PetStore from './components/PetStore';
function App(){
  return(
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route element={<PetStore/>} path="/pets" />
          <Route element={<NewPet/>} path="/pets/new" />
          <Route element={<PetDetails/>} path="/pets/:id" />
          <Route element={<EditPet/>} path="/pets/edit/:id" />
        </Routes>
      </BrowserRouter>
      {/* hii therey */}

    </div>
  )
}

export default App;