import Card from '../components/Card'
import { internships } from '../data/internships'
import { Link } from 'react-router-dom'

function DetailsList() {
  return (
    <div className="mx-auto max-w-3xl">
      <Card className="p-6">
        <h1 className="mb-4 font-['Outfit'] text-2xl font-semibold text-slate-900">Internship Details</h1>
        <p className="mb-6 text-slate-600">Select an internship to view details.</p>

        <div className="grid gap-4">
          {internships.map((it) => (
            <div key={it.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
              <div>
                <p className="font-semibold text-slate-900">{it.title}</p>
                <p className="text-sm text-slate-500">{it.company}</p>
              </div>
              <Link to={`/details/${it.id}`} className="text-sm font-semibold text-primary">
                View
              </Link>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default DetailsList
