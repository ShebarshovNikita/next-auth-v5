"use server"

import { z } from 'zod'
import { RegisterSchema } from '@/schemas'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedField = RegisterSchema.safeParse(values)

    if (!validatedField.success) {
        return { error: "Invalid Fields" }
    }


    return { success: "Email sent !" }
}