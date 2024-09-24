import Navbar from '@/components/shared/Navbar'
import React, { useEffect } from 'react'
import ApplicantsTable from './components/ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicantsSlice'

const JobApplicants = () => {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application)
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllApplicants();
    }, [])
    return applicants && (
        <div>
            <Navbar />
            <div className='p-3 mx-auto my-10 max-w-7xl'>
                <h1 className='my-3 text-3xl font-bold '>Applicants ({applicants.applications.length})</h1>
                <ApplicantsTable applicants = {applicants} />
            </div>
            
        </div>
    )
}

export default JobApplicants