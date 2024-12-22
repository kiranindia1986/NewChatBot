import { OpenAIEmbeddings } from "@langchain/openai";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebaseConfig";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

if (!apiKey) {
    throw new Error("OpenAI API Key not found. Ensure REACT_APP_OPENAI_API_KEY is set.");
}

export const embeddings = new OpenAIEmbeddings({
    openAIApiKey: apiKey,
});

export const storeTextVector = async (text, metadata) => {
    const vector = await embeddings.embedQuery(text);

    await addDoc(collection(db, "vectors"), {
        text,
        vector,
        metadata,
    });

    console.log("Text stored successfully:", text);
};
