import { useState } from 'react';
import { useGetSignedUrl } from '@/services/s3/s3.hooks';
import { useCreateDocument } from '@/services/documents/document.hooks';
import type { IDocument } from '@/services/documents/document.types';
import { getFileType } from '@/utils/file-utils';

export interface FileUploadProgress {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
  document?: IDocument;
}

export interface UseFileUploadOptions {
  knowledgeBaseId: string;
  onProgress?: (files: FileUploadProgress[]) => void;
  onComplete?: (documents: IDocument[]) => void;
  onError?: (error: string) => void;
}

export function useFileUpload({ knowledgeBaseId, onProgress, onComplete, onError }: UseFileUploadOptions) {
  const [uploading, setUploading] = useState(false);
  const [uploads, setUploads] = useState<FileUploadProgress[]>([]);

  const getSignedUrlMutation = useGetSignedUrl();
  const createDocumentMutation = useCreateDocument();

  const uploadFile = async (file: File): Promise<IDocument | null> => {
    try {

      const key = `${knowledgeBaseId}/${file.name}`;
      const bucket = "julia-chatbot"

      const uploadUrl = `https://${bucket}.s3.us-east-1.amazonaws.com/${key}`;

      // Step 1: Get signed URL from backend
      const signedUrlResult = await getSignedUrlMutation.mutateAsync({
        bucket,
        key,
        contentType: file.type,
        metadata: {
          knowledgeBaseId,
        },
      });

      if (!signedUrlResult.success || !signedUrlResult.data) {
        throw new Error('Failed to get signed URL');
      }

      const { signedUrl } = signedUrlResult.data;

      // Step 2: Upload file directly to S3
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to S3');
      }

      // Step 3: Create document record in backend
      const documentResult = await createDocumentMutation.mutateAsync({
        knowledgeBaseId,
        data: {
          name: file.name,
          fileUrl: uploadUrl,
          fileType: getFileType(file),
          fileSize: file.size,
        },
      });

      if (!documentResult.success || !documentResult.data) {
        throw new Error('Failed to create document record');
      }

      return documentResult.data;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  };

  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) return;

    setUploading(true);
    
    // Initialize upload progress tracking
    const initialUploads: FileUploadProgress[] = files.map(file => ({
      file,
      progress: 0,
      status: 'pending' as const,
    }));
    
    setUploads(initialUploads);
    onProgress?.(initialUploads);

    const completedDocuments: IDocument[] = [];

    try {
      // Process files sequentially to avoid overwhelming the server
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Update status to uploading
        setUploads(prev => prev.map((upload, index) => 
          index === i ? { ...upload, status: 'uploading', progress: 0 } : upload
        ));

        try {
          // Simulate progress during upload (S3 upload doesn't provide real progress)
          const progressInterval = setInterval(() => {
            setUploads(prev => prev.map((upload, index) => 
              index === i && upload.progress < 90 
                ? { ...upload, progress: upload.progress + 10 }
                : upload
            ));
          }, 200);

          const document = await uploadFile(file);
          
          clearInterval(progressInterval);

          if (document) {
            completedDocuments.push(document);
            
            // Update to completed
            setUploads(prev => prev.map((upload, index) => 
              index === i ? { 
                ...upload, 
                status: 'completed', 
                progress: 100,
                document 
              } : upload
            ));
          }
        } catch (error) {
          // Update to error state
          setUploads(prev => prev.map((upload, index) => 
            index === i ? { 
              ...upload, 
              status: 'error', 
              error: error instanceof Error ? error.message : 'Upload failed'
            } : upload
          ));
        }
      }

      if (completedDocuments.length > 0) {
        onComplete?.(completedDocuments);
      }

      if (completedDocuments.length < files.length) {
        onError?.(`${files.length - completedDocuments.length} file(s) failed to upload`);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      onError?.(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const removeUpload = (fileIndex: number) => {
    setUploads(prev => prev.filter((_, index) => index !== fileIndex));
  };

  const retryUpload = async (fileIndex: number) => {
    const upload = uploads[fileIndex];
    if (!upload || upload.status === 'uploading') return;

    await uploadFiles([upload.file]);
  };

  const clearUploads = () => {
    setUploads([]);
  };

  return {
    uploading,
    uploads,
    uploadFiles,
    removeUpload,
    retryUpload,
    clearUploads,
  };
}