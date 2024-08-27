import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { filterData } from '@/Data/FilterData'
import { setSearchedQuery } from '@/redux/job.slice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const ChangeHandler = (value) => {
    setSelectedValue(value)
  }
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue])
  return (
    <div>
      <h1 className='text-lg font-bold'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={ChangeHandler} >
        {filterData.map((item, index) => (
          <div key={index} className='my-1 p-3'>
            <h1 className='font-bold text-lg'>{item.filterType}</h1>
            {
              item.array.map((option, idx) => {
                const itemId = `id${index}-${idx}`
                return (
                  <div className='flex items-center my-1 space-x-2'>
                    <RadioGroupItem key={idx} id={itemId} value={option} />
                    <Label htmlFor={itemId}>{option}</Label>
                  </div>
                )
              })
            }
          </div>
        ))}
      </RadioGroup>



    </div>
  )
}

export default Filter