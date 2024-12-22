import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { addDoc, collection } from "firebase/firestore";
import db from "./firebaseConfig";

const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

async function storeTextVector(text, metadata) {
    // Generate embedding for the text
    const vector = await embeddings.embedQuery(text);

    // Store in Firebase
    const docRef = await addDoc(collection(db, "vectors"), {
        text,
        vector,
        metadata,
    });

    console.log("Vector stored with ID:", docRef.id);
}
