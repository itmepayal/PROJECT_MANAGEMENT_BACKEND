import Role from "../models/role.model";
import logger from "../config/logger.config";

const systemRoles = [
  {
    name: "Owner",
    workspace: null,
    permissions: ["*"],
    isSystem: true,
  },

  {
    name: "Admin",
    workspace: null,
    permissions: [
      "workspace:update",
      "workspace:delete",

      "project:create",
      "project:view",
      "project:update",
      "project:delete",

      "member:add",
      "member:update",
      "member:remove",

      "board:create",
      "board:update",
      "board:delete",

      "sprint:create",
      "sprint:update",
      "sprint:delete",

      "task:create",
      "task:update",
      "task:delete",
    ],
    isSystem: true,
  },

  {
    name: "Member",
    workspace: null,
    permissions: [
      "workspace:view",
      "project:view",
      "board:view",
      "sprint:view",
      "task:create",
      "task:update",
    ],
    isSystem: true,
  },

  {
    name: "Viewer",
    workspace: null,
    permissions: [
      "workspace:view",
      "project:view",
      "board:view",
      "sprint:view",
    ],
    isSystem: true,
  },
];

export const seedRoles = async () => {
  try {
    logger.info("Role seeding started...");
    for (const role of systemRoles) {
      const exists = await Role.findOne({
        name: role.name,
        workspace: null,
      });
      if (exists) {
        logger.info(`Role already exists: ${role.name}`);
        continue;
      }
      await Role.create(role);
      logger.info(`Role created successfully: ${role.name}`);
    }

    logger.info("All system roles seeded successfully.");
  } catch (error) {
    logger.error("Role seeding failed:", error);
    throw error;
  }
};
