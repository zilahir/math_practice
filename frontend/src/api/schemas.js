import joi from "joi";

export const newTaskSchema = joi.object({
  taskImageId: joi.number().required(),
  categoryId: joi.number().required(),
  periodId: joi.number().required(),
  taskPoints: joi.number().required(),
  taskNo: joi.number().required(),
});

export const dummy = {};
