import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './suggestions.css'

interface Livro {
    titulo: string;
    nomeAutor: string;
    capa: string;
    avaliacao?: number;
}

export function Suggestions() {
    const [livros, setlivros] = useState<Livro[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate();

    const livrosSugestao = [
        'Dom Casmurro',
        'O Hobbit',
        '1984',
        'O Alquimista',
        'A Pediatra'
    ]

    useEffect(() => {
        async function carregarSugestoes() {
            try {
                setLoading(true);

                const requisicoes = livrosSugestao.map((nome) =>
                    fetch(`http://localhost:8080/api/livros?nome=${encodeURIComponent(nome)}`)
                        .then((res) => {
                            if (!res.ok) throw new Error("Erro na resposta da API")
                            return res.json()
                        })
                )

                const resultados = await Promise.all(requisicoes)
                setlivros(resultados)
            } catch (erro) {
                console.error('Erro em buscar sugestoes', erro)
            } finally {
                setLoading(false);
            }
        }

        carregarSugestoes()
    }, [])

    if (loading) {
        return <div className="loading-container">Carregando sugestões...</div>;
    }

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