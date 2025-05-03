import Info from '@/components/About/Info';
import Services from '@/components/Services/Services';
import Scene from '@/components/hero/Scene';

export default function HomePage() {
  return (
    <main>
      <Scene/>
      <Info />
      <Services />
    </main>
  );
}