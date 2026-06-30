import React from 'react';
import Header from "../components/Header"
import Steps from '../components/Steps';
import Description from '../components/Description';
import Testimonial from '../components/Testimonial';
import GenerateBtn from '../components/GenerateBtn';

function Home() {
  return (
    <div>
       <Header/>
       <Steps></Steps>
       <Description/>
       <Testimonial/>
       <GenerateBtn/>
    </div>
  );
}

export default Home;
