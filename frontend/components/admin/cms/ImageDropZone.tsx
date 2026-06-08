"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageDropZoneProps {
  label: string;
  currentImage?: string;
  onImageChange: (previewUrl: string | null, file: File | null) => void;
  aspectRatio?: "square" | "landscape" | "portrait" | "logo";
}

export default function ImageDropZone({
  label,
  currentImage,
  onImageChange,
  aspectRatio = "landscape",
}: ImageDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [fileName, setFileName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(currentImage || null);
  }, [currentImage]);

  const heightClass = {
    square: "h-40",
    landscape: "h-52",
    portrait: "h-64",
    logo: "h-24",
  }[aspectRatio];

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFileName(file.name);
      onImageChange(url, file);
    },
    [onImageChange]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleClick = () => inputRef.current?.click();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
    onImageChange(null, null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs text-gray-400 tracking-wide uppercase">
        {label}
      </label>

      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative ${heightClass} rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden group ${
          isDragging
            ? "border-[#D4AF37] bg-[#D4AF37]/10 scale-[1.01]"
            : preview
            ? "border-[#D4AF37]/30 bg-[#0A0A0A]"
            : "border-white/10 bg-[#0A0A0A] hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              {/* Image preview */}
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-white text-xs font-medium">Click to replace</p>
                <p className="text-gray-400 text-xs">or drag a new image</p>
              </div>

              {/* Remove button */}
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition opacity-0 group-hover:opacity-100 z-10"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 transition pointer-events-none" />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4"
            >
              {/* Upload icon */}
              <motion.div
                animate={isDragging ? { scale: 1.2, y: -4 } : { scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </motion.div>

              <div className="text-center">
                <p className="text-white text-xs font-medium">
                  {isDragging ? "Drop image here" : "Drag & drop image"}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  or <span className="text-[#D4AF37]">click to browse</span>
                </p>
                <p className="text-gray-600 text-xs mt-1">PNG, JPG, WEBP up to 10MB</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dragging overlay */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#D4AF37]/10 border-2 border-[#D4AF37] rounded-2xl flex items-center justify-center z-20"
            >
              <div className="text-center">
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <svg className="w-10 h-10 text-[#D4AF37] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </motion.div>
                <p className="text-[#D4AF37] font-semibold text-sm mt-2">Drop to upload</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* File name */}
      {fileName && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-gray-500 flex items-center gap-1.5"
        >
          <svg className="w-3 h-3 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {fileName}
        </motion.p>
      )}
    </div>
  );
}