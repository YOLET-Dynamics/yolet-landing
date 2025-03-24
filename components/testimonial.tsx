interface TestimonialProps {
  quote: string
  author: string
  position: string
}

export function Testimonial({ quote, author, position }: TestimonialProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-gray-900/30 p-8">
      <blockquote className="text-center text-xl font-light italic text-gray-300 md:text-2xl">"{quote}"</blockquote>
      <div className="mt-6 text-center">
        <p className="font-medium">{author}</p>
        <p className="text-sm text-gray-500">{position}</p>
      </div>
    </div>
  )
}

