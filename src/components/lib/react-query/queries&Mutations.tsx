import {useMutation, useQuery} from "@tanstack/react-query";
import {getCategories, getQuizQuestions} from "../api.tsx";
import {QUERY_KEYS} from "./QueryKeys.tsx";


export const useGetQuizQuestions = () => {
    return useMutation({
        mutationFn: ({ amount, category, difficulty, type, }: { amount: number, category:number, difficulty:string, type: string}) =>
            getQuizQuestions(amount, category, difficulty, type)
    });
};


// export const useGetQuizQuestions = (amount:number, category:number, difficulty:string, type:string) => {
//     return useQuery({
//         queryFn: () => getQuizQuestions(amount, category, difficulty, type),
//         queryKey: [QUERY_KEYS.GET_QUIZ_QUESTIONS]
//     })
// }

export const useGetCategories = () => {
    return useQuery({
        queryFn: () => getCategories(),
        queryKey: [QUERY_KEYS.GET_CATEGORIES]
    })
}