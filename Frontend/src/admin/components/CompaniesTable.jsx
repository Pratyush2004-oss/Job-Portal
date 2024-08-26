import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const CompaniesTable = () => {
    const { allCompanies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany,setFilterCompany] = useState(allCompanies);
    useEffect(()=>{
        const filteredCompany = allCompanies.length >= 0 && allCompanies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })
        setFilterCompany(filteredCompany);
    },[allCompanies,searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent Companies</TableCaption>
                <TableHeader className='bg-slate-200'>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.length > 0 ? filterCompany.map((company) => (
                        <TableRow key={company._id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={company.logo ? company.logo : "https://github.com/shadcn.png"} />
                                </Avatar>
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.createdAt.split('T')[0]}</TableCell>
                            <TableCell className='text-right'>
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal className='cursor-pointer' /></PopoverTrigger>
                                    <PopoverContent className='w-24'>
                                        <Link to={`${company._id}`}>
                                            <div className='flex justify-end gap-3 items-center'>
                                                <span>Edit</span>
                                                <Edit className='w-4' />
                                            </div>
                                        </Link>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))
                        : <span>No Companies listed</span>
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable