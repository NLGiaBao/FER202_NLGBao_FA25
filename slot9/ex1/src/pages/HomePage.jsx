// src/pages/HomePage.jsx
import React from "react";
import HomeCarousel from "../components/Home/HomeCarousel";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../components/Movie/MovieCard";
import { movies } from "../data/movies";

export default function HomePage() {
  return (
    <div>
      <HomeCarousel />
      {/* Bạn có thể thêm các section tiếp theo của trang Home ở dưới */}
      <div className="mt-4">
        <h4>Featured Movies Collections</h4>
        <p className="text-secondary">
          Thêm thông tin về các bộ sưu tập phim nổi bật ở đây.
        </p>

        <Row className="g-3">
          {movies.map((m) => (
            <Col key={m.id} xs={12} sm={6} lg={4}>
              <MovieCard movie={m} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
