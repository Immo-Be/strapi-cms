import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import getTrad from "./utils/getTrad";

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: {
          id: getTrad("settings.section-label"),
          defaultMessage: name,
        },
      }, // Section to create
      [
        // links
        {
          intlLabel: {
            id: getTrad("settings.link-label"),
            defaultMessage: "Configuration",
          },
          id: pluginId,
          to: `/settings/${pluginId}`,
          Component: async () => {
            const component = await import(
              /* webpackChunkName: "settings-page" */ "./pages/settings"
            );

            return component;
          },
          permissions: [
            { action: `plugin::${pluginId}.config`, subject: null },
          ],
        },
      ]
    );
    // app.addMenuLink({
    //   to: `/plugins/${pluginId}`,
    //   icon: PluginIcon,
    //   intlLabel: {
    //     id: `${pluginId}.plugin.name`,
    //     defaultMessage: name,
    //   },
    //   Component: async () => {
    //     const component = await import("./pages/App");

    //     return component;
    //   },
    //   permissions: [
    //     // Uncomment to set the permissions of the plugin here
    //     // {
    //     //   action: '', // the action name should be plugin::plugin-name.actionType
    //     //   subject: null,
    //     // },
    //   ],
    // });
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);

    app.customFields.register({
      name: "location",
      pluginId: "custom-location-picker", // the custom field is created by a custom-location-picker plugin
      type: "json",
      intlLabel: {
        id: "custom-location-picker.color.label",
        defaultMessage: "3d Location",
      },
      intlDescription: {
        id: "custom-location-picker.color.description",
        defaultMessage: "Pick your 3D location",
      },
      icon: PluginIcon, // don't forget to create/import your icon component
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ "./components/input/"
          ),
      },
      options: {
        // declare options here
      },
    });
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
