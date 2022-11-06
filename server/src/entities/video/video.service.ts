import { DeleteResult, FindOptionsWhereProperty, ILike, MoreThan } from "typeorm";
import { VideoDto } from "./video.dto";
import { VideoEntity } from "./video.entity"
import { videoRepository, userRepository } from "../../database/db";


const selectUserOptions = {
    id: true,
    name: true,
    avatarPath: true,
    subscrubersCount: true,
    isVerified: true,
    subscriptions: true
}

const selectCommentOptions = {
    body: true,
    id: true,
    author: {
        ...selectUserOptions
    }
}

export const VideoService = {

    getById: async function (id: number, isPublic = false) {
        const video = await videoRepository.findOne({
            where: isPublic ? {
                id, isPublic: true
            } : { id },
            relations: {
                user: true,
                comments: {
                    author: true
                },
            },

            select: {
                user: {
                    ...selectUserOptions
                },
                comments: {
                    ...selectCommentOptions
                }
            }


        })
        if (!video) throw new Error('Video was not found!');
        return video;
    },

    updateVideo: async function (id: number, dto: VideoDto): Promise<VideoEntity> {
        const video = await videoRepository.findOneBy({ id: id });

        return await videoRepository.save({ ...video, ...dto });
    },

    getAll: async function (searchTerm?: string) {
        let options: FindOptionsWhereProperty<VideoEntity> = {};

        if (searchTerm) {
            options = {
                name: ILike(`%${searchTerm}%`)
            }
        }
        return await videoRepository.find({
            where: {
                ...options,
                isPublic: true
            },
            relations: {
                comments: {
                    author: true,
                    body: true,
                    id: true
                },
                user: true
            },
            select: {
                user: {
                    ...selectUserOptions
                },
                comments: {
                  ...selectCommentOptions
                }
            }
        })
    },
    getMostViewed: async function ():Promise<VideoEntity[]> {
        const videos = await videoRepository.find({
            where: {
                views: MoreThan(0)
            },
            relations: {
                user: true,
            },
            order: {
                views: -1
            },
            select: {
                user: {
                    ...selectUserOptions
                }
            }
        })

        return videos
    },

    create: async function (userId: number):Promise<number> {

        const defaultFields = {
            videoPath: '',
            thumbnailPath: '',
            description: '',
            user: {id: userId},
            name: ''
        }
        const newVideo = videoRepository.create(defaultFields);
        const video = await videoRepository.save(newVideo);
        
        return video.id;
    },

    delete: async function (id:number):Promise<DeleteResult> {      

        return await videoRepository.delete({id});
    },

    incrementViews: async function (id: number):Promise<VideoEntity> {
        const video = await this.getById(id);
        video.views++;
        return await videoRepository.save(video);
    },

    updateReaction: async function (id:number, userId?: number) {
        const video = await this.getById(id);

       video.likes++;
       return await videoRepository.save(video); 
    }


}