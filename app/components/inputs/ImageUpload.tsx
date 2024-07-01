import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useState } from "react";
import { TbPhotoPlus } from 'react-icons/tb'
import Swiper from "../Swiper"; // Importa el componente Swiper

declare global {
  var cloudinary: any
}

const uploadPreset = "nzr9nhdo";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value
}) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleUpload = useCallback((result: any) => {
    const imageUrl = result.info.secure_url;
    onChange(imageUrl);
    setUploadedImages(prevImages => [...prevImages, imageUrl]);
  }, [onChange]);

  return (
    <div>
      <CldUploadWidget 
        onUpload={handleUpload} 
        uploadPreset={uploadPreset}
        options={{
          maxFiles: 5
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className="
                relative
                cursor-pointer
                hover:opacity-70
                transition
                border-dashed 
                border-2 
                p-20 
                border-neutral-300
                flex
                flex-col
                justify-center
                items-center
                gap-4
                text-neutral-600
              "
            >
              <TbPhotoPlus
                size={50}
              />
              <div className="font-semibold text-lg">
                Haga clic para subir
              </div>
              {value && (
                <div className="
                  absolute inset-0 w-full h-full">
                  <Image
                    fill 
                    style={{ objectFit: 'cover' }} 
                    src={value} 
                    alt="House" 
                  />
                </div>
              )}
            </div>
          ) 
      }}
      </CldUploadWidget>
      
      {/* Agrega el componente Swiper y pasa la lista de imágenes */}
      {uploadedImages.length > 0 && (
        <Swiper imageSrcList={uploadedImages} />
      )}
    </div>
  );
}

export default ImageUpload;
