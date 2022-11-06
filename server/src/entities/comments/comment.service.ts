import { CommentDto } from "./comment.dto";
import { CommentEntity } from "./comment.entity"
import { commentRepository } from "../../database/db";


export const CommentService = {

    create: async function (userId: number, dto: CommentDto):Promise<CommentEntity> {
        const comment = commentRepository.create({
            body: dto.body,
            video: {id:  dto.videoId},
            author: {id: userId}
        })

        return await commentRepository.save(comment);
    },
    update: async function () {
        
    }
}