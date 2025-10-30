import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const FilterBar = () => {
    const { genres, filters, sortOrder } = useMovieState();
    const { dispatch } = useMovieDispatch();

    const handleSearchChange = (e) => {
        dispatch({ 
            type: 'SET_FILTER', 
            payload: { ...filters, search: e.target.value } 
        });
    };

    const handleGenreChange = (e) => {
        dispatch({ 
            type: 'SET_FILTER', 
            payload: { ...filters, genreId: e.target.value } 
        });
    };

    const handleDurationChange = (field) => (e) => {
        const value = e.target.value === '' ? '' : Number(e.target.value);
        dispatch({
            type: 'SET_FILTER',
            payload: { 
                ...filters, 
                duration: { 
                    ...filters.duration, 
                    [field]: value 
                } 
            }
        });
    };

    const handleSortChange = (e) => {
        dispatch({ 
            type: 'SET_SORT_ORDER', 
            payload: e.target.value 
        });
    };

    return (
        <Form className="mb-4">
            <Row className="align-items-end">
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Search Movies</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Search by title..."
                            value={filters?.search || ''}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group>
                        <Form.Label>Genre</Form.Label>
                        <Form.Select
                            value={filters?.genreId || ''}
                            onChange={handleGenreChange}
                        >
                            <option value="">All Genres</option>
                            {genres?.map(genre => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Label>Duration (minutes)</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control
                                type="number"
                                placeholder="Min"
                                min="0"
                                value={filters?.duration?.min || ''}
                                onChange={handleDurationChange('min')}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="number"
                                placeholder="Max"
                                min="0"
                                value={filters?.duration?.max || ''}
                                onChange={handleDurationChange('max')}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Sort By Title</Form.Label>
                        <Form.Select
                            value={sortOrder || 'asc'}
                            onChange={handleSortChange}
                        >
                            <option value="asc">A to Z</option>
                            <option value="desc">Z to A</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};

export default FilterBar;