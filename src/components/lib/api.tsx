import axios from "axios";

//function to fetch quizzes according to options picked
export const getQuizQuestions = async (amount: number, category: number, difficulty: string, type: string) => {
        try {
                type === "Multiple Choice" ? type = "multiple" : type = 'boolean'
                const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
                return response.data.results;
        } catch (error) {
                throw new Error("Error fetching quiz questions: " + error);
        }
};


//function to fetch quiz categories for quiz function
export const getCategories = async () => {
        const categories = await axios.get('https://opentdb.com/api_category.php')
        return categories.data
}
