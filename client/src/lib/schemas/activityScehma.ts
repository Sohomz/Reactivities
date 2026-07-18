import { z } from 'zod';

const requiredField=((reqFld:string)=>{
    return z.string({ error:`${reqFld} is required`}).min(1, `${reqFld} is required`);
})
export const activitySchema = z.object({
    title: requiredField('Title'),
    description: requiredField('Description'),
    category: requiredField('Category'),
    date: requiredField('Date'),
    city: requiredField('City'),
    venue: requiredField('Venue')
});

export type ActivitySchema = z.infer<typeof activitySchema>;