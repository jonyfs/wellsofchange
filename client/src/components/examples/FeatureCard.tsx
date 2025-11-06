import FeatureCard from '../FeatureCard'
import { Heart } from 'lucide-react'

export default function FeatureCardExample() {
  return (
    <div className="p-8 max-w-md">
      <FeatureCard
        icon={Heart}
        title="Dignidade"
        description="Uma mãe que pode cuidar da higiene da família com dignidade."
      />
    </div>
  )
}
