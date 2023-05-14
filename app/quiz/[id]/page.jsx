import { Container } from '@/components'
import { Answer } from '@/components/Answer'
import { endpoint } from '@/utils/endpoint'

async function getData(path) {
  const data = await fetch(`${endpoint}/${path}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // Recommendation: handle errors

  if (!data.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return data.json()
}

export default async function Page({ params }) {
  const { question } = await getData(`/quiz/${params.id}`)

  return (
    <Container as="main" className="flex flex-col gap-5 py-5">
      <h1 className="text-lg font-semibold">{question.title}</h1>
      <Answer answers={question.answers} questionId={params.id} />
    </Container>
  )
}
