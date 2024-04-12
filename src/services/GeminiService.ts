import { GoogleGenerativeAI } from "@google/generative-ai";
interface TodoItems {
    todos: {
        number: number;
        todo: string;
    }[]
}
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
class GeminiService {
    async getMerlinData({ todos }: TodoItems) {
        const todosJoin = todos.map(todo => todo.number + ': ' + todo.todo).join("\n");
        const message = "Prioritize the following tasks based on reality: \n" + todosJoin;

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const result = await model.generateContent(message);
        const response = await result.response;

        const data = response?.candidates?.[0]?.content?.parts?.[0]?.text as string;

        return JSON.parse(data) || [];
    }
}

export default new GeminiService();