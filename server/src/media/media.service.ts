import path from 'path';
import { IMediaResponse } from './media.interface';

export const MediaService = {
    saveMedia: async function (file: any, folder = 'default'): Promise<IMediaResponse> {
        const dir = path.join(__dirname, '..', 'uploads', `${folder}/${file.media.name}`);

        if (file.media.mimetype.includes('video') || file.media.mimetype.includes('image')) {

            try {
                await file.media.mv(dir, (err: any) => {
                    if (err) throw new Error('Upload failed. Reason: ' + err);
                })

                return {
                    url: `/uploads/${folder}/${file.media.name}`,
                    name: file.media.name,
                }
            } catch (e: any) {
                throw new Error(e.message);
            }
        } else {
            throw new Error('Unsupported file type')
        }

    }
}