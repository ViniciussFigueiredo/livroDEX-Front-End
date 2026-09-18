import { useNavigate } from 'react-router-dom';
import './suggestions.css'

export interface Livro {
    titulo: string;
    nomeAutor: string;
    capa: string;
    avaliacao?: number;
}

interface SuggestionsProps {
  livros: Livro[];
}

export function Suggestions({ livros }: SuggestionsProps) {
    const navigate = useNavigate();

    return (
        <section className="suggestions-container d-flex w-100 justify-content-between mt-5">

            {livros.map((livro, index) => (
                    <div key={index} onClick={() => navigate(`/livros/${encodeURIComponent(livro.titulo)}`)} style={{ cursor: 'pointer' }} className='card-book p-4'>
                        <img
                            className='rounded mx-auto d-block'
                            src={livro.capa || 'https://via.placeholder.com/150x220?text=Sem+Capa'}
                            alt={`Capa de ${livro.titulo}`}
                        />
                        <h1 className='mt-3'>{livro.titulo}</h1>
                        <p>{livro.nomeAutor}</p>
                        <div className='rating'>
                            <p>★ {livro.avaliacao ? livro.avaliacao.toFixed(1) : 'N/A'}</p>
                        </div>
                    </div>
            ))}




        </section>
    )
}