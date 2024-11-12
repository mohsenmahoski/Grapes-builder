const loadComponents = (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType("default");
  const defaultView = defaultType.view;

  dc.addType(opts.name, {
    model: {
      defaults: {
        traits: [
          {
            type: "checkbox",
            name: "dynamicProgress",
            label: "Dynamic Progress",
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
              new Swiper(`.${props.id}`, {
                spaceBetween: 30,
                centeredSlides: true,
                autoplay: {
                  delay: 2500,
                  disableOnInteraction: false,
                },
                pagination: {
                  el: `.swiper-pagination`,
                  clickable: true,
                  dynamicBullets: false,
                  type: "bullets",
                },
                navigation: {
                  nextEl: `.swiper-button-next`,
                  prevEl: `.swiper-button-prev`,
                },
              });
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
        'script-props': ['id'],
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
      init() {
        this.listenTo(this.model, "change:dynamicProgress", () => {
          console.log("dynamicProgress", this.model.get("dynamicProgress"));
        });
        this.listenTo(this.model, "change:progressType", () => {
          console.log("progressType", this.model.get("progressType"));
        });
      },
    }),
  });
};

export default loadComponents;
