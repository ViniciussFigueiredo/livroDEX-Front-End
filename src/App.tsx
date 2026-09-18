import { Book } from "./views/book-page/book"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from "./views/main-page/main"
import { Autor } from "./views/autor-page/autor";

function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/dasdasd" element={<Main />}/> 
        <Route path="/livros/:titulo" element={<Book />}/>
        <Route path="/" element={<Autor />}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
