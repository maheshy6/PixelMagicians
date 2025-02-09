require("dotenv").config()
const { google } = require('googleapis');


//google calender setup
// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google Calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

// Function to format dates for Google Calendar
exports.formatDateTime = (date) => {
    const offset = '+05:30'; // IST timezone
    return `${date}T00:00:00.000${offset}`;
};

// Function to insert event into Google Calendar
exports.insertEvent = async (event) => {
    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        });

        if (response.status === 200 && response.statusText === 'OK') {
            //console.log('Event created successfully.');
            return 1;
        } else {
            //console.log('Failed to create event.');
            return 0;
        }
    } catch (error) {
        //console.error(`Error at insertEvent --> ${error}`);
        return 0;
    }
};

