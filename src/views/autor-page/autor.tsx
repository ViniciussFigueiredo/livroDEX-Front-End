import { Suggestions } from '../../components/books-suggestions/suggestions'
import { Infos } from '../../components/infos/infos'
import { Navbar } from '../navbar/navbar'
import './autor.css'

export function Autor() {
    return (
        <section className='autor-main'>
            <Navbar />
            <div className='w-100 px-5 d-flex justify-content-center mt-5'>
                <div className='autor-details d-flex justify-content-around px-4 py-3'>
                    <div className='w-25 d-flex justify-content-center align-items-center'>
                        <img src="" alt="" />
                    </div>
                    <div className='w-75 mt-3'>
                        <h1>Machado de assis</h1>
                        <div className='d-flex gap-2'>
                            <Infos
                                text={`Nascimento: `}
                                cor='#E2E8F0'
                                textoCor='#475569'
                            />
                            <Infos
                                text={`Falecimento: `}
                                cor='#E2E8F0'
                                textoCor='#475569'
                            />
                            <Infos
                                text={`Obras: `}
                                cor='#E0F2FE'
                                textoCor='#0284C7'
                            />
                        </div>
                        <p className='mt-3'>Biografia:</p>
                        <div className='biografia w-100 p-3'>
                            <p>adadsdasdas</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-100 px-5 d-flex justify-content-center mt-5'>
                <div className='autor-books'>
                    <h2>Top 5 Obras do Autor</h2>
                    <Suggestions />
                </div>
            </div>


        </section>
    )
}