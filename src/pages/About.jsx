import Card from '../components/Card'

function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 sm:py-6 md:px-0">
      <Card className="p-6 sm:p-8">
        <h1 className="mb-2 font-['Outfit'] text-2xl font-semibold text-slate-900 sm:text-3xl md:text-4xl">About InternX</h1>
        <p className="mb-4 text-slate-600">
          InternX connects students with verified micro-internships to build real-world skills.
        </p>
        <p className="text-slate-500">Our mission is to make skill verification simple and accessible.</p>
      </Card>
    </div>
  )
}

export default About
