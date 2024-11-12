import { JSDOM } from "jsdom";
import React from 'react'
import axios from "axios";
import grapesjs from 'grapesjs';

const Preview = async() => {
  const editor = grapesjs.init({ headless: true});
  editor.DomComponents.addType('customBlock', {
    model: {
      defaults: {
        type: "customBlock",
        tagName: "custom-block",
        components: `<div class="custom-block">Loading data...</div>`
      },
    },
    view: {
      // Custom view logic if needed
    },
  });
  const response = await axios.get("http://localhost:3000/api");

  editor.loadProjectData(response.data);
 
  
  const html = editor.getHtml();
  const css = editor.getCss();
  const sanitizeHtml = html.replace(`<body`, '<div').replace(`</body>`, '</div>');
  
  const fullHtml = `
    <style>${css}</style>
    ${sanitizeHtml}
  `;


  const dom = new JSDOM(`${fullHtml}`);

  const elements = dom.window.document.getElementsByClassName("custom-block");

  for(const el of elements){
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/5"
      );
       el.innerHTML = `<div class="placeholder" style="display:flex;flex-direction:column;">
              <span>userId: ${response.data.userId}</span>
              <span>title: ${response.data.title}</span>
              <span>timestamp ${+new Date()}</span>
            </div>`;
  }

  const pageHtml = dom.serialize();
  dom.window.close();
  return (
    <div className='h-screen w-screen' dangerouslySetInnerHTML={{ __html: pageHtml }}></div>
  )
}

export default Preview