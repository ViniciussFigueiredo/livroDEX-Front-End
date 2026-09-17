import './navbar.css'

export function Navbar() {
    return (
        <section className='navbar px-3 px-md-5'>
            <nav className='w-100'>
                <div className="container-fluid d-flex justify-content-between align-items-center ">
                    <h2 className='mt-2'> <a href="/">LivroDex</a></h2>
                    <form className="search d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar livro ou autor..." aria-label="Search" />
                    </form>
                </div>
            </nav>
        </section>
    )
}