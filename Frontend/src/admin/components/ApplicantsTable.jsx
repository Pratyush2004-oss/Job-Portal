import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MoreVerticalIcon } from 'lucide-react';
import React from 'react'

const ApplicantsTable = ({ applicants }) => {
    const shortlistingStatus = ['Accepted', 'Rejected'];
    return (
        <div>
            <Table className='table-fixed'>
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
                                <TableCell>{item.applicant.email}</TableCell>
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
                                            {shortlistingStatus.map((status, idx) => (
                                                <div key={idx}>
                                                    <span>{status}</span>
                                                </div>
                                            ))}

                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))
                    )
                        :
                        <span className='text-lg text-red-400 text-center'>No applications yet</span>
                }
            </Table>
        </div>
    )
}

export default ApplicantsTable