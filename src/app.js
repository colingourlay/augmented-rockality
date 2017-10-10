import getImages from './load-images';

// This is a feature detection
// It makes sure we have the navigator.mediaDevices.getUserMedia
// and window.FaceDetector APIs before we try to use them
if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices && 'FaceDetector' in window) {
  // This function creates some image elements for use to draw onto the canvas
  const images = getImages();

  // Ask the user if we can use their webcam
  navigator.mediaDevices
    .getUserMedia({ audio: false, video: { width: 640, height: 480 } })
    .then(function(stream) {
      // Get the video element from the DOM
      const videoEl = document.querySelector('video');
      // Get the canvas from the DOM
      const canvasEl = document.querySelector('canvas');
      // Get a 2D context for the canvas with a transparent background
      const canvasCtx = canvasEl.getContext('2d', { alpha: true });
      // Get the individual video stream from the usermedia
      const videoStream = stream.getTracks()[0];
      // Create a FaceDetector instance
      const faceDetector = new window.FaceDetector();

      function drawFaces() {
        // Pass the video element into faceDetector.detect()
        // It can also take Image, SVG, and Canvas elements
        faceDetector
          .detect(videoEl)
          .then(faces => {
            // We've been given an array of faces
          
            // Let's clear the old dwaynes from the canvas
            canvasCtx.clearRect(0, 0, 640, 480);

            // Loop through all the faces
            // Each face has a boundingBox object with coordinates and dimensions
            faces.forEach(face => {
              const center = {
                x: face.boundingBox.left + face.boundingBox.width / 2,
                y: face.boundingBox.top + face.boundingBox.height / 2
              };
              const scale = face.boundingBox.width / images.dwayne.naturalWidth;
              const eyes = [];
              
              face.landmarks.forEach(landmark => {
                if (landmark.type === 'eye') {
                  eyes.push(landmark.location);
                }
              });
                            
              const angle = (eyes[0].y - eyes[1].y) / (eyes[0].x - eyes[1].x);
              
              canvasCtx.translate(center.x, center.y);
              canvasCtx.rotate(angle);
              canvasCtx.drawImage(
                images.dwayne,
                (face.boundingBox.height / -2),
                (face.boundingBox.width / -2) + (face.boundingBox.height / 2) - (images.dwayne.naturalHeight * scale / 5 * 3),
                face.boundingBox.width,
                images.dwayne.naturalHeight * scale
              );
              canvasCtx.rotate(-angle);
              canvasCtx.translate(-center.x, -center.y);

            });
            // We've finished so lets call the function again
            window.requestAnimationFrame(drawFaces);
          })
          .catch(err => {
            console.log(err);
            console.error('Boo, Face Detection failed: ' + err);
            doesntWork();
          });
      }
      
      videoEl.addEventListener('canplay', drawFaces);
      videoEl.src = window.URL.createObjectURL(stream);
      videoEl.play();
    })
    .catch(function(err) {
      console.error('Failed to get webcam', err);
      doesntWork();
    });
} else {
  doesntWork();
}

function doesntWork() {
  document.querySelector('.nosupport').classList.remove('hidden');
  document.querySelector('video').classList.add('hidden');
  document.querySelector('canvas').classList.add('hidden');
}
