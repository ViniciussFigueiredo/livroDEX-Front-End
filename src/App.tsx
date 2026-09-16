import { Book } from "./views/book-page/book"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from "./views/main-page/main"

function App() {

  return (

    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Main />}/> 
        <Route path="/livros/:titulo" element={<Book />}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
