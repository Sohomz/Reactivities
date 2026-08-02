import {z} from 'zod';

export const loginSchema=z.object({
    email: z.email({error: 'Invalid email address'}),
    password: z.string({error: `${'Password'} is required`}).min(6, {error: 'Password must be at least 6 characters'})
});

export type LoginSchema=z.infer<typeof loginSchema>;