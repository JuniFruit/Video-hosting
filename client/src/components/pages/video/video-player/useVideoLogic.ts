import {useCallback , useEffect, useState, useRef} from 'react';
import { IVideoElement } from '../Video.interface';

export const useVideoLogic = () => {

    const videoRef = useRef<IVideoElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoTime, setVideoTime] = useState(0);

    useEffect(() => {
        if (videoRef.current?.duration) setVideoTime(videoRef.current.duration)
    }, [videoRef.current?.duration])

    const togglePlay = useCallback(() => {
        if (isPlaying) {
            videoRef.current?.pause();
            setIsPlaying(false)
        } else {
            videoRef.current?.play();
            setIsPlaying(true);
        }
    }, [isPlaying])

    const skipForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime +=15
        }
    }

    const skipBackwards = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -=15
        }
    }

    const requestFullscreen = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.requestFullscreen) {
            video.requestFullscreen()
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        } else if (video.mozRequestFullscreen) {
            video.mozRequestFullscreen()
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        }
    }

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const updateProgress = () => {
            setCurrentTime(video.currentTime);
            setVideoTime((videoTime / video.currentTime) * 100);

        }
        video.addEventListener('timeupdate', updateProgress)

        return () => {
            video.removeEventListener('timeupdate', updateProgress);
        }
    }, [videoTime])

    useEffect (() => {
        const video = videoRef.current;

        if (!video) return;

        const handleKeys = (e: KeyboardEvent) => {

            switch (e.code) {
                case 'ArrowRight':
                    skipForward()
                break;
                case 'ArrowLeft':
                    skipBackwards();
                break;
                case 'KeyF':
                    requestFullscreen();
                break;
                case 'Space':
                    togglePlay();
                break;
                default:
                    return;

            }
        }

        video.addEventListener('keydown', handleKeys);

        return () => {
            video.removeEventListener('keydown', handleKeys);
        }
    }, [videoRef])

    return {
        videoRef,
        requestFullscreen,
        togglePlay,
        status: {
            videoTime,
            currentTime,
            isPlaying,
            progress
        }
    }
}