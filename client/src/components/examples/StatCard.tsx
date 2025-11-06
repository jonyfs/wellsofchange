import StatCard from '../StatCard'

export default function StatCardExample() {
  return (
    <div className="p-8 max-w-xs">
      <StatCard
        value="1"
        label="Poço Completo"
        description="Campo Formoso, Bahia"
      />
    </div>
  )
}
