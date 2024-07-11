import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: "location",
    plugin: "custom-location-picker",
    type: "json",
  });
  // register phase
};
