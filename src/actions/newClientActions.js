import { v4 as uuidv4 } from 'uuid';

export const addNewClient = (firstName, lastName, email, phone, language, pronouns, referName, referEmail, referPhone, informed) => {
    return {
        type: "ADD_NEW_CLIENT",
        data: {
            id: uuidv4(),
            firstName,
            lastName,
            email,
            phone,
            language,
            pronouns,
            referName,
            referEmail,
            referPhone,
            informed
        }
    }
}