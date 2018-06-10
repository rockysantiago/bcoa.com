import CMS from "netlify-cms/dist/cms";
import Projects from './projects';
import { CustomPathImageControl, CustomPathImagePreview } from "./customPathImage.js";

CMS.registerWidget("custompathimage", CustomPathImageControl, CustomPathImagePreview);
CMS.registerPreviewTemplate("projects", Projects);
CMS.registerPreviewStyle("./cms.css");
