import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'

const ApplicationTable = () => {
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
                    {[1, 2].map((item, idx) => (
                        <TableRow>
                            <TableCell>12-07-2024</TableCell>
                            <TableCell>Frontend Developer</TableCell>
                            <TableCell>Infosys</TableCell>
                            <TableCell className='text-right'><Badge>Selected</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicationTable