import React from "react";
import './hero.css'
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";


function Hero() {


  return (
    <div>
      <Container fluid>

      <Carousel >
      <Carousel.Item interval={1000}>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <img style={{width:'100%'}} src={'https://cdn11.bigcommerce.com/s-h1rryf/images/stencil/1920w/carousel/43/03_1.jpg?c=2'} alt="" />
        <Carousel.Caption>
          <h3>Mens Collections</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <img style={{width:'100%'}} src={'https://cdn11.bigcommerce.com/s-h1rryf/images/stencil/1920w/carousel/43/03_1.jpg?c=2'} alt="" />
        <Carousel.Caption>
          <h3>Womens Collection</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <img style={{width:'100%'}} src={'https://cdn11.bigcommerce.com/s-h1rryf/images/stencil/1920w/carousel/43/03_1.jpg?c=2'} alt="" />
        <Carousel.Caption className="carousel-caption">
          <h3 >Kids Collection</h3>
          <p >
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>



{/* <div>
        <Row>
          <Col>
              <div className="hero-image">
                <img src={'https://cdn11.bigcommerce.com/s-h1rryf/images/stencil/1920w/carousel/43/03_1.jpg?c=2'} alt="" />
               
              </div>
             
          </Col>        
        </Row>
        </div>
     */}
      </Container>
    </div>
  );
}

export default Hero;
