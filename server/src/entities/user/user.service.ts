import { UserEntity } from "./user.entity"
import { userRepository } from "../../database/db";
export const UserService = {

    subscribe: async function (userId: number, userToSubId: number):Promise<boolean> {

        const currentUser = await this.getById(userId);
        const userToSub = await this.getById(userToSubId);
        if (!currentUser || !userToSub) throw new Error('Trying to subscribe to non-existing user');
        
        const isSubscribed = currentUser.subscriptions.find((user: UserEntity) => user.id === userToSubId);
        

        if (!isSubscribed) {
            currentUser.subscriptions = [...currentUser.subscriptions, userToSub];
            userToSub.subscribers = [...userToSub.subscribers, currentUser];
            userToSub.subscrubersCount++;

            await userRepository.save(currentUser);
            await userRepository.save(userToSub);
            return true
        }

        currentUser.subscriptions = currentUser.subscriptions.filter((user: UserEntity) => user.id !== userToSubId);
        userToSub.subscribers = userToSub.subscribers.filter((user: UserEntity) => user.id !== userId);
        userToSub.subscrubersCount--;

        await userRepository.save(currentUser);
        await userRepository.save(userToSub);

        return false;
    },

    getById: async function (id: number):Promise<UserEntity> {
        const user = await userRepository.findOne({
            where: {
                id: id
            },
            relations: {
                videos: true,
                subscriptions: true
            },
            order: {
                createdAt: "DESC"
            }

        })
        if (!user) throw new Error('User not found!');
        return user
    },
    getAll: async function():Promise<UserEntity[]> {
        return await userRepository.find()
    } 
}