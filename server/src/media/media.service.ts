import { IMediaResponse } from './media.interface';
import stream from 'stream';
import drive from '../drive/drive.service'
import * as dotenv from 'dotenv';
dotenv.config();


export const MediaService = {


    saveMedia: async function (fileObject: any): Promise<IMediaResponse> {
        const folderId = process.env.FOLDER_ID

        if (!folderId) throw new Error('Something went wrong!')
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileObject.media.data);
        const connectedDrive = await drive()

        if (!connectedDrive) throw new Error('Something went wrong!');

        const { data } = await connectedDrive.files.create({
            media: {
                mimeType: fileObject.media.mimeType,
                body: bufferStream,
            },
            requestBody: {
                name: fileObject.media.name,
                parents: [folderId],
            },
            fields: '*',
        });
        console.log(`Uploaded file ${data.name} ${data.id}`);
        return {
            url: data.webContentLink || '',
            name: fileObject.media.name
        }
    },

}