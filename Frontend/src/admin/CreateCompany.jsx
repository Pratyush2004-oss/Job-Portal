import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setSingleCompany } from '@/redux/companySlice'
import { COMPANIES_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CreateCompany = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setcompanyName] = useState('')

    const registernewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANIES_API_END_POINT}/register`, {companyName} , {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res.data.company._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 p-3'>
                <div className='mb-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would tou like to give your company name</p>
                </div>

                <div>
                    <Label>Company Name</Label>
                    <Input type='text' placeholder='Enter your company name' onChange={(e) => setcompanyName(e.target.value)} className='my-2' />
                </div>

                <div className='flex items-center justify-end gap-4 my-10'>
                    <Button variant='destructive' className='rounded-full' onClick={() => navigate('/admin/companies')}>Cancel</Button>
                    <Button className='bg-[#7209b7] rounded-full' onClick={registernewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany