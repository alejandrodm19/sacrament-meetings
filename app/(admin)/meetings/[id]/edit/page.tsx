import { getMeetingById } from '@/lib/meetings-db';
import { notFound } from 'next/navigation';
import EditMeetingForm from '@/components/EditMeetingForm';

export default async function EditMeetingPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = Number(params.id);
  
  const meeting = await getMeetingById(id);
  
  if (!meeting) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Meeting</h1>
      {}
      <EditMeetingForm meeting={meeting} />
    </div>
  );
}