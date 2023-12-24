function compressImage() {
  const imageInput = document.getElementById('imageInput');
  const compressionInput = document.getElementById('compressionInput');
  const previewContainer = document.getElementById('previewContainer');
  const beforeImage = document.getElementById('beforeImage');
  const afterImage = document.getElementById('afterImage');
  const imageNameElement = document.getElementById('imageName');
  const imageTypeElement = document.getElementById('imageType');
  const imageSizeElement = document.getElementById('imageSize');

  const file = imageInput.files[0];
  const compressionLevel = compressionInput.value;

  if (file) {
    // Display uploaded image details
    imageNameElement.textContent = `Name: ${file.name}`;
    imageTypeElement.textContent = `Type: ${file.type}`;
    imageSizeElement.textContent = `Size: ${formatBytes(file.size)}`;

    const reader = new FileReader();

    reader.onload = function(e) {
      const beforeSrc = e.target.result;
      beforeImage.src = beforeSrc;

      // Show the preview container after the first click
      previewContainer.classList.remove('hidden');

      const quality = compressionLevel / 100;
      const afterSrc = compressBeforeUpload(beforeSrc, quality);
      afterImage.src = afterSrc;
    };

    reader.readAsDataURL(file);
  }
}

function compressBeforeUpload(source, quality) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const image = new Image();
  image.src = source;

  canvas.width = 300; // Set a fixed width for the canvas
  canvas.height = 300 * (image.height / image.width); // Maintain aspect ratio

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL('image/jpeg', quality);
}

function downloadImage() {
  const afterImage = document.getElementById('afterImage');
  const link = document.createElement('a');
  link.href = afterImage.src;
  link.download = 'compressed_image.jpg';
  link.click();
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab]);
  }