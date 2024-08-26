import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Eye, MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterjobs, setfilterjobs] = useState(allAdminJobs);
    useEffect(() => {
        const filteredjobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.companyId?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.title?.toLowerCase().includes(searchJobByText.toLowerCase());
        })
        setfilterjobs(filteredjobs);
    }, [allAdminJobs, searchJobByText])
    return (
        <div>
            <Table className='table-fixed'>
                <TableCaption>A list of your Listed jobs</TableCaption>
                <TableHeader className='bg-slate-200'>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='flex items-center gap-2'><Eye className='w-5 text-center' /><span className='hidden sm:block'>Applicants</span></TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterjobs.length > 0 ? filterjobs.map((job) => (
                        <TableRow key={job._id}>
                            <TableCell>{job.companyId.name}</TableCell>
                            <TableCell>{job.title}</TableCell>
                            <TableCell>{job.createdAt.split('T')[0]}</TableCell>
                            <TableCell className='text-center'>{job.applications.length}</TableCell>
                            <TableCell className='text-right'>
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal className='cursor-pointer' /></PopoverTrigger>
                                    <PopoverContent className='w-40'>
                                        <Link to={`${job._id}`}>
                                            <div className='flex justify-end gap-3 items-center'>
                                                <span>Edit</span>
                                                <Edit className='w-4' />
                                            </div>
                                        </Link>
                                        <Link to={`${job._id}/applicants`}>
                                            <div className='flex justify-end gap-3 items-center'>
                                                <span>Applications</span>
                                                <Eye className='w-4' />
                                            </div>
                                        </Link>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))
                        : <span>No jobs listed</span>
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable