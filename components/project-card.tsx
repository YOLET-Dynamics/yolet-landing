import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ProjectProps {
  title: string
  category: string
  image: string
  description?: string
  showDescription?: boolean
}

export function ProjectCard({ title, category, image, description, showDescription = false }: ProjectProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-900/30 transition-all duration-300 hover:bg-gray-900/50">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={`${title} project thumbnail`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wider text-yellow-500">
          {category}
        </span>
        <h3 className="text-xl font-medium text-white">{title}</h3>
        {showDescription && description && <p className="mt-2 text-sm text-gray-400 line-clamp-2">{description}</p>}
        <div className="mt-4 flex items-center">
          <Link
            href="#"
            className="group inline-flex items-center text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            View Project
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

