import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import movieApi from '../api/movieAPI'; 

// Contexts
export const MovieStateContext = createContext(initialMovieState); 
export const MovieDispatchContext = createContext(null);          

// Custom Hooks
export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

// MovieProvider Component
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  // Fetch genres for filter
  const fetchGenres = useCallback(async () => {
    try {
      const response = await movieApi.get('/genres');
      dispatch({ type: 'SET_GENRES', payload: response.data });
    } catch (error) {
      console.error("Error loading genres:", error);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, [dispatch]);

  // READ: Load data (Axios GET)
  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const response = await movieApi.get('/movies');
      dispatch({ type: 'SET_MOVIES', payload: response.data });
    } catch (error) {
      console.error("Error loading movie list:", error);
      dispatch({ type: 'SET_MOVIES', payload: [] }); 
    }
  }, [dispatch]); 
  
  // DELETE: Delete movie (Axios DELETE)
  const confirmDelete = useCallback(async (id) => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
    dispatch({ type: 'START_LOADING' });

    try {
      await movieApi.delete(`/movies/${id}`);
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
      fetchMovies();
    }
  }, [fetchMovies]);

  // CREATE/UPDATE: Handle POST and PUT (Axios POST/PUT)
  const handleCreateOrUpdate = useCallback(async (dataToSend, isEditing, isEditingId) => {
    dispatch({ type: 'START_LOADING' });
    
    try {
      if (isEditing) {
        await movieApi.put(`/movies/${isEditingId}`, dataToSend);
      } else {
        await movieApi.post('/movies', dataToSend);
      }
      
      dispatch({ type: 'RESET_FORM' }); 
      fetchMovies(); 
      return true;
    } catch (error) {
      console.error("Error in CREATE/UPDATE operation:", error);
      fetchMovies();
      return false;
    }
  }, [fetchMovies]);

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  // Get filtered and sorted movies
  const getFilteredMovies = useCallback(() => {
    let result = [...state.movies];
    const { filters, sortOrder } = state;

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(searchLower)
      );
    }

    // Apply genre filter
    if (filters.genreId) {
      result = result.filter(movie => 
        movie.genreId.toString() === filters.genreId
      );
    }

    // Apply duration filter
    if (filters.duration.min !== '') {
      result = result.filter(movie => 
        movie.duration >= filters.duration.min
      );
    }
    if (filters.duration.max !== '') {
      result = result.filter(movie => 
        movie.duration <= filters.duration.max
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [state]);


  const dispatchValue = {
      dispatch, 
      fetchMovies, 
      confirmDelete,
      handleCreateOrUpdate,
      getFilteredMovies
  };


  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
