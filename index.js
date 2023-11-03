
import OpenAI from 'openai';

import readline from 'readline'

const openai = new OpenAI({
  apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

const getResponse = async(genres, authors) => {
const response = await openai.chat.completions.create({
model: "gpt-3.5-turbo",
max_tokens: 150,
messages: [{role: "user", content: `recommend some books for someone who loves the following genres: "${genres}" and the following authors: "${authors}"`}]
}).catch((err)=>console.log(err.response));
return response.choices[0].message.content
}

const getGenres = () => {
return new Promise((resolve, reject) => {
rl.question('List your favourite genres with a comma after each (e.g. sci-fi, fantasy..):\n', (answer) => {
resolve(answer)
})})
}

const getAuthors = () => {
return new Promise((resolve, reject) => {
rl.question('List your favourite authors with a comma after each (e.g. phillip k dick, george rr martin..):\n', (answer) => {
resolve(answer)
})
})
}

const run = async() => {
const genres = await getGenres()
const authors = await getAuthors()
rl.close()
console.log(await getResponse(genres, authors))
}

run()