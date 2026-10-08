'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { 
  addMeeting, 
  updateMeeting as dbUpdateMeeting, 
  deleteMeeting as dbDeleteMeeting 
} from './meetings-db';

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingPrayer?: string[];
    closingPrayer?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  date: z.string().min(1, { message: "Please select a date." }),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special'], {
    message: "Please select a valid meeting type.",
  }),
  presiding: z.string().min(1, { message: "Presiding leader is required." }),
  conducting: z.string().min(1, { message: "Conducting leader is required." }),
  openingPrayer: z.string().min(1, { message: "Opening prayer is required." }),
  closingPrayer: z.string().min(1, { message: "Closing prayer is required." }),
});

// --- SERVER ACTIONS ---

export async function createMeeting(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingPrayer: formData.get('openingPrayer'),
    closingPrayer: formData.get('closingPrayer'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Meeting.',
    };
  }

  const newMeeting = {
    ...validatedFields.data,
    stakeBusiness: false,
    announcements: [],
    openingHymn: { number: 0, title: 'TBD' },
    sacramentHymn: { number: 0, title: 'TBD' },
    closingHymn: { number: 0, title: 'TBD' },
    wardBusiness: [],
    speakers: []
  };

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await addMeeting(newMeeting as any);
  } catch (error) {
    return { message: 'Database Error: Failed to Create Meeting.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(id: number, prevState: State, formData: FormData): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingPrayer: formData.get('openingPrayer'),
    closingPrayer: formData.get('closingPrayer'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Meeting.',
    };
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await dbUpdateMeeting(id, validatedFields.data as any);
  } catch (error) {
    return { message: 'Database Error: Failed to Update Meeting.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(id: number) {
  try {
    await dbDeleteMeeting(id);
    revalidatePath('/meetings');
  } catch (error) {
    throw new Error('Database Error: Failed to Delete Meeting.');
  }
}

// --- AUTH ACTIONS ---

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logOut() {
  await signOut({ redirect: false });
  return true;
}