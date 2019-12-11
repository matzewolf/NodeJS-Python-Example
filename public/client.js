// Face detection rate in [ms]
const detectionRate = 0

// Global elements: video, canvases, canvas contexts
const video = document.getElementById('video')
const webcam_canvas = document.getElementById('webcam_canvas')
const response_canvas = document.getElementById('response_canvas')
const webcam_ctx = webcam_canvas.getContext('2d')
const response_ctx = response_canvas.getContext('2d')

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    error => console.error(error)
  )
}

// Initialize the canvas: match the video's size
function init_canvases() {
  webcam_canvas.width = video.videoWidth
  webcam_canvas.height = video.videoHeight
  response_canvas.width = video.videoWidth
  response_canvas.height = video.videoHeight
}

// Callback to update webcam canvas
function webcam_stream() {
  webcam_ctx.drawImage(video, 0, 0, webcam_canvas.width, webcam_canvas.height)
  requestAnimationFrame(webcam_stream)
}

startVideo()
// Process video input for web application
video.addEventListener('play', () => {
  // Initialize canvases
  init_canvases()
  // Update webcam canvas
  requestAnimationFrame(webcam_stream)

  setInterval(async () => {
    const image64 = webcam_canvas.toDataURL()
    const request = {image64}
    const post_options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    }
    const response = await fetch('/api', post_options)
    const result = await response.json()
    const image64_response = result['image64']
    
    const image = new Image();
    image.onload = () => {
      response_ctx.drawImage(image, 0, 0, response_canvas.width, response_canvas.height);
    }
    image.src = image64_response
    
  }, detectionRate)  // <– rate at which the video is processed
})
