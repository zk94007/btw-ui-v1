var imaps =  require("imap-simple");

var EmailUtils =function() {

     this.getConfirmationEmail = async function (subject) {

        console.log("UserEmail: ", browser.userEmail);
        console.log("userPassword: ", browser.userPassword);

        let configEmail = {
            imap: {
                user: browser.userEmail,
                password: browser.userPassword,
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                authTimeout: 30000,
                keepAlive: false,
                tlsOptions: {
                    rejectUnauthorized: false
                }
            }
        };

        let connection = await imaps.connect(configEmail);
        let inbox = await connection.openBox('INBOX', false);

        var query = [['from', 'doNotREPLY@bethewave.vote'], ['UNSEEN'], ['subject', subject]];
        var fetchOptions = { bodies: ['TEXT'], struct: true };

        try {
            let messages = await connection.search(query, fetchOptions);

            console.log("Message Size: " + messages.length)
            var message = await messages[0];

            await connection.addFlags(message.attributes.uid, "\Seen");

            var parts = await imaps.getParts(message.attributes.struct);
        }
        catch (error) {
            console.error(error);

          /**  connection.imap.closeBox(true, (err) => { //Pass in false to avoid delete-flagged messages being removed
                if (err){
                    console.log(err);
                }
                connection.end();
            })**/
            

            return await "No new message received";
        }

        const getData = async () => {
            return await Promise.all(parts.map(async part => {
                let partData = await connection.getPartData(message, part);
                let emailcontent;
                //Display e-mail body
                if (part.disposition == null && part.encoding != "base64") {
                    // console.log(partData);
                    if (extractData(partData, "<a href", "class=").indexOf("http") > 0) {
                        console.log("Verfication URL:" + extractData(partData, "<a href=", "class="));
                        emailcontent = await extractData(partData, "<a href=", "class=");
                        return await emailcontent;
                    }
                }
            }));

        }
        return await getData();
    }

    this.getConfirmationEmailByCredentials = async function (email, password, subject) {

        console.log("UserEmail: ",email);
        console.log("userPassword: ", password);

        let configEmail = {
            imap: {
                user: email,
                password: password,
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                authTimeout: 3000,
                keepAlive: false,
                tlsOptions: {
                    rejectUnauthorized: false
                }
            }
        };

        let connection = await imaps.connect(configEmail);
        let inbox = await connection.openBox('INBOX', false);

        var query = [['from', 'doNotREPLY@bethewave.vote'], ['UNSEEN'], ['subject', subject]];
        var fetchOptions = { bodies: ['TEXT'], struct: true };

        try {
            let messages = await connection.search(query, fetchOptions);

            console.log("Message Size: " + messages.length)
            var message = messages[0];

            await connection.addFlags(message.attributes.uid, "\Seen");

            var parts = await imaps.getParts(message.attributes.struct);

           // await connection.addFlags(message.attributes.uid, "\Deleted")
        }
        catch (error) {
            console.error(error);

          /**  connection.imap.closeBox(true, (err) => { //Pass in false to avoid delete-flagged messages being removed
                if (err){
                    console.log(err);
                }
                connection.end();
            })**/
            

            return await "No new message received";
        }

        const getData = async () => {
            return await Promise.all(parts.map(async part => {
                let partData = await connection.getPartData(message, part);
                let emailcontent;
                //Display e-mail body
                if (part.disposition == null && part.encoding != "base64") {
                    // console.log(partData);
                    if (extractData(partData, "<a href", "class=").indexOf("http") > 0) {
                        console.log("Verfication URL:" + extractData(partData, "<a href=", "class="));
                        emailcontent = await extractData(partData, "<a href=", "class=");
                        return await emailcontent;
                    }
                }
            }));

        }
        return await getData();
    }


     var extractData = function (data, startStr, endStr) {
        let subStrStart = data.indexOf(startStr) + 1 + startStr.length
        return data.substring(subStrStart,
            subStrStart + data.substring(subStrStart).indexOf(endStr) - 2);

    }
}
module.exports = EmailUtils;

