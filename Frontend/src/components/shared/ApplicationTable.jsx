import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

const ApplicationTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job)
    return (
        <div>
            <Table>
                <TableCaption>A list of your Applied jobs</TableCaption>
                <TableHeader className='bg-slate-200'>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className='text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.map((item, idx) => (
                        <TableRow>
                            <TableCell>{item.createdAt.split('T')[0]}</TableCell>
                            <TableCell>{item.job.title}</TableCell>
                            <TableCell>{item.job.companyId.name}</TableCell>
                            <TableCell className='text-right'><Badge className={`${item.status === 'pending' ? 'bg-yellow-400' : item.status === 'rejected' ? 'bg-red-500' :  'bg-green-400 '}`}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicationTable