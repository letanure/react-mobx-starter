import { useRef } from "react"

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void
  disabled?: boolean
}

export function FileUpload({
  onFilesSelected,
  disabled = false,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      onFilesSelected(Array.from(files))
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="border-2 border-dashed border-neutral-3 hover:border-neutral-7 rounded-lg p-12 text-center cursor-pointer w-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-neutral-3"
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="space-y-4">
        <div className="text-4xl">+</div>
        <p className="text-lg">Click to select images</p>
        <p className="text-sm text-neutral-7">Choose multiple files</p>
      </div>
    </button>
  )
}
