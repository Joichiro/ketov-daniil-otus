import i01d from './01d@2x.png';
import i01n from './01n@2x.png';
import i02d from './02d@2x.png';
import i02n from './02n@2x.png';
import i03d from './03d@2x.png';
import i03n from './03n@2x.png';
import i04d from './04d@2x.png';
import i04n from './04n@2x.png';
import i09d from './09d@2x.png';
import i09n from './09n@2x.png';
import i10d from './10d@2x.png';
import i10n from './10n@2x.png';
import i11d from './11d@2x.png';
import i11n from './11n@2x.png';
import i13d from './13d@2x.png';
import i13n from './13n@2x.png';
import i50d from './50d@2x.png';
import i50n from './50n@2x.png';
import notFound from './default.png';

const images = {
  i01d,
  i01n,
  i02d,
  i02n,
  i03d,
  i03n,
  i04d,
  i04n,
  i09d,
  i09n,
  i10d,
  i10n,
  i11d,
  i11n,
  i13d,
  i13n,
  i50d,
  i50n
};

export const getIMG = (img: string) => {
  // @ts-ignore
  if (images[`i${img}`]) {
    // @ts-ignore
    return images[`i${img}`];
  }
  return notFound;
};
