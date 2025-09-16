'use client'
import { useState } from 'react';
import ImageZoomModal from './ImageZoomModal';

const ImagePreview = ({ 
  images = [], 
  onRemove, 
  maxImages = 5, 
  className = '' 
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState({});

  console.log('ImagePreview received images:', images);
  console.log('ImagePreview images length:', images.length);

  const handleImageClick = (image, index) => {
    setSelectedImage({ ...image, index });
    setShowZoomModal(true);
  };

  const handleCloseZoom = () => {
    setShowZoomModal(false);
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    if (selectedImage && selectedImage.index > 0) {
      const newIndex = selectedImage.index - 1;
      setSelectedImage({ ...images[newIndex], index: newIndex });
    }
  };

  const handleNext = () => {
    if (selectedImage && selectedImage.index < images.length - 1) {
      const newIndex = selectedImage.index + 1;
      setSelectedImage({ ...images[newIndex], index: newIndex });
    }
  };

  if (images.length === 0) {
    console.log('No images to display');
    return null;
  }

  return (
    <>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ${className}`}>
        {images.map((image, index) => {
          console.log(`Rendering image ${index}:`, image);
          return (
          <div 
            key={index} 
            className="relative group border border-gray-600 rounded-lg overflow-hidden bg-gray-700 hover:border-blue-500 transition-colors"
          >
            {/* Image Preview */}
            <div 
              className="aspect-square cursor-pointer bg-gray-600 relative overflow-hidden flex items-center justify-center"
              onClick={() => handleImageClick(image, index)}
            >
              {image.preview || image.url ? (
                <>
                  {/* Loading indicator */}
                  {imageLoadStates[index] !== 'loaded' && imageLoadStates[index] !== 'error' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                        <p className="text-xs text-gray-400">Loading...</p>
                      </div>
                    </div>
                  )}
                  
                  <img
                    src={image.preview || image.url}
                    alt={`Preview ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                    style={{ 
                      width: 'auto', 
                      height: 'auto',
                      maxWidth: '100%', 
                      maxHeight: '100%' 
                    }}
                    onLoad={(e) => {
                      console.log('Image loaded successfully:', image.name);
                      setImageLoadStates(prev => ({
                        ...prev,
                        [index]: 'loaded'
                      }));
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', image);
                      setImageLoadStates(prev => ({
                        ...prev,
                        [index]: 'error'
                      }));
                      e.target.style.display = 'none';
                      const fallback = e.target.nextElementSibling;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                  {/* Fallback when image fails to load */}
                  <div 
                    className="w-full h-full flex items-center justify-center absolute inset-0 bg-gray-700"
                    style={{ display: imageLoadStates[index] === 'error' ? 'flex' : 'none' }}
                  >
                    <div className="text-center">
                      <svg 
                        className="w-8 h-8 text-gray-400 mx-auto mb-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                      </svg>
                      <p className="text-xs text-gray-400 truncate px-2">
                        {image.name || `Image ${index + 1}`}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                /* Fallback when no image URL */
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <svg 
                      className="w-8 h-8 text-gray-400 mx-auto mb-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                    <p className="text-xs text-gray-400 truncate px-2">
                      {image.name || `Image ${index + 1}`}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-black/50 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                {/* Zoom button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(image, index);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                  title="Zoom image"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </button>

                {/* Remove button */}
                {onRemove && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(index);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                    title="Remove image"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
              <p className="text-xs text-white truncate">
                {image.name || `Image ${index + 1}`}
              </p>
              {image.size && (
                <p className="text-xs text-gray-300">
                  {(image.size / 1024 / 1024).toFixed(1)} MB
                </p>
              )}
            </div>
          </div>
          );
        })}
      </div>

      {/* Zoom Modal */}
      {showZoomModal && selectedImage && (
        <ImageZoomModal
          image={selectedImage}
          images={images}
          currentIndex={selectedImage.index}
          onClose={handleCloseZoom}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </>
  );
};

export default ImagePreview;
