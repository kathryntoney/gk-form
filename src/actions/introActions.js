export const addNewClient = (id, firstName, lastName, email, phone, language, pronouns, referName, referEmail, referPhone, informed) => {
    return {
        type: "ADD_NEW_CLIENT",
        data: {
            id: crypto.randomUUID(),
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