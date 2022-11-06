import { IBase } from "./base.interface"
import { IVideo } from "./video.interface"

export interface IUser extends IBase {
    email: string
    name: string
    isVerified?: boolean
    subscrubersCount?: number
    description: string
    avatarPath: string
    subscribers: IUser[];
    subscriptions: IUser[];
    videos?: IVideo[]
    likedVideos: IVideo[]
}