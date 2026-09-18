import NavLinks from './NavLinks';

export default function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-blue-900 tracking-tight">
            Your Ward Name
          </h1>
          <p className="text-sm text-slate-500 font-medium">{currentDate}</p>
        </div>
        
        <NavLinks />
      </div>
    </header>
  );
}