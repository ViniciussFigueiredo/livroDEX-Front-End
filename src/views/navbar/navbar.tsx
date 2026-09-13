import './navbar.css'

export function Navbar() {
    return (
        <section className='navbar px-5'>
            <nav className='w-100'>
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <h2>LivroDex</h2>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar livro ou autor..." aria-label="Search" />
                    </form>
                </div>
            </nav>
        </section>
    )
}