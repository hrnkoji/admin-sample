// src/mocks/handlers.js
import { rest } from 'msw';

const users = [
  { id: '01', name: '田中太郎', email: 'xxx1@xxx.com', description: 'ユーザー1' },
  { id: '02', name: '鈴木二郎', email: 'xxx2@xxx.com', description: 'ユーザー2' },
  { id: '03', name: '山田花子', email: 'xxx3@xxx.com', description: 'ユーザー3' },
];

export const handlers = [
  // Handles a GET /user request
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json(users));
  }),

  rest.get('/api/user/:id', (req, res, ctx) => {
    const id = req.params.id;
    const user = users.filter(user => user.id === id);
    return res(ctx.json(user[0]));
  }),
];
