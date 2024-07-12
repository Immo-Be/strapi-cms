/*
 *
 * SettingsPage
 *
 */

import React from "react";
import pluginId from "../../pluginId";
import { CheckPagePermissions } from "@strapi/helper-plugin";
import Settings from "../../components/settings";

const permissions = [{ action: `plugin::${pluginId}.config`, subject: null }];

const SettingsPage = () => {
  return (
    <CheckPagePermissions permissions={permissions}>
      <Settings />
    </CheckPagePermissions>
  );
};

export default SettingsPage;
