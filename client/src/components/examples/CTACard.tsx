import CTACard from '../CTACard'
import { Heart } from 'lucide-react'

export default function CTACardExample() {
  return (
    <div className="p-8 max-w-sm">
      <CTACard
        icon={Heart}
        title="Investir Recursos"
        description="Cada doação se transforma em água, saúde e dignidade para comunidades que mais precisam."
        buttonText="Fazer Doação"
        onClick={() => console.log('Doar clicked')}
      />
    </div>
  )
}
