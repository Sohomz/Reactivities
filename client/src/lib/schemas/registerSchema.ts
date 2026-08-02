import {email, z} from "zod";

export const registerSchema = z.object({
    email: email(),
    displayName: z.string({error: `${'Display Name'} is required`}),
    password: z.string({error: `${'Password'} is required`})
});

export type RegisterSchema = z.input<typeof registerSchema>;