import pluginPkg from "../../package.json";
console.log("🚀 ~ pluginPkg:", pluginPkg);

const pluginId = pluginPkg.name.replace(
  /^(@[^-,.][\w,-]+\/|strapi-)plugin-/i,
  "color-picker"
);

export default pluginId;
