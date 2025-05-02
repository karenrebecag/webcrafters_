import '../../variables.css';
import '../../texts.css';
import './info.css'
import WhiteButton from '../buttons/WhiteButton';
import ChromeButton from '../buttons/ChromeButton';
import Marquee from './Marquee';
import Numbers from './Numbers';

import BlobsBackground from '../BlobsBackground';

export default function AboutIntro() {
  return (
      <BlobsBackground>
            <div className='MainContainer'>

        <div className="MainInfoContainer">
          <div className='TextSubContainer'>
            <div className='ColTitle'>
                <span className='RedDot'>• </span>
                <span className="MiniText">About Us</span>
              </div>
              <span className="HeadingWhite">Crafting the future, </span>
              <span className="HeadingRed">one pixel at time.</span>
          </div>
          <div className="MainInfoSubcontainer">
            <p className="ParagraphWhite">
            Our agency stands at the intersection of technology and creativity, serving as a beacon for businesses seeking to navigate the complexities of the digital age. Here, innovation is not just about keeping up with trends but setting them. Each project at WebCrafters is a testament to our ability to foresee market shifts and adapt technologies that define the future of digital interactions.
              <br/> <br/>
            We specialize in dynamic web development, creating websites that are not only visually captivating but also functionally superior. Our web solutions are crafted with the latest technologies to ensure seamless performance across all platforms and devices. Whether it’s crafting a small business website or developing complex enterprise solutions, we focus on delivering a user experience that is intuitive and engaging.
            </p>

            <WhiteButton label="Get Started" />
  
          </div>
        </div>

          <Marquee />
          <div className='Center'>
            <ChromeButton iconSrc="/assets/icons/ArrowDown.svg" />
          </div>
          <Numbers />
        </div>
      </BlobsBackground>
  );
}