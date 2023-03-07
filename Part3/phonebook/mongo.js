const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Require at least 1 arguements as following: <password> | <name> <phone-number>');
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://admin:${password}@cluster0.dmfnmzt.mongodb.net/longevity`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const PhonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Phonebook = mongoose.model('Phonebook', PhonebookSchema);

if (process.argv.length === 3) {
    getAllPhoneBookEntry();
} else {
    saveNewPhoneBookEntry(process.argv[3], process.argv[4]);
}

function getAllPhoneBookEntry() {
    let result = 'phonebook: \n';
    Phonebook.find({})
        .then(queryResult => {
            mongoose.connection.close();
            queryResult.map(phonebook => {
                result = result.concat(`${phonebook.name} ${phonebook.number}\n`);
            });
            console.log(result);
        });
}

function saveNewPhoneBookEntry(name, number) {
    const phonebook = new Phonebook({
        name: name,
        number: number,
    });

    phonebook.save().then(result => {
        mongoose.connection.close();
        console.log(`added ${result.name} number ${result.number} to phonebook`);
    })
}