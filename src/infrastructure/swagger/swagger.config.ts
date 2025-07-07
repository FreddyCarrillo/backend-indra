// src/infrastructure/swagger/swagger.config.ts
export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "API de Agendamiento Médico",
    version: "1.0.0",
    description: "API para agendar citas médicas para asegurados"
  },
  paths: {
    "/appointments": {
      post: {
        summary: "Agendar una cita médica",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  insuredId: { type: "string", example: "01234" },
                  scheduleId: { type: "number", example: 100 },
                  countryISO: { type: "string", enum: ["PE", "CL"], example: "PE" }
                },
                required: ["insuredId", "scheduleId", "countryISO"]
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Agendamiento en proceso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    appointment: { $ref: "#/components/schemas/Appointment" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/appointments/{insuredId}": {
      get: {
        summary: "Listar agendamientos por asegurado",
        parameters: [
          {
            name: "insuredId",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": {
            description: "Lista de agendamientos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Appointment" }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Appointment: {
        type: "object",
        properties: {
          id: { type: "string" },
          insuredId: { type: "string" },
          scheduleId: { type: "number" },
          countryISO: { type: "string" },
          status: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      }
    }
  }
};
