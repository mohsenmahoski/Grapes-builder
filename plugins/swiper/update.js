
export const getProps = (model,propNames) => {
    const props = {};
    for(const propName of propNames){
        props[propName] = model.get(propName);
    }
    return props;
}
export const updateScript = (editor, uniqueId, props) => {
    const block = editor.getWrapper().find(`.${uniqueId}`)[0];
    if (block) {
       block.components(`
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
                ${props.navigation ? `
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>  
                ` : ""}
                <div class="swiper-scrollbar"></div>
      `);
    }
}