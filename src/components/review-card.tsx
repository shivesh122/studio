'use client'

import type { Review } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

function StarRating({ rating }: { rating: number }) {
    const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
    return (
        <div className="flex items-center gap-0.5">
            {stars.map((isFilled, i) => (
                 <Star key={i} className={`h-4 w-4 ${isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`} />
            ))}
        </div>
    )
}


export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="flex gap-4 py-4">
        <Avatar className="h-10 w-10">
            <AvatarImage src={review.authorAvatarUrl} alt={review.authorName} data-ai-hint={review.authorAiHint}/>
            <AvatarFallback>{review.authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-semibold">{review.authorName}</p>
                    <StarRating rating={review.rating} />
                </div>
                <p className="text-sm text-muted-foreground">{review.date}</p>
            </div>
            <p className="mt-2 text-foreground/80">{review.comment}</p>
        </div>
    </div>
  )
}
