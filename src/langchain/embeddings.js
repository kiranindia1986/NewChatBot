import { OpenAIEmbeddings } from "@langchain/openai";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebaseConfig";



export const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
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
