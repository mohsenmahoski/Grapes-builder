import loadComponents from "./components";
import { v4 as uuidv4 } from "uuid";

const loadBlocks = (editor, opts = {}) => {
  const bm = editor.BlockManager;
  const style = `
       <style>
           .swiper{
             position: absolute;
             left:0;
             top: 0;
             width: 100%;
             height: 100%;
           }
            .swiper-container {
                width: 100%;
                height: 100%;
            }
            .swiper-slide {
                text-align: center;
                font-size: 18px;
                background: #fff;

                /* Center slide text vertically */
                display: -webkit-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                -webkit-justify-content: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                -webkit-align-items: center;
                align-items: center;
            }

            .swiper-slide img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
       </style>
  `;
  bm.add(opts.name, {
    label: `
          <i class="fa fa-arrows-h" style="font-size:60px;"></i>
          <div class="gjs-block-label">
            ${opts.label}
          </div>
        `,
    category: opts.category,
    content: () => {
      const uniqueId = `gs-${uuidv4()}`;  // Generate unique ID
      opts["id"] = uniqueId;
      loadComponents(editor, opts);
      return `
        <div class="swiper" style="width: 100%; height: 100%; background: red; padding: 10px;">
            <div class="swiper-container ${uniqueId} mySwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">Slide 1</div>
                    <div class="swiper-slide">Slide 2</div>
                    <div class="swiper-slide">Slide 3</div>
                    <div class="swiper-slide">Slide 4</div>
                    <div class="swiper-slide">Slide 5</div>
                    <div class="swiper-slide">Slide 6</div>
                    <div class="swiper-slide">Slide 7</div>
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-scrollbar"></div>
            </div>
        </div>
        ${style}
      `;
    },
  });
};
export default loadBlocks;
