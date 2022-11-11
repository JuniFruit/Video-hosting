import { FC } from 'react';
import { BsFullscreen } from 'react-icons/bs';
import { IoPause, IoPlay, IoVolumeMuteSharp, IoVolumeHigh } from 'react-icons/io5';
import { useVideoLogic } from './useVideoLogic';
import styles from './VideoPlayer.module.scss';

export const VideoPlayer: FC<{ videoPath: string }> = ({ videoPath }) => {
    const {
        refs,
        functions,
        status
    } = useVideoLogic();

    console.log(status.controlsOpen)
    return (
        <div className={styles.wrapper}>
            <video
                ref={refs.videoRef}
                onClick={functions.togglePlay}
                src='https://v.redd.it/qxtvgfwq6bz91/DASH_480.mp4?source=fallback'
                preload='metadata'
            />
            <div
                className={`${styles.controls} ${status.controlsOpen ? styles.controls_active : styles.controls_disabled}`}
                ref={refs.controlsRef}>

                <div className='flex items-center'>
                    <button title='Play' className={styles.button} onClick={functions.togglePlay}>
                        {status.isPlaying ? <IoPause /> : <IoPlay />}
                    </button>
                    <div className={styles.volume_container}>
                        <button title='Change volume' className={styles.button} onClick={functions.toggleMute}>
                            {status.isMuted ? <IoVolumeMuteSharp /> : <IoVolumeHigh />}
                        </button>
                        <input
                            onChange={functions.changeVolume}
                            value={status.volume}
                            type="range"
                            min="0"
                            max="1"
                            step="any"
                            className={styles.volume_slider}
                            style={{ backgroundSize: Math.floor((status.volume - 0) * 100 / (1 - 0)) + '% 100%' }}
                        />
                    </div>

                </div>

                <div className={`${styles.progressWrapper} ${status.isScrubbing && styles.scrubbing}`} ref={refs.progressBarRef}>
                    <div
                        className={styles.thumb}
                        style={{ left: `${status.progress - 0.5}%` }}
                    >

                    </div>


                    <div
                        className={styles.progressBar}
                        style={{ width: `${status.progress}%` }}

                    >

                    </div>
                    <div
                        className={styles.previewBar}
                        style={{ width: `${status.preview}%` }}
                    ></div>

                </div>

                <div className={styles.timeControls}>
                    <p>
                        {Math.floor(status.currentTime / 60) + ':' + ('0' + Math.floor(status.currentTime % 60)).slice(-2)}
                    </p>
                    <p> / </p>
                    <p>
                        {Math.floor(status.videoTime / 60) + ':' + ('0' + Math.floor(status.videoTime % 60)).slice(-2)}
                    </p>
                </div>

                <button title='Toggle fullscreen' className={styles.button} onClick={functions.requestFullscreen}>
                    <BsFullscreen className={'text-tiny'} />
                </button>


            </div>

        </div>
    )
}