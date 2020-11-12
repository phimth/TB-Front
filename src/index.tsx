import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import App from 'App'
import { register } from 'core'
import reportWebVitals from 'reportWebVitals'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)

register()
reportWebVitals()
