import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { filterData } from '@/Data/FilterData'
import React from 'react'

const Filter = () => {
  return (
    <div>
      <h1 className='text-lg font-bold'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup>
        {filterData.map((item, idx) => (
          <div className='my-1 p-3'>
            <h1 className='font-bold text-lg'>{item.filterType}</h1>
            {
              item.array.map((option, idx) => {
                return (
                  <div className='flex items-center my-1 space-x-2'>
                    <RadioGroupItem value={option} />
                    <Label>{option}</Label>
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