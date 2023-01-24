import { google } from 'googleapis';
import path from 'path';

const getDriveService = () => {
    const KEYFILEPATH = path.join(__dirname, '../../me-tube-service.json');
    const SCOPES = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES,
    });
    const driveService = google.drive({ version: 'v3', auth });
    return driveService;
};

export default getDriveService;