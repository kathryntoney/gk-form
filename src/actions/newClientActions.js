
export const addNewClient = (client, clientID) => {
    console.log(client, clientID)
    return {
        type: "ADD_NEW_CLIENT",
        data: {
            clientID: clientID,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            phone: client.phone,
            language: client.language,
            pronouns: client.pronouns,
            referName: client.referName,
            referEmail: client.referEmail,
            referPhone: client.referPhone,
            informed: client.informed
        }
    }
}