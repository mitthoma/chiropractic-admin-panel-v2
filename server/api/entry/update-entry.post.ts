import { updateEntry } from "~/server/repositories/entryRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    console.log('body incoming is ', body);

    // Change 'Left' to 'l', 'Right' to 'r' and 'Both' to 'b'
    if (body.side === 'Left') {
        body.side = 'l';
    } else if (body.side === 'Right') {
        body.side = 'r';
    } else if (body.side === 'Both') {
        body.side = 'b';
    }

    // Define all the boolean fields
    const booleanFields = [
        'sublux',
        'muscleSpasm',
        'triggerPoints',
        'tenderness',
        'numbness',
        'edema',
        'swelling',
        'reducedMotion',
        // Add other boolean fields here...
    ];

    // Check if any of the boolean fields are null or string 'true' or 'false'
    // and make them boolean true, false or null if they are
    booleanFields.forEach(field => {
        if (body[field] === null) {
            body[field] = false;
        } else if (typeof body[field] === 'string') {
        
            if (body[field].toLowerCase() === 'true') {
                body[field] = true;
            } else if (body[field].toLowerCase() === 'false') {
                body[field] = false;
            }
        }
    });

    const response = await updateEntry(body.id, body);
    return response;
});