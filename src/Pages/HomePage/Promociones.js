//Import cfg
import React from 'react'

//Import Estilos
import { Carousel } from 'react-bootstrap'
import PromoA from '../../PromoA.jpg'
import PromoB from '../../PromoB.jpg'
import PromoC from '../../PromoC.jpg'


export default function Promociones() {

  return (
    <Carousel>
      <Carousel.Item interval={2500}>
        <img className="promo-img" src={PromoA} alt="First slide"/>
      </Carousel.Item>
      
      <Carousel.Item interval={2500}>
        <img className="promo-img" src={PromoB} alt="Second slide"/>
      </Carousel.Item>

      <Carousel.Item interval={2500}>
        <img className="promo-img" src={PromoC} alt="Third slide"/>
      </Carousel.Item>
    </Carousel>
  )
}
