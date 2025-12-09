// models/Project.ts

import mongoose, { Schema, model, models } from 'mongoose'

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    url: String,
  },
  { timestamps: true }
)

export default models.Project || model('Project', ProjectSchema)
