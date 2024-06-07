import React, { useState, useEffect } from 'react';
import { BiMovie } from "react-icons/bi";
import { FaHeart, FaSearch } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import "./MovieList.css";
import { Carousel, Form, Navbar, Button, Card, Col, Container, Row } from 'react-bootstrap';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favSearchQuery, setFavSearchQuery] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchMovies = () => {
    fetch('http://localhost:5000/api/movies')
      .then(response => response.json())
      .then(data => setMovies(data.movies))
      .catch(error => console.error('Error fetching movies:', error));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetch(`http://localhost:5000/api/movies/search?title=${searchQuery}`)
      .then(response => response.json())
      .then(data => setFilteredMovies(data.movies))
      .catch(error => console.error('Error searching movies:', error));
  };


  const handleFavSearchChange = (e) => {
    setFavSearchQuery(e.target.value);
  };

  const handleAddToFavorites = (movie) => {
    if (favorites.some(fav => fav.title === movie.title)) {
      setFavorites(favorites.filter(fav => fav.title !== movie.title));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const isFavorite = (movie) => {
    return favorites.some(fav => fav.title === movie.title);
  };

  const filteredFavorites = favorites.filter(movie =>
    movie.title.toLowerCase().includes(favSearchQuery.toLowerCase())
  );

  return (
    <>
      <div className='full'>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Form className="d-flex">
              <Row className='left-navbar'>
                <Col xs="auto">
                  <div className='movieLogo'><BiMovie className='movIcon' /></div>
                </Col>
                <Col xs="auto" className='title'>
                  <Navbar.Brand href="#">GET MOVIES</Navbar.Brand>
                </Col>
                <Col xs="auto" className="search-bar-container">
                  <div className="search-bar-wrapper">
                    <FaSearch className='searchIcon' />
                    <Form.Control
                      type="search"
                      placeholder="Search movies and series"
                      className="me-2 search-input"
                      aria-label="Search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </Col>
              </Row>
            </Form>
            <Form className="d-flex">
              <Button variant="danger" className='favButton' onClick={() => setShowFavorites(true)}>
                <Row className='buttonCont'>
                  <Col xs="auto">
                    <FaHeart className='heart' />
                  </Col>
                  <Col xs="auto">
                    <h6>My favourites</h6>
                  </Col>
                </Row>
              </Button>
            </Form>
          </Container>
        </Navbar>

        {showFavorites ? (
          <Container className='fav-movies'>
            <Row className='fav-header'>
              <Col xs="auto">
                <Button variant="outline-dark" className='backButton' onClick={() => setShowFavorites(false)}>
                  <IoIosArrowBack />
                </Button>
              </Col>
              <Col xs="auto" className='fav-title'>
                <h4>My Favourites</h4>
              </Col>
              <Col xs="auto" className="fav-search-bar-container">
                <div className="fav-search-bar-wrapper">
                  <FaSearch className='favSearchIcon' />
                  <Form.Control
                    type="search"
                    placeholder="Search from favourites"
                    className="me-2 fav-search-input"
                    aria-label="Search"
                    value={favSearchQuery}
                    onChange={handleFavSearchChange}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              {filteredFavorites.map((movie, index) => (
                <Col key={index} sm={6} md={4} lg={3}>
                  <Card className="movie-card">
                    <div
                      className={`heart-icon ${isFavorite(movie) ? 'active' : ''}`}
                      onClick={() => handleAddToFavorites(movie)}
                    >
                      <FaHeart />
                    </div>
                    <Card.Img variant="top" src={movie.banner_image} />
                    <Card.Body className="movie-card-body">
                      <Card.Text className="movie-year">{movie.year}</Card.Text>
                      <Card.Title className="movie-title">{movie.title}</Card.Title>
                      <Card.Text className="movie-genre">{movie.genre}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        ) : (
          <>
            {searchQuery ? (
              <Container className='movielst'>
                <h4>Search</h4>
                <p className='listnum'>{filteredMovies.length} result{filteredMovies.length !== 1 && 's'} found</p>
                <Row>
                  {filteredMovies.map((movie, index) => (
                    <Col key={index} sm={6} md={4} lg={3}>
                      <Card className="movie-card">
                        <div
                          className={`heart-icon ${isFavorite(movie) ? 'active' : ''}`}
                          onClick={() => handleAddToFavorites(movie)}
                        >
                          <FaHeart />
                        </div>
                        <Card.Img variant="top" src={movie.banner_image} />
                        <Card.Body className="movie-card-body">
                          <Card.Text className="movie-year">{movie.year}</Card.Text>
                          <Card.Title className="movie-title">{movie.title}</Card.Title>
                          <Card.Text className="movie-genre">{movie.genre}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
            ) : (
              <>
                <Carousel className='custom-carousel'>
                  <Carousel.Item className='car'>
                    <img
                      className="d-block w-100"
                      src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/08/spider-man-across-the-spider-verse-changed-gwen-stacy-scene-on-digital-release.jpg"
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>Spider-Man: Into The Spider Verse</h3>
                      <p>Teen Miles Morales teams up with Gwen Stacy on a new adventure, facing sinister foe The Spot and a vast legion of parallel heroes in the Multiverse.</p>
                      <a className="btn btn-danger justify-content-center" href="https://www.youtube.com/watch?v=g4Hbz2jLxvQ" role="button"><FaCirclePlay /><p>Watch trailer</p></a>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item className='car'>
                    <img
                      className="d-block w-100"
                      src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2024/02/deadpool-wolverine-ryan-reynolds.jpg"
                      alt="Second slide"
                    />
                    <Carousel.Caption>
                      <h3>Deadpool & Wolverine</h3>
                      <p>Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool. They team up to defeat a common enemy.
                        Director
                        Shawn Levy
                        Writers
                        Shawn LevyRhett ReeseRyan Reynolds
                        Stars
                        Ryan ReynoldsHugh JackmanEmma Corrin</p>
                        <a className="btn btn-danger justify-content-center" href="https://www.youtube.com/watch?v=uJMCNJP2ipI" role="button"><FaCirclePlay /><p>Watch trailer</p></a>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item className='car'>
                    <img
                      className="d-block w-100"
                      src="https://cdn.openart.ai/stable_diffusion/5185e6bb61527ca5066c332abbafe63a0412452b_2000x2000.webp"
                      alt="Second slide"
                    />
                    <Carousel.Caption>
                      <h3>Blue Eye Samurai</h3>
                      <p>Blue Eye Samurai is an adult animated action television series created and written for Netflix by wife-and-husband team Amber Noizumi and Michael Green, with supervising director and series producer Jane Wu. It was co-produced and animated by French studio Blue Spirit.</p>
                        <a className="btn btn-danger justify-content-center" href="https://www.youtube.com/watch?v=nJ1yQn17lbE" role="button"><FaCirclePlay /><p>Watch trailer</p></a>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item className='car'>
                    <img
                      className="d-block w-100"
                      src="https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/anya-taylor-joy-furiosa-1.jpg"
                      alt="Second slide"
                    />
                    <Carousel.Caption>
                      <h3>Furiosa: A Mad Max Saga</h3>
                      <p>Snatched from the Green Place of Many Mothers, young Furiosa falls into the hands of a great biker horde led by the warlord Dementus. Sweeping through the Wasteland, they come across the Citadel, presided over by the Immortan Joe. As the two tyrants fight for dominance, Furiosa soon finds herself in a nonstop battle to make her way home.</p>
                        <a className="btn btn-danger justify-content-center" href="https://www.youtube.com/watch?v=XJMuhwVlca4" role="button"><FaCirclePlay /><p>Watch trailer</p></a>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
                <Container className='movielst'>
                  <h4>Movies</h4>
                  <Row>
                    {movies.map((movie, index) => (
                      <Col key={index} sm={6} md={4} lg={3}>
                        <Card className="movie-card">
                          <div
                            className={`heart-icon ${isFavorite(movie) ? 'active' : ''}`}
                            onClick={() => handleAddToFavorites(movie)}
                          >
                            <FaHeart />
                          </div>
                          <Card.Img variant="top" src={movie.banner_image} />
                          <Card.Body className="movie-card-body">
                            <Card.Text className="movie-year">{movie.year}</Card.Text>
                            <Card.Title className="movie-title">{movie.title}</Card.Title>
                            <Card.Text className="movie-genre">{movie.genre}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Container>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MovieList;
