import * as pdfjsLib from "pdfjs-dist";

// Set the worker source dynamically
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

export const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdfDoc.numPages;
    let extractedText = "";

    for (let i = 1; i <= numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        extractedText += `${pageText}\n`;
    }

    return extractedText;
};
