import { useEffect, useState } from 'react';
import { Infos } from '../../components/infos/infos'
import { Navbar } from '../navbar/navbar'
import './book.css'

interface LivroDetalhes {
    titulo: string;
    nomeAutor: string;
    capa?: string;
    anoDeLancamento?: number;
    numeroDePaginas?: number;
    avaliacao?: number;
    sinopse?: string;
}

interface AutorDetalhes {
    nomeAutor: string;
    anoDeNascimento?: string;
    anoDeFalecimento?: string;
    numeroDeObras?: string;
    biografia?: string;
}

export function Book() {
    const [livro, setLivro] = useState<LivroDetalhes | null>(null);
    const [autor, setAutor] = useState<AutorDetalhes | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const nomeLivroTeste = 'Dom Casmurro';

    useEffect(() => {
        async function carregarDados() {
            try {
                setLoading(true);

                const resLivro = await fetch(
                    `http://localhost:8080/api/livros?nome=${encodeURIComponent(nomeLivroTeste)}`
                );
                if (!resLivro.ok) throw new Error('Erro ao buscar livro');
                const dadosLivro: LivroDetalhes = await resLivro.json();
                setLivro(dadosLivro);

                if (dadosLivro.nomeAutor) {
                    const resAutor = await fetch(
                        `http://localhost:8080/api/autores/detalhes?autor=${encodeURIComponent(dadosLivro.nomeAutor)}`
                    );
                    if (resAutor.ok) {
                        const dadosAutor: AutorDetalhes = await resAutor.json();
                        setAutor(dadosAutor);
                    }
                }
            } catch (error) {
                console.error('Erro na conexão:', error);
            } finally {
                setLoading(false);
            }
        }

        carregarDados();
    }, []);

    if (loading) {
        return <div className="p-5 text-center">Carregando informações...</div>;
    }


    return (
        <section className='book-main'>
            <Navbar />
            <div className='w-100 px-5 d-flex justify-content-center mt-5'>
                <div className='book-details d-flex justify-content-around px-4 py-3'>
                    <div className='w-25 d-flex justify-content-center align-items-center'>
                        {livro?.capa && (
                            <img
                                src={livro.capa}
                                alt={`Capa de ${livro.titulo}`}
                                className="rounded"
                                style={{ width: '150px', height: '230px', objectFit: 'cover' }}
                            />
                        )}
                    </div>
                    <div className='w-75 mt-3'>
                        <h1>{livro?.titulo}</h1>
                        <p style={{color: '#0284C7', fontWeight: '400'}}>{`por ${autor?.nomeAutor || livro?.nomeAutor}`}</p>
                        <div className='d-flex gap-2'>
                            <Infos
                                text={`Lançamento: ${livro?.anoDeLancamento ?? 'N/I'}`}
                                cor='#E2E8F0'
                                textoCor='#475569'
                            />
                            <Infos
                                text={`Número de páginas: ${livro?.numeroDePaginas ?? 'N/I'}`}
                                cor='#E2E8F0'
                                textoCor='#475569'
                            />
                            <Infos
                                text={`★ Nota: ${livro?.avaliacao && livro.avaliacao > 0 ? livro.avaliacao.toFixed(1) : 'Sem notas'}`}
                                cor='#FEF3C7'
                                textoCor='#D97706'
                            />
                        </div>
                        <p className='mt-3'>Sinopse:</p>
                        <div className='sinopse w-100 p-3'>
                            <p>adadsdasdas</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-100 px-5 d-flex justify-content-center mt-5'>
                <div className='autor-details'>
                    <h2>Sobre o Autor</h2>
                    <div className='autor-infos mt-3 px-4 py-3'>
                        <h1>{autor?.nomeAutor || livro?.nomeAutor}</h1>
                        <div className='d-flex gap-2'>
                            <Infos
                                text={`Nasc: ${autor?.anoDeNascimento ?? 'N/I'}`}
                                cor='#E2E8F0'
                                textoCor='#475569'
                            />
                            <Infos
                                text={`Falec: ${autor?.anoDeFalecimento ?? 'N/I'}`}
                                cor='#E2E8F0'
                                textoCor='#475569'
                            />
                            <Infos
                                text={`Total de Obras: ${autor?.numeroDeObras ?? 'N/I'}`}
                                cor='#E0F2FE'
                                textoCor='#0284C7'
                            />
                        </div>

                        <p className='mt-3'>Biografia Completa do Autor:</p>
                        <div className='bio mt-3 w-100 p-3'>
                            <p>autor.biografia - Exibindo a biografia e trajetórias do autor no mesmo layout</p>
                        </div>
                    </div>
                </div>
            </div>



        </section>
    )
}