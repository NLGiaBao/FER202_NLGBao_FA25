import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import FilterBar from '../components/FilterBar';

const MovieManagerContent = () => {
    return (
        <>
            <Header />
            <Container>
                <MovieForm />
                <h2 className="mt-4">Movie List</h2>
                <FilterBar />
                <MovieTable />
            </Container>
        </>
    );
}

const MovieManager = () => <MovieManagerContent />;

export default MovieManager;
