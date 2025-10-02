import React from 'react';
import hawaiian from './hawaiian.png';
import margherita from './margherita.png';
import mushroom from './mushroom.png';
import neapolitan from './neapolitan.png';
import pesto from './pesto.png';
import './home.css';

export default function home() {
    const pizzas = [
        { name: 'Margherita Pizza', img: margherita, price: 40.00, salePrice: 24.00, sale: true, isNew: false },
        { name: 'Mushroom Pizza', img: mushroom, price: 25.00, sale: false, isNew: false },
        { name: 'Hawaiian Pizza', img: hawaiian, price: 30.00, sale: false, isNew: true },
        { name: 'Pesto Pizza', img: pesto, price: 50.00, salePrice: 30.00, sale: true, isNew: false },
    ];
    return (
        <div className="bg-dark text-white min-vh-100">
            {/* Header */}
            <header className="bg-dark text-white py-2">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-5">
                        <h2>Pizza House</h2>
                        <nav className="d-flex gap-5">
                            <a href="#" className="text-white text-decoration-none">Home</a>
                            <a href="#" className="text-white text-decoration-none">About Us</a>
                            <a href="#" className="text-white text-decoration-none">Contact</a>
                        </nav>
                    </div>
                    <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                        <input
                            className="form-control form-control-sm"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            style={{ width: 300 }}
                        />
                        <button className="btn btn-warning btn-sm" type="submit" style={{ backgroundColor: '#DF1B5C', border: 'none', padding: '0 10px',color: 'white' }}>
                            <i className="bi bi-search"></i>
                        </button>
                    </form>
                </div>
            </header>
            {/* Banner */}
            <section className="position-relative">
                <img
                    src={neapolitan}
                    alt="Neapolitan Pizza"
                    className="w-100"
                    style={{ height: '530px', objectFit: 'cover', opacity: 0.85 }}
                />
                <div className='position-absolute top-50 translate-middle-y' style={{
                    left: '5%',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer'
                }}>
                    <i className="bi bi-chevron-left"></i>
                </div>
                <div className="position-absolute start-50 translate-middle-x text-center" style={{ bottom: '70px' }}>
                    <h1 className="fw-bold">Neapolitan Pizza</h1>
                    <p className="small" style={{ fontSize: '1.5rem' }}>If you are looking for a traditional Italian pizza, the Neapolitan is the best option!</p>
                </div>
            </section>
            {/* Menu */}
            <section className="container py-5">
                <h1 className="text-start mb-2">Our Menu</h1>
                <div className="row g-4">
                    {pizzas.map((p, index) => (
                        <div className="col-12 col-sm-6 col-md-3" key={index}>
                            <div className="card h-100 text-dark">
                                <div className="position-relative">
                                    <img src={p.img} className="card-img-top" alt={p.name} />
                                    {p.sale && (
                                        <span className="position-absolute top-0 start-0" 
                                        style={{ backgroundColor: '#FFEB5A', fontWeight: 'bold', width: '110px', padding: '3px 0', borderRadius: '3px' }}>
                                            SALE
                                        </span>
                                    )}
                                    {p.isNew && (
                                        <span className="position-absolute top-0 start-0" 
                                        style={{ backgroundColor: '#FFEB5A', fontWeight: 'bold', width: '110px', padding: '3px 0', borderRadius: '3px' }}>
                                            NEW
                                        </span>
                                    )}
                                </div>
                                <div className="card-body text-start">
                                    <h3 className="card-title">{p.name}</h3>
                                    <p className="mb-3">
                                        {p.sale ? (
                                            <>
                                                <span className="text-muted text-decoration-line-through me-1">${p.price.toFixed(2)}</span>
                                                <span className="text-warning fw-bold">${p.salePrice.toFixed(2)}</span>
                                            </>
                                        ) : (
                                            <span className="fw-bold">${p.price.toFixed(2)}</span>
                                        )}
                                    </p>
                                    <button className="btn btn-dark btn-sm w-100 pt-2 pb-2">Buy</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* Booking */}
            <section className="container py-5">
                <h1 className="text-center mb-2">Book Your Table</h1>
                <form className="bg-dark text-dark">
                    <div className="bg-dark row g-4 mb-5">
                        <div className="col-md-4"><input type="text" className="form-control" placeholder="Your Name *" required /></div>
                        <div className="col-md-4"><input type="email" className="form-control" placeholder="Your Email *" required /></div>
                        <div className="col-md-4">
                            <select className="form-select">
                                <option>Select a Service</option>
                                <option>Dine-in</option>
                                <option>Takeaway</option>
                                <option>Delivery</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <textarea className="form-control" rows="4" placeholder="Please write your comment" style={{ height: '10rem'}}></textarea>
                    </div>
                    <div className="text-start">
                        <button className="btn btn-warning px-4 text-white fw-bold px-5" type="submit">Send Message</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
