import { Fragment } from 'react';
import Lightbox, { PluginProps } from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";

// Import optional lightbox plugins
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import "yet-another-react-lightbox/styles.css";

export const Lightboxcomponent = ({
  open,
  index,
  scroll = true, 
  on = true, 
  style = {},
  mainClass = '',
  portals = false,
  Controller,
  plugins = [Fullscreen, Slideshow, Thumbnails, Zoom] as unknown as PluginProps, 
  label = { zoomIn: 'Zoom In', zoomOut: 'Zoom Out' }, 
  toolbar = true,
  Carousel = true,
  animation = 'fade', 
  slides,
  close, // Function to close the lightbox
  zoom = { maxZoomPixelRatio: 10, scrollToZoom: true } // Default zoom settings
}: any) => {
  return (
    <Fragment>
      <Lightbox
        open={open}
        index={index}
        noScroll={{ disabled: !scroll }} // Adjusted to pass an object
        on={on}
        styles={style}
        controller={Controller}
        portal={portals}
        className={mainClass}
        plugins={plugins}
        zoom={zoom} // Pass zoom prop
        labels={label}
        toolbar={toolbar}
        carousel={Carousel}
        animation={animation}
        slides={slides}
        close={close}
      />
    </Fragment>
  );
};
