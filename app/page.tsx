import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      
      {}
      <Image 
        src="/hero.jpg"           
        alt="Sacrament Meeting"   
        width={800}               
        height={400}              
        className="rounded-2xl shadow-md mb-10 object-cover"
        priority={true}           
      />
      
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
        Plan and Organize Your Meetings
      </h2>
      
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
        A simple tool to manage your wards sacrament meetings. 
        Keep track of speakers, hymns, and announcements all in one place.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
        <Link 
          href="/meetings" 
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-sm transition-colors text-center"
        >
          View All Meetings
        </Link>
      </div>

    </div>
  );
}