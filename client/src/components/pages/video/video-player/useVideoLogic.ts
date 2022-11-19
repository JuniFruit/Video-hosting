import { useCallback, useEffect, useState, useRef } from 'react';
import { IVideoElement } from '../Video.interface';

export const useVideoLogic = () => {

    const videoRef = useRef<IVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null)
    const videoWrapperRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [videoTime, setVideoTime] = useState<number>(0);
    const [preview, setPreview] = useState<number>(0);
    const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(1);
    const [controlsOpen, setControlsOpen] = useState<boolean>(true);

    useEffect(() => {
        if (videoRef.current?.duration) {
            setVideoTime(videoRef.current.duration)
            changeVolume({target: {value: Number(window.localStorage.userVideoVolume || 1)}})
        }
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

    const toggleMute = useCallback(() => {

        if (!videoRef.current) return;

        if (isMuted) {
            setIsMuted(false);
            videoRef.current.muted = false;
            setVolume(videoRef.current.volume);
        } else {
            videoRef.current.muted = true;
            setIsMuted(true);
            setVolume(0);
        }

    }, [isMuted]);

    const changeVolume = (e: any) => {
        if (!videoRef.current) return;

        if (Number(e.target.value) <= 0) setIsMuted(true);
        if (Number(e.target.value) > 0) setIsMuted(false);
        if (isMuted) toggleMute()
        videoRef.current.volume = e.target.value;
        setVolume(Number(e.target.value));
        window.localStorage.setItem('userVideoVolume', e.target.value.toString())
    }


    const previewScrubbing = (e: MouseEvent) => {
        if (!progressBarRef.current) return;
        const node = progressBarRef.current.getBoundingClientRect();
        const percentage = Number(((Math.min(Math.max(0, e.x - node.x), node.width) / node.width) * 100).toFixed(4));
        // if user activated scrubbing by MouseDown event, start seekchange;

        if (isScrubbing && videoRef.current) {
            videoRef.current!.currentTime = Number(((percentage / 100) * videoTime).toFixed(4));
        }
        setPreview(percentage)
    }

    const startScrubbing = (e: MouseEvent) => {
        setIsScrubbing(true);
    }

    const endScrubbing = (e: MouseEvent) => {
        setIsScrubbing(false);
        previewScrubbing(e);
    }


    const skipForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 5
        }
    }

    const skipBackwards = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 5
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

    const toggleControls = (switcher:boolean) => {
        setControlsOpen(switcher);
    }



    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const updateProgress = () => {
            setCurrentTime(video.currentTime);
            setProgress(Number((video.currentTime / videoTime * 100).toFixed(4)));

        }

        const handleEnded = () => {
            setCurrentTime(0);
            setProgress(0);
            setIsPlaying(false);
        }
        video.addEventListener('timeupdate', updateProgress)
        video.addEventListener('ended', handleEnded)
        return () => {
            video.removeEventListener('timeupdate', updateProgress);
            video.removeEventListener('ended', handleEnded)

        }
    }, [videoTime])

    useEffect(() => {    

        let timeout: any;

        if (isPlaying && controlsOpen) {
            timeout = setTimeout(() => toggleControls(false), 2000)
            videoWrapperRef.current!.addEventListener('mousemove', () => toggleControls(true));
        } else if (!isPlaying && !controlsOpen) {
            toggleControls(true);
        }


        return () => {
            clearTimeout(timeout);
            videoWrapperRef.current?.removeEventListener('mousemove', () => toggleControls(true));

        }

    }, [isPlaying, controlsOpen])

    useEffect(() => {

        if (!progressBarRef.current) return;

        progressBarRef.current.addEventListener('mousemove', previewScrubbing);
        progressBarRef.current.addEventListener('mouseleave', () => setPreview(0))
        progressBarRef.current.addEventListener('mousedown', startScrubbing)
        progressBarRef.current.addEventListener('mouseup', endScrubbing)

        return () => {
            progressBarRef.current?.removeEventListener('mousemove', previewScrubbing)
            progressBarRef.current?.removeEventListener('mouseleave', () => setPreview(0))
            progressBarRef.current?.removeEventListener('mousedown', startScrubbing)
            progressBarRef.current?.removeEventListener('mouseup', endScrubbing)

        }

    }, [progressBarRef.current, isScrubbing])

    useEffect(() => {
        const videoWrapper = videoWrapperRef.current;

        if (!videoWrapper) return;

        const handleKeys = (e: KeyboardEvent) => {
            if (e.target !== document.body) return;
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
                    e.preventDefault();
                    togglePlay();
                    break;
                default:
                    return;

            }
        }

        document.addEventListener('keydown', handleKeys);
        return () => {
            document.removeEventListener('keydown', handleKeys);
        }
    }, [videoWrapperRef, isPlaying])

    return {
        refs: {
            videoRef,
            progressBarRef,
            
            videoWrapperRef,
        },
        functions: {
            requestFullscreen,
            togglePlay,
            toggleMute,
            changeVolume,
        },
        status: {
            videoTime,
            currentTime,
            isPlaying,
            progress,
            preview,
            volume,
            isMuted,
            isScrubbing,
            controlsOpen
        }
    }
}