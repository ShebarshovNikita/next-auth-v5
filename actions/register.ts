"use server"

import { db } from '@/lib/db'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { RegisterSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedField = RegisterSchema.safeParse(values)

    if (!validatedField.success) {
        return { error: "Invalid Fields" }
    }

    const { email, password, name } = validatedField.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email already in use !" }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    //Todo: send verif. email

    return { success: "Email sent !" }
}