import path from 'path';
import { IMediaResponse } from './media.interface';

export const MediaService = {
    saveMedia: async function (file:any, folder = 'default'):Promise<IMediaResponse> {
        const dir = path.join(__dirname, '..', 'uploads', `${folder}/${file.media.name}`);

        await file.media.mv(dir, (err:any) => {
            if (err) throw new Error('Upload failed. Reason: ' + err);
        })

        return  {
            url: `/uploads/${folder}/${file.media.name}`,
            name: file.media.name
        } 

    }
}