'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Video as VideoIcon, AlertTriangle } from 'lucide-react';

export default function VideoChatPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      // Check if running in a browser environment
      if (typeof window !== 'undefined' && navigator.mediaDevices) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this feature.',
          });
        }
      } else {
        setHasCameraPermission(false);
         toast({
            variant: 'destructive',
            title: 'Device Not Supported',
            description: 'Video features are not supported on this device or browser.',
          });
      }
    };

    getCameraPermission();

    // Cleanup function to stop the video stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline text-foreground/90 flex items-center gap-2">
            <VideoIcon className="text-primary"/>
            Video Chat
        </h1>
        <p className="text-muted-foreground mt-1">Connect face-to-face with other members.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Video Feed</CardTitle>
          <CardDescription>This is a preview of your camera. In a real call, you would see the other person here.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl bg-muted rounded-lg overflow-hidden aspect-video relative">
                 <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                 {hasCameraPermission === false && (
                     <div className="absolute inset-0 flex items-center justify-center p-4">
                        <Alert variant="destructive" className="max-w-md">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Camera Access Required</AlertTitle>
                            <AlertDescription>
                                Please allow camera access in your browser's settings to use this feature. You may need to refresh the page after granting permission.
                            </AlertDescription>
                        </Alert>
                     </div>
                 )}
                 {hasCameraPermission === null && (
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <p className="text-muted-foreground">Requesting camera access...</p>
                      </div>
                 )}
            </div>
            
        </CardContent>
      </Card>
    </div>
  );
}
