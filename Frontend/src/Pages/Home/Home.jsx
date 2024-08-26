import Navbar from '@/components/shared/Navbar'
import React, { useEffect } from 'react'
import CategoryCarousel from './components/CategoryCarousel'
import LatestJobs from './components/LatestJobs'
import Footer from '@/components/shared/Footer'
import Hero from './components/Hero'
import useGetAllJobs from '@/Hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { user } = useSelector(store => store.auth);
    useGetAllJobs();
    const navigate = useNavigate();
    useEffect(()=>{
        if(user.role === 'recruiter'){
            navigate('/admin/companies')
        }
    },[])
    return (
        <div>
            <Navbar />
            <Hero />
            <CategoryCarousel />
            <LatestJobs />
            <Footer />
        </div>
    )
}

export default Home