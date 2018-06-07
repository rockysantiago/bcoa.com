import CMS from "netlify-cms/dist/cms";
import Projects from './projects';

CMS.registerPreviewTemplate("projects", Projects);
CMS.registerPreviewStyle("./cms.css");
CMS.registerPreviewStyle("./cmsOverride.css");
