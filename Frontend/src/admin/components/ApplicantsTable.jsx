import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { MoreVerticalIcon } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

const ApplicantsTable = ({ applicants }) => {
    const shortlistingStatus = ['Accepted', 'Rejected'];

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='h-[50vh] overflow-auto'>
            <Table className=''>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader className='bg-slate-300'>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                {
                    applicants.applications.length > 0 ? (applicants.applications.map((item, idx) => (
                        <TableBody>
                            <TableRow key={idx}>
                                <TableCell>{item.applicant.fullname}</TableCell>
                                <TableCell className='text-wrap'>{item.applicant.email}</TableCell>
                                <TableCell>{item.applicant.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        item.applicant.profile.resume ?
                                            <a className='text-blue-500 underline' href={item.applicant.profile.resume}>{item.applicant.profile.resumeOriginalName}</a>
                                            : <span>Resume not uploaded</span>
                                    }
                                </TableCell>
                                <TableCell>{item.createdAt.split('T')[0]}</TableCell>
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger><MoreVerticalIcon /></PopoverTrigger>
                                        <PopoverContent className='w-40'>
                                            {shortlistingStatus.map((status, idx) => {
                                                return (
                                                    <div key={idx} onClick={() => statusHandler(status, item._id)}>
                                                        <span className='p-2 cursor-pointer'>{status}</span>
                                                    </div>
                                                )
                                            })}

                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))
                    )
                        :
                        <span className='text-lg text-center text-red-400'>No applications yet</span>
                }
            </Table>
        </div>
    )
}

export default ApplicantsTable