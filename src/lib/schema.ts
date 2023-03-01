import { z } from 'zod'

const imageTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml']

export const loginUserSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Email is invalid' }),
  password: z.string({ required_error: 'Password is required' }).min(8)
})

export const registerUserSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).regex(/^[a-zA-Z0-9]+$/, { message: 'Name is invalid' }).min(2, { message: 'Name is too short' }).max(64, { message: 'Name is too long' }).trim(),
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Email is invalid' }).trim(),
  password: z.string({ required_error: 'Password is required' }).min(8, { message: 'Password is too short' }).regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' }).regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' }).regex(/[0-9]/, { message: 'Password must contain at least one number' }).regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: 'Password must contain at least one special character' }).trim(),
  passwordConfirm: z.string({ required_error: 'Password is required' }).min(8, { message: 'Password is too short' }).regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' }).regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' }).regex(/[0-9]/, { message: 'Password must contain at least one number' }).regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: 'Password must contain at least one special character' }).trim(),
}).superRefine(({ password, passwordConfirm }, ctx) => {
  if (password !== passwordConfirm) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match',
      path: ['password']
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match',
      path: ['passwordConfirm']
    })
  }
})

export const createProjectSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).regex(/^[a-zA-Z0-9]+$/, { message: 'Name is invalid' }).min(2, { message: 'Name is too short' }).max(64, { message: 'Name is too long' }).trim(),
  description: z.string().min(2, { message: 'Description is too short' }).max(64, { message: 'Description is too long' }).trim().optional(),
  url: z.string({ required_error: 'URL is required' }).url({ message: 'URL is invalid' }).min(2, { message: 'URL is too short' }).max(64, { message: 'URL is too long' }).trim(),
  tagline: z.string({ required_error: 'Tagline is required' }).min(2, { message: 'Tagline is too short' }).max(64, { message: 'Tagline is too long' }).trim(),
  user: z.string({ required_error: 'User is required' }),
  thumbnail: z.instanceof(Blob).optional().superRefine((val, ctx) => {
    if (val) {
      if (val.size === 0) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Thumbnail is Invalid' })
      if (val.size > 5242880) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'File is too big' })
      if (!imageTypes.includes(val.type)) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'File is not an image' })
    }
  }),
})

export const updateProjectSchema = createProjectSchema.partial().omit({ user: true })

export const updateProfileSchema = z.object({
  username: z.string({ required_error: 'Username is required' }).regex(/^[a-zA-Z0-9]+$/, { message: 'Username is invalid' }).min(2, { message: 'Username is too short' }).max(64, { message: 'Name is too long' }).trim(),
  avatar: z.instanceof(Blob).optional().superRefine((val, ctx) => {
    if (val) {
      if (val.size === 0) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Avatar is Invalid' })
      if (val.size > 5242880) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'File is too big' })
      if (!imageTypes.includes(val.type)) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'File is not an image' })
    }
  }),
})
export const updateEmailSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Email is invalid' }).trim(),
})
export const updateNameSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).regex(/^[a-zA-Z0-9]+$/, { message: 'Name is invalid' }).min(2, { message: 'Name is too short' }).max(64, { message: 'Name is too long' }).trim(),
})
export const updatePasswordSchema = z.object({
  oldPassword: z.string({ required_error: 'Password is required' }).min(8, { message: 'Password is too short' }).regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' }).regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' }).regex(/[0-9]/, { message: 'Password must contain at least one number' }).regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: 'Password must contain at least one special character' }).trim(),
  password: z.string({ required_error: 'Password is required' }).min(8, { message: 'Password is too short' }).regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' }).regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' }).regex(/[0-9]/, { message: 'Password must contain at least one number' }).regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: 'Password must contain at least one special character' }).trim(),
  passwordConfirm: z.string({ required_error: 'Password is required' }).min(8, { message: 'Password is too short' }).regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' }).regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' }).regex(/[0-9]/, { message: 'Password must contain at least one number' }).regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: 'Password must contain at least one special character' }).trim(),
}).superRefine(({ password, passwordConfirm }, ctx) => {
  if (password !== passwordConfirm) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match',
      path: ['password']
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match',
      path: ['passwordConfirm']
    })
  }
})
export const resetPasswordSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Email is invalid' }).trim(),
})
