import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { addDoc, collection } from "firebase/firestore";
import db from "./firebaseConfig";

const embeddings = new OpenAIEmbeddings({
    openAIApiKey: "Bearer sk- proj - Ipwhh6y5svI6g6jpGAD2qGLu1K2zRFP3S0QFTT3zP_qWO4Udv - yg8ccNsILjdZ3e6Pn6dTD6raT3BlbkFJr8BMKiGAhpDYro37bpQLGCofKhKhOj1JOAYynLXiRWUcKbeR5kIbCQZvS474YQThSyAXnoFgsA",
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
