import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
  // @ts-ignore Strapi typings are incomplete
  strapi.customFields.register({
    name: "location",
    plugin: "custom-location-picker",
    type: "json",
  });
};
