import * as v from "valibot"
import { dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { workerJobModel } from "../models/workerJob.js"

const workerJobStatus = ["pending", "running", "completed", "error", "cancelled"] as const

export const workerJobSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idAgentMessage: v.nonNullable(idSchema, "Ce champ est requis"),
    status: v.nonNullable(v.picklist(workerJobStatus, "Valeur invalide"), "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
}) satisfies v.GenericSchema<typeof workerJobModel.$inferSelect>

export const workerJobSchemaReturn = v.pick(workerJobSchema, [
    "id",
    "idAgentMessage",
    "status",
    "createdAt",
    "lastUpdatedAt",
])
