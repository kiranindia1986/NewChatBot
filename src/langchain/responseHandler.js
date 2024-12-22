import { OpenAI } from "@langchain/openai";
import { embeddings } from "./embeddings";
import { getDocs, collection } from "firebase/firestore";
import db from "../firebaseConfig";
import { cosineSimilarity } from "../utils/cosineSimilarity"; // Helper function for similarity



const llm = new OpenAI({
    openAIApiKey: "Bearer sk- proj - Ipwhh6y5svI6g6jpGAD2qGLu1K2zRFP3S0QFTT3zP_qWO4Udv - yg8ccNsILjdZ3e6Pn6dTD6raT3BlbkFJr8BMKiGAhpDYro37bpQLGCofKhKhOj1JOAYynLXiRWUcKbeR5kIbCQZvS474YQThSyAXnoFgsA",
    temperature: 0,
});

export const respondToQuestion = async (query) => {
    const queryVector = await embeddings.embedQuery(query);
    const vectorsSnapshot = await getDocs(collection(db, "vectors"));

    let closestMatch = null;
    let highestSimilarity = -Infinity;

    vectorsSnapshot.forEach((doc) => {
        const { vector, text } = doc.data();
        const similarity = cosineSimilarity(queryVector, vector);

        if (similarity > highestSimilarity) {
            highestSimilarity = similarity;
            closestMatch = text;
        }
    });

    if (closestMatch) {
        const prompt = `Based on the following information: "${closestMatch}", answer the question: "${query}"`;
        return await llm.call(prompt);
    } else {
        return "No relevant information found.";
    }
};
