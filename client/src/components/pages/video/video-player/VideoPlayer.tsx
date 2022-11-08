import { FC } from 'react';
import { BsFullscreen } from 'react-icons/bs';
import { IoPause, IoPlay } from 'react-icons/io5';
import { useVideoLogic } from './useVideoLogic';
import styles from './VideoPlayer.module.scss';

export const VideoPlayer: FC<{ videoPath: string }> = ({ videoPath }) => {
    const { videoRef, togglePlay, requestFullscreen, status } = useVideoLogic();

    return (
        <div className={styles.wrapper}>
            <video
                ref={videoRef}
                onClick={togglePlay}
                src={videoPath}
                preload='metadata'
            />
            <div className={`${styles.controls} ${status.isPlaying && styles.hide}`}>
                <button onClick={togglePlay}>
                    {status.isPlaying ? <IoPause /> : <IoPlay />}
                </button>

                <div className={styles.progressWrapper}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${status.progress}%` }}

                    >

                    </div>

                </div>

                <div className={styles.timeControls}>
                    <p>
                        {Math.floor(status.currentTime / 60) + ':' + ('0' + Math.floor(status.currentTime % 60)).slice(-2)}
                    </p>
                    <p> / </p>
                    <p>
                        {Math.floor(status.currentTime / 60) + ':' + ('0' + Math.floor(status.currentTime % 60)).slice(-2)}
                    </p>
                </div>

                <button onClick={requestFullscreen}>
                    <BsFullscreen className={'text-tiny'} />
                </button>


            </div>

        </div>
    )
}