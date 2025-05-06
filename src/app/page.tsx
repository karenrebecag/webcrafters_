import Info from '@/components/Home/about/Info';
import HomeBanner from '@/components/Home/hero/HomeBanner';
import WhiteSection from '@/components/Home/whiteSection/WhiteSection';
import Header from '@/components/Global/header/Header';


export default function HomePage() {
  return (
    <main>
      <Header/>
      <HomeBanner />
      <Info />
      <WhiteSection/>
    </main>
  );
}
