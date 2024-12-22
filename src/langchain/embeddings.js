import { OpenAIEmbeddings } from "@langchain/openai";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebaseConfig";



export const embeddings = new OpenAIEmbeddings({
    openAIApiKey: "Bearer sk- proj - Ipwhh6y5svI6g6jpGAD2qGLu1K2zRFP3S0QFTT3zP_qWO4Udv - yg8ccNsILjdZ3e6Pn6dTD6raT3BlbkFJr8BMKiGAhpDYro37bpQLGCofKhKhOj1JOAYynLXiRWUcKbeR5kIbCQZvS474YQThSyAXnoFgsA",

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
