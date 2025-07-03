import Moon from '@/components/Moon';

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen relative">
      <Moon />
      <div className="ml-auto w-1/2 px-10 py-20 space-y-48">
        <section className="h-screen flex items-center">
          <h1 className="text-5xl font-bold">Welcome to My Moon Base</h1>
        </section>
        <section className="h-screen flex items-center">
          <p className="text-3xl">Scroll down to rotate the moon 🌙</p>
        </section>
        <section className="h-screen flex items-center">
          <p className="text-3xl">More cosmic content coming soon...</p>
        </section>
      </div>
    </div>
  );
}
