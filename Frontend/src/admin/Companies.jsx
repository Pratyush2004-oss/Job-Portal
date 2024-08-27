import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import CompaniesTable from './components/CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/Hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    useGetAllCompanies();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input])
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 p-3'>
                <div className='flex items-center justify-between gap-3' >
                    <Input className='w-fit basis-3/4 rounded-full' onChange={(e) => setInput(e.target.value)} placeholder='Filter by name' />
                    <Button className='rounded-full basis-1/4' onClick={() => navigate('/admin/companies/create')}>New Company</Button>
                </div>
                <div className='my-7'>
                    <CompaniesTable />
                </div>
            </div>
            <div className='fixed bottom-0 right-0 left-0 pt-32'>
                <Footer />
            </div>
        </div>
    )
}

export default Companies