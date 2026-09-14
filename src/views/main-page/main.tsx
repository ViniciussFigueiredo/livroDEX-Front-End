import { Suggestions } from '../../components/books-suggestions/suggestions'
import './main.css'

export function Main() {
    return (
        <section className='main'>
            <div className='header w-100 d-flex align-items-center px-5'>
                <h1>LivroDex</h1>
            </div>
            <div className='content mt-md-5 py-md-4'>
                <h1 className='d-flex justify-content-center'>Busque qualquer livro para ter certeza da sua escolha</h1>
                <p className='d-flex justify-content-center mt-md-3'>Explore sinopses, avaliações, biografias de autores e descubra suas próximas leituras em um só lugar.</p>
                <div className='d-flex justify-content-center w-100 mt-md-5'>
                    <div className='search-main d-flex p-2'>
                        <input className="form-control me-2" type="search" placeholder="Buscar livro ou autor..." aria-label="Search" />
                        <button type="button" className="btn">Pesquisar</button>
                    </div>
                </div>                
            </div>
            <div className='suggestions px-5 mt-5'>
                <h2>Livros Populares & Destaques</h2>
                <p>Sugestões em alta para você começar a navegar</p>
                <div className='d-flex w-100 justify-content-between mt-5'>
                    <Suggestions />
                    <Suggestions />
                    <Suggestions />
                    <Suggestions />
                    <Suggestions />
                </div>
            </div>
        </section>
    )
}