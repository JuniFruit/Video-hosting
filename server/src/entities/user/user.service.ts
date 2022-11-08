import { UserEntity } from "./user.entity"
import { userRepository } from "../../database/db";
import { subscriptionsRespository } from "../../database/db";
export const UserService = {

    subscribe: async function (userId: number, userToSubId: number): Promise<boolean> {
        const query = {
            fromUser: { id: userId },
            toUser: { id: userToSubId }
        }

        const isSubscribed = await subscriptionsRespository.findOneBy(query);

        if (!isSubscribed) {
            const newSub = await subscriptionsRespository.create(query);
            await subscriptionsRespository.save(newSub);
            return true
        }
        await subscriptionsRespository.delete(query);
        return false
    },

    getById: async function (id: number): Promise<UserEntity> {
        const user = await userRepository.findOne({
            where: {
                id: id
            },
            relations: {
                videos: {
                    user: true
                },
                subscribers: {
                    fromUser:true,
                    toUser:true
                },
                subscriptions: {
                    fromUser: true,
                    toUser: true
                }
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
    }
}