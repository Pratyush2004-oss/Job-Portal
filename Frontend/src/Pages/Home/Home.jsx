import Navbar from '@/components/shared/Navbar'
import React from 'react'
import CategoryCarousel from './components/CategoryCarousel'
import LatestJobs from './components/LatestJobs'
import Footer from '@/components/shared/Footer'
import Hero from './components/Hero'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero/>
            <CategoryCarousel/>
            <LatestJobs/>
            <Footer/>
        </div>
    )
}

export default Home