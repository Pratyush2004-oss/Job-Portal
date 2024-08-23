import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { categories } from '@/Data/Categories'
import React from 'react'

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className='w-full max-w-xl mx-auto my-20'>
        <CarouselContent>
          {
            categories.map((category, idx) => (
              <CarouselItem key={idx} className='sm:basis-1/2 lg:basis-1/3'>
                <Button className='rounded-full' variant='outline'>{category}</Button>
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