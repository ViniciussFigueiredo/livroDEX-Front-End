import { useEffect, useState } from 'react';
import { Suggestions, type Livro } from '../../components/books-suggestions/suggestions';
import { Infos } from '../../components/infos/infos'
import { Navbar } from '../navbar/navbar'
import './autor.css'
import { useParams } from 'react-router-dom';

export function Autor() {

    interface AutorDetalhes {
        nomeAutor: string;
        foto?: string;
        anoDeNascimento?: string;
        anoDeFalecimento?: string;
        numeroDeObras?: string | number;
        melhorObra?: string;
        biografia?: string;
    }

    const [autor, setAutor] = useState<AutorDetalhes | null>(null);
    const [loadingAutor, setLoadingAutor] = useState<boolean>(true);
    

    const { nomeAutor } = useParams<{ nomeAutor: string }>();

    const [obras, setObras] = useState<Livro[]>([]);
    const [loadingObras, setLoadingObras] = useState<boolean>(true);

    useEffect(() => {
        async function carregarDadosAutor() {
            if (!nomeAutor) return;

            try {
                setLoadingAutor(true);
                const res = await fetch(`http://localhost:8080/api/autores/detalhes?autor=${encodeURIComponent(nomeAutor)}`);

                if (!res.ok) throw new Error('Erro ao procurar detalhes do autor');

                const dados: AutorDetalhes = await res.json();
                setAutor(dados);
            } catch (error) {
                console.error('Erro ao carregar autor:', error);
            } finally {
                setLoadingAutor(false);
            }
        }

        carregarDadosAutor();
    }, [nomeAutor]);

    useEffect(() => {
        async function carregarObras() {
            if (!nomeAutor) return;

            try {
                setLoadingObras(true);
                const res = await fetch(`http://localhost:8080/api/autores/obras?autor=${encodeURIComponent(nomeAutor)}`);

                if (!res.ok) throw new Error('Erro ao buscar obras do autor');

                const dados: Livro[] = await res.json();
                setObras(dados);
            } catch (error) {
                console.error('Erro ao carregar obras:', error);
            } finally {
                setLoadingObras(false);
            }
        }

        carregarObras();
    }, [nomeAutor]);

    

    return (
        <section className='autor-main'>
            <Navbar />
            <div className='w-100 px-5 d-flex justify-content-center mt-5'>
                <div className='autor-details d-flex justify-content-around px-4 py-3'>
                    <div className='w-25 d-flex justify-content-center align-items-center'>
                        <img
                            src={autor?.foto || 'https://via.placeholder.com/200'}
                            alt={`Foto de ${autor?.nomeAutor || 'Autor'}`}
                            style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%', border: 'solid 2px #0284C7' }}
                        />
                    </div>
                    <div className='w-75 mt-3'>
                        <h1>{autor?.nomeAutor || nomeAutor}</h1>
                        <div className='d-flex gap-2'>
                            <Infos
                                text={`Nascimento: ${autor?.anoDeNascimento ?? 'N/I'}`}
                                cor='#E2E8F0'
                                textoCor='#475569'
                            />
                            <Infos
                                text={`Falecimento: ${autor?.anoDeFalecimento ?? 'N/I'}`}
                                cor='#E2E8F0'
                                textoCor='#475569'
                            />
                            <Infos
                                text={`Obras: ${autor?.numeroDeObras ?? 'N/I'}`}
                                cor='#E0F2FE'
                                textoCor='#0284C7'
                            />
                        </div>
                        <p className='mt-3'>{`Melhor Obra: ${autor?.melhorObra ?? 'N/I'}`} </p>
                        <p className='mt-3'>Biografia:</p>
                        <div className='biografia w-100 p-3'>
                            <p>{autor?.biografia}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-100 px-5 d-flex justify-content-center mt-5'>
                <div className='autor-books'>
                    <h2>Top 5 Obras do Autor</h2>
                    {loadingObras ? (
                        <div>Carregando obras do autor...</div>
                    ) : (
                        <Suggestions livros={obras} />
                    )}
                </div>
            </div>


        </section>
    )
}