import { GoogleGenerativeAI } from "@google/generative-ai";

<<<<<<< HEAD
interface TodoItems {
    todos: {
        number: number;
        todo: string;
    }[]
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

class GeminiService {
    async getMerlinData({ todos }: TodoItems) {
        const message = "Prioritize the following tasks based on reality: \n" + JSON.stringify(todos) + '\n' + 'just give the array rearrange in response';
=======
const GEMINI_API_KEY = 'AIzaSyDqGNaavyeDZWtVdHx2fOO_YXE0CJ9_cAY'

class GeminiService {
    async getMerlinData(todos: any[]) {
        const todosJoin = todos.map(todo => todo.todo).join(",");
        const message = "Prioritize the following tasks based on reality: " + todosJoin;
>>>>>>> init gemini

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const result = await model.generateContent(message);
        const response = await result.response;

<<<<<<< HEAD
        const data = response?.candidates?.[0]?.content?.parts?.[0]?.text as string;

        return JSON.parse(data) || [];
=======
        return response || [];
>>>>>>> init gemini
    }
}

export default new GeminiService();