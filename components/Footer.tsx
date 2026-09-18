export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto">
      <div className="max-w-5xl mx-auto px-4">
        <p>&copy; {currentYear} Sacrament Meeting Planner. All rights reserved.</p>
      </div>
    </footer>
  );
}