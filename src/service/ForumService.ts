import axios from 'axios';
import { Question } from '../models/Question';
import { Category } from '../models/Category';

class ForumService {

    getNewestQuestions(): Question[] {
        return [
            {   
                id: 1,
                userId: 1,
                categoryId: 1,
                title: 'new question',
                description: 'what',
                time: new Date()
            }
        ];
    }

    getQuestionsByCategoryId(id: number): Question[] {
        return [
            {   
                id: 1,
                userId: 1,
                categoryId: 1,
                title: 'new question',
                description: 'what',
                time: new Date()
            }
        ];
    }

    getQuestionById(id: number): Question {
        return {   
                id: 1,
                userId: 1,
                categoryId: 1,
                title: 'new question',
                description: 'what',
                time: new Date()
            };
    }

    getAnswersByQuestionId(id: number) {
        return [
            {
                id: 1,
                userId: 1,
                questionId: 1,
                time: new Date(),
                text: 'yes'
            }
        ]
    }

    getCategories(): Category[] {
        return [
            {
                id: 1,
                name: 'cat 1'
            },
            {
                id: 2,
                name: 'cat 2'
            }
        ];
    }
}

const service = new ForumService();

export default service;
