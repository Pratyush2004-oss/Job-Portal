import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { categories } from '@/Data/Categories'
import { setSearchedQuery } from '@/redux/job.slice'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const disppatch = useDispatch();

  const SearchJobHandler = (query) => {
    disppatch(setSearchedQuery(query));
    navigate('/browse');
  }
  return (
    <div>
      <Carousel className='w-full max-w-xl mx-auto my-20'>
        <CarouselContent>
          {
            categories.map((category, idx) => (
              <CarouselItem key={idx} className='sm:basis-1/2 lg:basis-1/3'>
                <Button onClick={SearchJobHandler(category)} className='rounded-full' variant='outline'>{category}</Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div>
  )
}

export default CategoryCarousel