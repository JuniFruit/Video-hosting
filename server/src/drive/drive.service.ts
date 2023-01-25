import * as dotenv from 'dotenv';
import fs from 'fs';
import { google } from 'googleapis';
dotenv.config();

const getDriveService = async () => {
    try {
        const keys = process.env.CREDS
        if (!keys) return;
        const parsedKeys = JSON.parse(keys);
        await fs.writeFile("me-tube-service.json", JSON.stringify(parsedKeys, null, 2), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }

            console.log("JSON file has been saved.");
        });

        const SCOPES = ['https://www.googleapis.com/auth/drive'];

        const auth = new google.auth.GoogleAuth({
            keyFilename: 'me-tube-service.json',
            scopes: SCOPES
        });
        const driveService = google.drive({ version: 'v3', auth });
        return driveService;
    } catch (e) {
        console.log(e)
    }
};

export default getDriveService;