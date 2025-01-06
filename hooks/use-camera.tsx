import { useState, useEffect } from "react";

interface MediaDevice {
  deviceId: string;
  kind: string;
  label: string;
  groupId: string;
}

const useCamera = () => {
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [devices, setDevices] = useState<MediaDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const getDevices = async () => {
      try {
        // Try to get the user media (camera)
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        // If successful, camera is active
        setIsCameraActive(true);

        // List all media devices
        const devices: MediaDevice[] =
          await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        setDevices(videoDevices);

        // Set the first available video device by default
        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
        setIsCameraActive(false);
      }
    };

    getDevices();

    // Cleanup function to stop camera when component unmounts
    return () => {
      if (isCameraActive) {
        const tracks = devices.map((device) => device.deviceId);
        tracks.forEach((track) => {
          // Assuming `track` refers to a MediaStreamTrack, you would stop the track here
          // (this is a simplification, you'd need to actually track the MediaStream object)
          // stream.getTracks().forEach(track => track.stop()); // Example
        });
      }
    };
  }, [isCameraActive, devices]);

  return { isCameraActive, devices, selectedDeviceId };
};

export default useCamera;
