'use client';

import { useActionState } from 'react';
import { updateMeeting, State } from '@/lib/actions';
import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';

export default function EditMeetingForm({ meeting }: { meeting: SacramentMeeting }) {
  const initialState: State = { message: null, errors: {} };
  
  // Como exige tu asignación, usamos .bind para pasarle el ID a la acción
  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);
  const [state, formAction, isPending] = useActionState(updateMeetingWithId, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {/* Date Field */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input 
          type="date" 
          id="date" 
          name="date" 
          defaultValue={meeting.date as string}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          aria-describedby="date-error"
        />
        <div id="date-error" aria-live="polite" aria-atomic="true">
          {state.errors?.date?.map((error: string) => (
            <p className="text-red-500 text-sm mt-1" key={error}>{error}</p>
          ))}
        </div>
      </div>

      {/* Meeting Type Field */}
      <div>
        <label htmlFor="meetingType" className="block text-sm font-medium text-gray-700">Meeting Type</label>
        <select 
          id="meetingType" 
          name="meetingType" 
          defaultValue={meeting.meetingType}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          aria-describedby="type-error"
        >
          <option value="">Select a type...</option>
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
          <option value="special">Special</option>
        </select>
        <div id="type-error" aria-live="polite" aria-atomic="true">
          {state.errors?.meetingType?.map((error: string) => (
            <p className="text-red-500 text-sm mt-1" key={error}>{error}</p>
          ))}
        </div>
      </div>

      {/* Presiding Field */}
      <div>
        <label htmlFor="presiding" className="block text-sm font-medium text-gray-700">Presiding</label>
        <input 
          type="text" 
          id="presiding" 
          name="presiding" 
          defaultValue={meeting.presiding}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          aria-describedby="presiding-error"
        />
        <div id="presiding-error" aria-live="polite" aria-atomic="true">
          {state.errors?.presiding?.map((error: string) => (
            <p className="text-red-500 text-sm mt-1" key={error}>{error}</p>
          ))}
        </div>
      </div>

      {/* Conducting Field */}
      <div>
        <label htmlFor="conducting" className="block text-sm font-medium text-gray-700">Conducting</label>
        <input 
          type="text" 
          id="conducting" 
          name="conducting" 
          defaultValue={meeting.conducting}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          aria-describedby="conducting-error"
        />
        <div id="conducting-error" aria-live="polite" aria-atomic="true">
          {state.errors?.conducting?.map((error: string) => (
            <p className="text-red-500 text-sm mt-1" key={error}>{error}</p>
          ))}
        </div>
      </div>

      {/* Opening Prayer Field */}
      <div>
        <label htmlFor="openingPrayer" className="block text-sm font-medium text-gray-700">Opening Prayer</label>
        <input 
          type="text" 
          id="openingPrayer" 
          name="openingPrayer" 
          defaultValue={meeting.openingPrayer}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          aria-describedby="opening-prayer-error"
        />
        <div id="opening-prayer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.openingPrayer?.map((error: string) => (
            <p className="text-red-500 text-sm mt-1" key={error}>{error}</p>
          ))}
        </div>
      </div>

      {/* Closing Prayer Field */}
      <div>
        <label htmlFor="closingPrayer" className="block text-sm font-medium text-gray-700">Closing Prayer</label>
        <input 
          type="text" 
          id="closingPrayer" 
          name="closingPrayer" 
          defaultValue={meeting.closingPrayer}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          aria-describedby="closing-prayer-error"
        />
        <div id="closing-prayer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.closingPrayer?.map((error: string) => (
            <p className="text-red-500 text-sm mt-1" key={error}>{error}</p>
          ))}
        </div>
      </div>

      {/* General Form Error Message */}
      {state.message && (
        <p className="text-red-500 font-medium" aria-live="polite">{state.message}</p>
      )}

      <div className="flex gap-4 mt-6">
        <button 
          type="submit" 
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isPending ? 'Saving...' : 'Update Meeting'}
        </button>
        <Link href="/meetings" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
          Cancel
        </Link>
      </div>
    </form>
  );
}