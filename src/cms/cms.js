import CMS from "netlify-cms/dist/cms";
// import { ImagesController, ImagesPreview } from "./images";
import Projects from './projects';

// CMS.registerWidget("images", ImagesController, ImagesPreview);
CMS.registerPreviewTemplate("projects", Projects);
CMS.registerPreviewStyle("./cms.css");
