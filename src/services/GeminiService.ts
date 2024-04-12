import { GoogleGenerativeAI } from "@google/generative-ai";

interface TodoItems {
    todos: {
        number: number;
        todo: string;
    }[]
}

const GEMINI_API_KEY = 'AIzaSyDqGNaavyeDZWtVdHx2fOO_YXE0CJ9_cAY'

class GeminiService {
    async getMerlinData({ todos }: TodoItems) {
        const todosJoin = todos.map(todo => todo.number + ': ' + todo.todo).join("\n");
        const message = "Prioritize the following tasks based on reality: \n" + todosJoin;

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const result = await model.generateContent(message);
        const response = await result.response;

        return response || [];
    }
}

export default new GeminiService();