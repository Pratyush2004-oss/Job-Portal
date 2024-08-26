import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from 'sonner'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'
import { LoaderIcon } from 'lucide-react'

const PostJobs = () => {
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: 0,
        companyId: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const { allCompanies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const SelectorChangeHandler = (value) => {
        const selectedCompany = allCompanies.find((company) => company.name.toLowerCase() === value)
        setInput({ ...input, companyId: selectedCompany._id })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin/jobs')
            }

        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl sm:flex flex-col items-center justify-center mx-auto my-10 p-3'>
                <h1 className='text-3xl font-bold'>Post Job</h1>
                <form className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 border p-5 rounded-lg shadow-lg'>
                    <div>
                        <Label>Title</Label>
                        <Input type='text' name='title' value={input.title} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input type='text' name='description' value={input.description} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' />
                    </div>
                    <div>
                        <Label>Requirements</Label>
                        <Input type='text' name='requirements' value={input.requirements} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' />
                    </div>
                    <div>
                        <Label>Salary</Label>
                        <Input type='text' name='salary' value={input.salary} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input type='text' name='location' value={input.location} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' />
                    </div>
                    <div>
                        <Label>Experience Level</Label>
                        <Input type='text' name='experience' value={input.experience} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' />
                    </div>
                    <div>
                        <Label>Job Type</Label>
                        <Input type='text' name='jobType' value={input.jobType} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' />
                    </div>
                    <div>
                        <Label>Number of Positions</Label>
                        <Input type='number' name='position' value={input.position} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' />
                    </div>
                    {
                        allCompanies.length >= 0 && (
                            <div>
                                <Label>Company</Label>
                                <Select onValueChange={SelectorChangeHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {allCompanies.map((company) => (
                                            <SelectItem key={company._id} value={company.name.toLowerCase()}>{company.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )
                    }
                    <Button onClick={onSubmitHandler} disabled={allCompanies.length === 0 || loading} className='sm:col-span-2 lg:col-span-3 rounded-full'>{allCompanies.length > 0 ? (loading ? <LoaderIcon className='w-4 animate-spin' /> : 'Post Job') : 'Please register Company first'}</Button>
                </form>
            </div>
        </div>
    )
}

export default PostJobs