import Info from '@/components/About/Info';
import Services from '@/components/Services/Services';
import Scene from '@/components/hero/Scene';
import Header from '@/components/header/Header';

export default function HomePage() {
  return (
    <main>
      <Header />
      <Scene />
      <Info />
      <Services />
    </main>
  );
}
