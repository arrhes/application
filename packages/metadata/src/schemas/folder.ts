import * as v from "valibot"
import { dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { folderModel } from "../models/folder.js"

export const folderSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idYear: v.nonNullable(idSchema, "Ce champ est requis"),
    idFolderParent: v.nullable(idSchema),
    name: v.nonNullable(varcharSchema({ maxLength: 256 }), "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof folderModel.$inferSelect>

export const folderSchemaReturn = v.pick(folderSchema, [
    "id",
    "idOrganization",
    "idYear",
    "idFolderParent",
    "name",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
