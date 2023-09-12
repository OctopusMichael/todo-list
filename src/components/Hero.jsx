import React from 'react'

const Hero = ({theme}) => {
  return (
    <section className={`${ theme ? "section-hero-light-mobile" : "section-hero-dark-mobile" }  h-[30vh] w-full`}>
      
    </section>
  )
}

export default Hero