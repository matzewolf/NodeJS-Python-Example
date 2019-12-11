// Import fetch
const fetch = require('node-fetch')

// Setup Express web server
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Serve index.html in directory 'public'
app.use(express.static('public'))
app.use(express.json({
  limit: '1 mb'
  // more?
}))

// Handle client's post requests
app.post('/api', async (request, response) => {
  // Make post request to python
  const post_options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request.body)
  }
  const py_response = await fetch('http://localhost:5000/py_api', post_options)
  const result = await py_response.json()
  response.json(result)
})

app.listen(port, () => {
  console.log(`Server started – go to http://localhost:${port}`)
})
