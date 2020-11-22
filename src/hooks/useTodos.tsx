import { useEffect, useState } from 'react'

const useTodos = (url: string) => {
  const [state, setState] = useState({ data: null, loading: true })
  useEffect(() => {
    setState({ data: state.data, loading: true })
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        setState({ data: d, loading: false })
      })
  })
  return state
}

export default useTodos
