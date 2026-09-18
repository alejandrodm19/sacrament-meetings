import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  // Aquí sí extraemos el id esperando la promesa
  const { id } = await params;
  
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    return NextResponse.json({ error: 'Reunión no encontrada' }, { status: 404 });
  }

  return NextResponse.json(meeting, { status: 200 });
}