import dotenv from 'dotenv';
dotenv.config();

export const env = {
  rds: {
    PE: {
      host: process.env.RDS_HOST_PE!,
      user: process.env.RDS_USER_PE!,
      port: Number(process.env.RDS_PORT_PE!),
      password: process.env.RDS_PASSWORD_PE!,
      database: process.env.RDS_DB_PE!
    },
    CL: {
      host: process.env.RDS_HOST_CL!,
      user: process.env.RDS_USER_CL!,
      port: Number(process.env.RDS_PORT_CL!),
      password: process.env.RDS_PASSWORD_CL!,
      database: process.env.RDS_DB_CL!
    }
  },
  appointmentTable: process.env.APPOINTMENT_TABLE!
};
