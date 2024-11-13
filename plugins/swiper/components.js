import { getProps } from "./update";

const loadComponents = (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;
  const scriptProps = ["id", "pagination", "navigation", "progressType"];
  dc.addType(opts.name, {
    model: {
      defaults: {
        traits: [
          {
            type: "checkbox",
            name: "navigation",
            label: "navigation",
            value: true,
            changeProp: 1,
          },
          {
            type: "checkbox",
            name: "pagination",
            label: "enable pagination",
            value: true,
            changeProp: 1,
          },
          {
            type: "select",
            name: "progressType",
            label: "Progress Type",
            changeProp: 1,
            options: [
              { value: "bullets", name: "Bullets" },
              { value: "fraction", name: "Fraction" },
              { value: "progressbar", name: "Progressbar" },
            ],
          },
        ],
        script: (props) => {
          const initLib = () => {
            // Check if a Swiper instance already exists and destroy it
            if (window[`${props.id}`]) {
              window[`${props.id}`].destroy(true, true);
            }
           
            const options = {
              spaceBetween: 30,
              centeredSlides: true,
              autoplay: {
                delay: 2500,
                disableOnInteraction: false,
              },
            };

            if (props.pagination) {
              options.pagination = {
                el: `.swiper-pagination`,
                clickable: true,
              };
              if(props.progressType){
                options.pagination.type = props.progressType;
              }
            }
            if (props.navigation) {
              options.navigation = {
                nextEl: `.swiper-button-next`,
                prevEl: `.swiper-button-prev`,
              };
            }
            window[`${props.id}`] = new Swiper(`.${props.id}`, options);
          };
          if (typeof Swiper === "undefined") {
            const script = document.createElement("script");
            script.onload = initLib;
            script.src = "http://localhost:3000/swiper-bundle.min.js";
            document.body.appendChild(script);
          } else {
            initLib();
          }
        },
        id: opts.id,
        pagination: true,
        navigation: true,
        progressType: "bullets",
        "script-props": scriptProps,
      },
    },
    isComponent: (el) => {
      if (el.className && el.className.includes("swiper")) {
        return {
          type: opts.name,
        };
      }
    },
    view: defaultView.extend({
      init({ model }) {
        this.listenTo(model, "change:navigation", () => {
            const props = getProps(model, scriptProps);
            opts.updateScript(editor, model.get("id"), props);
        });
      },
    }),
  });
};

export default loadComponents;
