import RNFS from 'react-native-fs';
import {PDFDocument, degrees} from 'pdf-lib';

export const convert2PDF = async images => {
  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < images.length; i++) {
    const page = pdfDoc.addPage();
    const jpgImageBytes = await RNFS.readFile(images[i], 'base64');
    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
    const jpgDims = jpgImage.scale(0.25);

    page.drawImage(jpgImage, {
      x: 10,
      y: 800,
      width: jpgDims.width,
      height: jpgDims.height,
      rotate: degrees(-90),
    });
  }
  return pdfDoc.saveAsBase64({dataUri: true});
};
