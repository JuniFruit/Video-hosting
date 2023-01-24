import { IBase } from "./base.interface"
import { IComment } from "./comment.interface"
import { IUser } from "./user.interface"

export interface IVideo extends IBase {
    isPublic: boolean
    duration?: number
    name: string
    commentsCount: number
    likes: number
    description: string
    views: number
    videoPath: string
    thumbnailPath: string
    user: IUser
    comments: IComment[]
    isProcessing: boolean
    likedBy: IUser[]
}

export interface IVideoDto extends Pick<IVideo, 'id' | 'name'
    | 'isPublic' | 'description' | 'videoPath' | 'thumbnailPath' | 'duration' | "isProcessing"> { }