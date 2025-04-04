const model = require('../config/geminiConfig'); // Ensure geminiConfig exports a valid model instance

const ChatController = async (req, res) => {
    try {
        const { question } = req.body;

        let fullPrompt = `You are an AI tutor helping students by answering their doubts in a simple and easy-to-understand manner. Your responses should include a clear explanation and a relatable example.

        Student's question: ${question}

        Respond in a structured JSON format:
        {
            "explanation": "Detailed but simple explanation of the concept.",
            "example": "A practical or real-world example to clarify the concept."
        }
        Do not include any extra text, comments, or formatting outside of this JSON structure.`;

        // Generate content using the AI model
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = await response.text();

        // Parse and clean up the response
        let structuredResponse;
        try {
            const cleanedText = text
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();

            structuredResponse = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error("Error parsing AI response:", parseError);
            throw new Error("The AI response was not in the expected JSON format.");
        }

        res.json({
            message: "Doubt resolved successfully.",
            data: structuredResponse
        });

    } catch (error) {
        console.error("Error in ChatController:", error);
        res.status(500).json({
            error: error.message || "Failed to resolve the student's doubt."
        });
    }
};

module.exports = { ChatController };
