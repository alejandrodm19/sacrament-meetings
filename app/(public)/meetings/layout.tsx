export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="meetings-section">
      {/* Si necesitaras un menú secundario solo para reuniones, iría aquí */}
      {children}
    </div>
  );
}