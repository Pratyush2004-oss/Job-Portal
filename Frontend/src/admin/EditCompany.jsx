import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useGetCompanyById from '@/Hooks/useGetCompanyById'
import { COMPANIES_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { ArrowLeft, LoaderIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const EditCompany = () => {
    const params = useParams()
    const companyId = params.id;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { singleCompany } = useSelector(store => store.company)
    const dispatch = useDispatch();
    useGetCompanyById(companyId);
    
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const SubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANIES_API_END_POINT}/update/${companyId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                // dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message);
                navigate('/admin/companies')
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.logo || null
        })
    }, [singleCompany])
    return (
        <div>
            <Navbar />
            <div className='max-w-3xl mx-auto my-10 p-3'>
                <div className='flex items-center gap-6 p-8'>
                    <Button variant='outline' className='gap-2' onClick={() => navigate('/admin/companies')}>
                        <ArrowLeft className='w-4' /> Back
                    </Button>
                    <h1 className='text-xl font-bold font-serif my-3 '>Company Setup</h1>
                </div>
                <form className='border-2 p-2 rounded-xl my-5 shadow-lg' onSubmit={SubmitHandler}>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 m-5'>
                        <div className='space-y-2'>
                            <Label>Company Name</Label>
                            <Input type='text' name='name' value={input.name} onChange={changeEventHandler} />
                        </div>
                        <div className='space-y-2'>
                            <Label>Description</Label>
                            <Input type='text' name='description' value={input.description} onChange={changeEventHandler} />
                        </div>
                        <div className='space-y-2'>
                            <Label>Website</Label>
                            <Input type='text' name='website' value={input.website} onChange={changeEventHandler} />
                        </div>
                        <div className='space-y-2'>
                            <Label>Location</Label>
                            <Input type='text' name='location' value={input.location} onChange={changeEventHandler} />
                        </div>
                        <div className='space-y-2 sm:col-span-2'>
                            <Label>Logo</Label>
                            <Input type='file' accept='image/*' onChange={changeFileHandler} />
                        </div>
                        <Button type='submit' variant='outline' disabled={loading} className='sm:col-span-2 bg-[#7209b7] rounded-full my-3'>{loading ? <LoaderIcon className='animate-spin w-4 h-4 mr-2' /> : 'Update'}</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCompany