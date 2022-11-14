import { UserEntity } from "./user.entity"
import { userRepository } from "../../database/db";
import { subscriptionsRespository } from "../../database/db";
import { UserEditDto } from './user.dto';

export const UserService = {

    subscribe: async function (userId: number, userToSubId: number): Promise<boolean> {
        const query = {
            fromUser: { id: userId },
            toUser: { id: userToSubId }
        }
        const userToSub = await userRepository.findOneBy({ id: userToSubId });

        const isSubscribed = await subscriptionsRespository.findOneBy(query);

        if (!isSubscribed) {
            const newSub = await subscriptionsRespository.create(query);
            await subscriptionsRespository.save(newSub);
            userToSub!.subscrubersCount++;
            await userRepository.save(userToSub!);
            return true
        }
        await subscriptionsRespository.delete(query);
        userToSub!.subscrubersCount--;
        await userRepository.save(userToSub!);
        return false
    },

    getById: async function (id: number): Promise<UserEntity> {
       
        const user = await userRepository.findOne({
            where: {
                id: id,               
            },
            relations: {

                videos: {
                    user: true,

                },
                subscribers: {
                    fromUser: true,
                    toUser: true
                },
                subscriptions: {
                    fromUser: true,
                    toUser: true
                },
                likedVideos: true
            },
            order: {
                createdAt: "DESC"
            }

        })
        if (!user) throw new Error('User not found!');
        return user
    },
    getAll: async function (): Promise<UserEntity[]> {
        return await userRepository.find()
    },

    update: async function (data: UserEditDto, id: number) {

        const user = await userRepository.findOneBy({ id: id });
        return await userRepository.save({ ...user, ...data });
    }
}