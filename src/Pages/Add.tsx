import React, { useState } from 'react'
import { Header } from './Header'
import {  useForm } from 'react-hook-form'

export const Add = () => {
    const [uploading, setUploading] = useState(false);
    const [, setUploadUrl] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            description: "",
            image: ""
        }
    })

    const { register, handleSubmit, reset, setValue } = form;
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    // Handle image upload to Cloudinary
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploading(true);

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData
      }
    );

    const result = await response.json();

    if (result.secure_url) {
      setValue("image", result.secure_url);
      setUploadUrl(result.secure_url);
      console.log("✅ Image uploaded:", result.secure_url);
    }
  } catch (error) {
    console.error("❌ Image upload failed:", error);
  } finally {
    setUploading(false);
  }
};

const handleCopy = async () => {
  if (!generatedLink) return;

  try {
    await navigator.clipboard.writeText(generatedLink);
  } catch (err) {
    console.error("Copy failed", err);
  }
};  
const onSubmit = async (data: any) => {
    if(!data.image) {
        alert("Please Upload Image");
        return;
    }
  try {
    const response = await fetch("https://valentine-back-end-1.onrender.com/api/valentine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
    setGeneratedLink(`${window.location.origin}/valentine/${result.data._id}`);
      reset();
    } else {
        console.error("Server error:", result.message);
    }
  } catch (error) {
    console.error(error);
  }
};

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-100 to-red-200 flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-pink-200">

                <Header />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-pink-600">
                            💕 Your Loved One Name
                        </label>
                        <input
                            type="text"
                            {...register('name')}
                            required
                            placeholder="Enter your lovely name"
                            className="mt-1 w-full rounded-xl border border-pink-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-pink-600">
                            💌 Email
                        </label>
                        <input
                            type="email"
                            {...register('email')}
                            required
                            placeholder="yourlove@email.com"
                            className="mt-1 w-full rounded-xl border border-pink-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-semibold text-pink-600">
                            💬 Love Message
                        </label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            required
                            placeholder="Write something romantic..."
                            className="mt-1 w-full rounded-xl border border-pink-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-pink-600">
                            📸 Upload Memory
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            disabled={uploading}
                            onChange={handleImageUpload}
                            className="mt-1 block w-full text-sm text-pink-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:bg-pink-500 file:text-white
                         hover:file:bg-pink-600 transition"
                        />

                        {uploading && (
                            <p className="text-sm text-pink-500 mt-1 animate-pulse">
                                Uploading your love...
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full bg-gradient-to-r from-pink-500 to-red-500
                       text-white py-3 rounded-full font-bold text-lg
                       hover:scale-105 transition transform
                       disabled:opacity-50"
                    >
                        {uploading ? 'Genarated Link' : '💝 Genarated Link'}
                    </button>

                    <div className="flex gap-2">
  <input
    type="text"
    placeholder="URL"
    value={generatedLink}
    className="flex-1 rounded-xl border border-pink-300 px-4 py-2
               focus:outline-none focus:ring-2 focus:ring-pink-400"
    readOnly
  />

  <button
    type="button"
    onClick={handleCopy}
    disabled={!generatedLink}
    className="px-4 py-2 rounded-xl bg-pink-500 text-white font-semibold
               hover:bg-pink-600 transition disabled:opacity-50"
  >
    📋 Copy
  </button>
</div>
                </form>
            </div>
        </div>
    );
}