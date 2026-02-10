import './App.css'
import { Add } from './Pages/Add'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ViewPage from './Pages/ViewPage'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/valentine/:id" element={<ViewPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
