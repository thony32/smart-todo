import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = 'AIzaSyDqGNaavyeDZWtVdHx2fOO_YXE0CJ9_cAY'

class GeminiService {
    async getMerlinData(todos: any[]) {
        const todosJoin = todos.map(todo => todo.todo).join(",");
        const message = "Prioritize the following tasks based on reality: " + todosJoin;

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const result = await model.generateContent(message);
        const response = await result.response;

        return response || [];
    }
}

export default new GeminiService();