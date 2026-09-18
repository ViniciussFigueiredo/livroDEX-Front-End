import { useNavigate } from 'react-router-dom';
import { Suggestions, type Livro } from '../../components/books-suggestions/suggestions';
import './main.css';
import { useEffect, useState } from 'react';


export function Main() {

    const [termoBusca, setTermoBusca] = useState('');
    const navigate = useNavigate();

    async function realizarBusca() {
        const termo = termoBusca.trim();
        if (!termo) return;

        try {
            const res = await fetch(`http://localhost:8080/api/busca?termo=${encodeURIComponent(termo)}`);
            if (!res.ok) {
                alert('Nenhum livro ou autor encontrado.');
                return;
            }

            const resultado = await res.json();

            if (resultado.tipo === 'livro') {
                navigate(`/livros/${encodeURIComponent(termo)}`);
            } else if (resultado.tipo === 'autor') {
                navigate(`/autor/detalhes/${encodeURIComponent(termo)}`);
            }
        } catch (error) {
            console.error('Erro ao buscar:', error);
        }
    }

    const [sugestoes, setSugestoes] = useState<Livro[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const livrosPadrao = ['Dom Casmurro', 'O Hobbit', '1984', 'O Alquimista', 'A Pediatra'];

    useEffect(() => {
        async function carregarSugestoes() {
            try {
                setLoading(true);
                const requisicoes = livrosPadrao.map((nome) =>
                    fetch(`http://localhost:8080/api/livros?nome=${encodeURIComponent(nome)}`)
                        .then((res) => res.json())
                );

                const resultados = await Promise.all(requisicoes);
                setSugestoes(resultados);
            } catch (erro) {
                console.error('Erro ao buscar sugestões no Main:', erro);
            } finally {
                setLoading(false);
            }
        }

        carregarSugestoes();
    }, []);

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
                        <input className="form-control me-2" type="search" value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && realizarBusca()} placeholder="Buscar livro ou autor..." aria-label="Search" />
                        <button type="button" onClick={realizarBusca} className="btn">Pesquisar</button>
                    </div>
                </div>
            </div>
            <div className='suggestions px-5 mt-5'>
                <h2>Livros Populares & Destaques</h2>
                <p>Sugestões em alta para você começar a navegar</p>
                <div className=''>
                    {loading ? (
                        <div>Carregando sugestões...</div>
                    ) : (
                        <Suggestions livros={sugestoes} />
                    )}
                </div>
            </div>
        </section>
    )
}